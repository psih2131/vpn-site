<template>
    <section class="sub-pay">
        <div class="sub-pay__head">
            <p class="sub-pay__label">Период оплаты</p>
            <p class="sub-pay__desc">
                Не обязательно ждать окончания текущей подписки — можно оплатить заранее.
                Новый срок добавится к оставшемуся времени.
            </p>
        </div>

        <div class="sub-pay__list">
            <button
                v-for="plan in plans"
                :key="plan.id"
                type="button"
                class="sub-pay__item"
                :class="{ 'is-active': selectedPlan === plan.id }"
                @click="selectedPlan = plan.id"
            >
                <span class="sub-pay__meta">
                    <span class="sub-pay__name">{{ plan.title }}</span>
                </span>

                <span class="sub-pay__price">{{ plan.price }} {{ plan.currency }}</span>
                <span class="sub-pay__check" aria-hidden="true"></span>
            </button>
        </div>

        <div class="sub-pay__footer">
            <button type="button" class="sub-pay__btn" :disabled="paying" @click="pay">
                <template v-if="paying">Создание платежа…</template>
                <template v-else>Оплатить {{ selectedPlanData?.price }} {{ selectedPlanData?.currency }}</template>
            </button>

            <div v-if="paymentUrl" class="sub-pay__ready">
                <p class="sub-pay__ready-title">Ваша платежная ссылка готова</p>
                <p class="sub-pay__ready-text">Перейдите и оплатите, если вас не перебросило на страницу оплаты автоматически</p>
                <a class="sub-pay__ready-link" :href="paymentUrl" target="_blank" rel="noopener noreferrer">
                    {{ paymentUrl }}
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()
const paying = ref(false)
const paymentUrl = ref('')

const { data: plansResponse } = await useAsyncData('account-plans', () =>
    $fetch(adminUrl('/api/v1/admin/plans')),
)

const plans = computed(() => plansResponse.value?.data || [])

const selectedPlan = ref(plans.value[0]?.id)

const selectedPlanData = computed(() => {
    return plans.value.find((plan) => plan.id === selectedPlan.value) || plans.value[0]
})

async function pay() {
    if (paying.value) return

    const planId = selectedPlanData.value?.id
    if (!planId) {
        storeNotification.setNotification({
            type: 'error',
            text: 'Выберите тариф',
        })
        return
    }

    paying.value = true
    paymentUrl.value = ''

    try {
        const data = await $fetch(adminUrl('/api/v1/account/payments'), {
            method: 'POST',
            credentials: 'include',
            body: { planId },
        })

        const url = data?.data?.paymentUrl
        if (!data?.success || !url) {
            storeNotification.setNotification({
                type: 'error',
                text: 'Не удалось получить ссылку на оплату',
            })
            return
        }

        paymentUrl.value = url
        window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || 'Не удалось создать платеж',
        })
    } finally {
        paying.value = false
    }
}
</script>
