<template>
    <section class="sub-pay">
        <div class="sub-pay__head">
            <p class="sub-pay__label">{{ $t('cabinet.pay.period') }}</p>
            <p class="sub-pay__desc">{{ $t('cabinet.pay.desc') }}</p>
        </div>

        <div class="sub-pay__list">
            <button
                v-for="plan in visiblePlans"
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
            <div class="sub-pay__actions">
                <button
                    v-if="isRu"
                    type="button"
                    class="sub-pay__btn"
                    :disabled="paying"
                    @click="pay(2)"
                >
                    <template v-if="payingMethod === 2">{{ $t('cabinet.pay.creating') }}</template>
                    <template v-else>
                        <svg class="sub-pay__sbp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <g clip-path="url(#sbp-icon-clip)">
                                <path d="M8.99964 1.66666L8.94409 9.22739L11.1106 10.4968V5.30909L8.99964 1.66666Z" fill="#FAB719"/>
                                <path d="M8.99841 11.0485V18.3333L11.1093 14.5805V12.373L8.99841 11.0485Z" fill="#61B42C"/>
                                <path d="M16.6658 13.4782L3.33337 5.31036L5.33321 8.84234L12.8882 13.4782H16.6658Z" fill="#208BC9"/>
                                <path d="M8.99841 1.66666L16.6645 6.30246H12.887L11.1093 5.30909L8.99841 1.66666Z" fill="#F77C1C"/>
                                <path d="M11.1119 7.49451L12.8896 6.30249H16.6671L11.1119 9.94486V7.49451Z" fill="#D60B4C"/>
                                <path d="M11.1093 14.579L12.887 13.4752H16.6645L8.99841 18.3318L11.1093 14.579Z" fill="#097F2D"/>
                                <path d="M3.33337 5.31036V14.5819L5.22211 11.1603L5.33321 8.8424L3.33337 5.31036Z" fill="#5B59A1"/>
                                <path d="M7.13312 9.94608L5.22211 11.1602L3.33337 14.5819L8.99965 11.0498L7.13312 9.94608Z" fill="#9F4393"/>
                            </g>
                            <defs>
                                <clipPath id="sbp-icon-clip">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span>{{ $t('cabinet.pay.sbp', { price: payPriceLabel }) }}</span>
                    </template>
                </button>

                <button type="button" class="sub-pay__btn" :disabled="paying" @click="pay(13)">
                    <template v-if="payingMethod === 13">{{ $t('cabinet.pay.creating') }}</template>
                    <template v-else>
                        <svg class="sub-pay__btc-icon" viewBox="0 0 32 32" aria-hidden="true">
                            <circle cx="16" cy="16" r="16" fill="#F7931A"/>
                            <path fill="#ffffff" d="M22.6 14.1c.3-2.1-1.3-3.2-3.5-4l.7-2.8-1.7-.4-.7 2.7c-.45-.11-.91-.22-1.37-.32l.7-2.74-1.7-.43-.71 2.83c-.37-.09-.74-.17-1.09-.26l-2.35-.59-.45 1.82s1.26.29 1.24.31c.69.17.81.63.79.99l-.8 3.21c.05.01.11.03.18.06l-.18-.05-1.12 4.5c-.08.21-.3.52-.78.4.02.02-1.24-.31-1.24-.31l-.84 1.95 2.21.55c.41.1.81.21 1.21.31l-.71 2.86 1.7.42.71-2.83c.46.13.91.24 1.35.35l-.7 2.82 1.7.42.71-2.85c2.9.55 5.08.33 6-2.3.74-2.12-.04-3.34-1.57-4.14 1.11-.26 1.95-.99 2.17-2.5Zm-3.89 5.46c-.53 2.12-4.1.97-5.26.69l.94-3.79c1.16.29 4.87.86 4.32 3.1Zm.53-5.49c-.48 1.93-3.45.95-4.41.71l.86-3.44c.96.24 4.05.69 3.55 2.73Z"/>
                        </svg>
                        <span>{{ $t('cabinet.pay.crypto', { price: payPriceLabel }) }}</span>
                    </template>
                </button>
            </div>

            <div v-if="paymentUrl" class="sub-pay__ready">
                <p class="sub-pay__ready-title">{{ $t('cabinet.pay.readyTitle') }}</p>
                <p class="sub-pay__ready-text">{{ $t('cabinet.pay.readyText') }}</p>
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
const { t, locale } = useI18n()
const isRu = computed(() => locale.value === 'ru')
const payingMethod = ref(null)
const paying = computed(() => payingMethod.value !== null)
const paymentUrl = ref('')

const { data: plansResponse } = await useAsyncData('account-plans', () =>
    $fetch(adminUrl('/api/v1/admin/plans')),
)

const visiblePlans = computed(() => {
    const currency = isRu.value ? 'RUB' : 'USD'
    return (plansResponse.value?.data || []).filter((plan) => {
        return String(plan.currency || '').toUpperCase() === currency
    })
})

const selectedPlan = ref(null)

watch(visiblePlans, (list) => {
    if (!list.some((plan) => plan.id === selectedPlan.value)) {
        selectedPlan.value = list[0]?.id ?? null
    }
}, { immediate: true })

const selectedPlanData = computed(() => {
    return visiblePlans.value.find((plan) => plan.id === selectedPlan.value) || visiblePlans.value[0]
})

const payPriceLabel = computed(() => {
    const plan = selectedPlanData.value
    if (!plan?.price && plan?.price !== 0) return ''
    const currency = String(plan.currency || '').toUpperCase()
    if (currency === 'RUB') return `${plan.price}₽`
    if (currency === 'USD') return `$${plan.price}`
    return `${plan.price} ${plan.currency || ''}`.trim()
})

async function pay(paymentMethod = 2) {
    if (paying.value) return

    const planId = selectedPlanData.value?.id
    if (!planId) {
        storeNotification.setNotification({
            type: 'error',
            text: t('cabinet.pay.choosePlan'),
        })
        return
    }

    payingMethod.value = paymentMethod
    paymentUrl.value = ''

    try {
        const data = await $fetch(adminUrl('/api/v1/account/payments'), {
            method: 'POST',
            credentials: 'include',
            body: { 
                planId,
                paymentMethod
             },
        })

        const url = data?.data?.paymentUrl
        if (!data?.success || !url) {
            storeNotification.setNotification({
                type: 'error',
                text: t('cabinet.pay.noLink'),
            })
            return
        }

        paymentUrl.value = url
        window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || t('cabinet.pay.createFailed'),
        })
    } finally {
        payingMethod.value = null
    }
}
</script>
