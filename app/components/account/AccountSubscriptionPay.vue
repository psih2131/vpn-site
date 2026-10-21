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
        </div>
    </section>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()
const paying = ref(false)

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

    try {
        const data = await $fetch(adminUrl('/api/v1/account/payments'), {
            method: 'POST',
            credentials: 'include',
            body: { planId },
        })

        const paymentUrl = data?.data?.paymentUrl
        if (!data?.success || !paymentUrl) {
            storeNotification.setNotification({
                type: 'error',
                text: 'Не удалось получить ссылку на оплату',
            })
            return
        }

        window.open(paymentUrl, '_blank', 'noopener,noreferrer')
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
