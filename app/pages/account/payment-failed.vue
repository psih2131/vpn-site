<template>
    <main class="payment-result">
        <div class="payment-result__card">
            <span class="payment-result__icon payment-result__icon--failed" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M8 8 16 16M16 8 8 16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                </svg>
            </span>
            <p class="payment-result__eyebrow">Dark Nova</p>
            <h1 class="payment-result__title">{{ $t('cabinet.paymentFailed.title') }}</h1>
            <p class="payment-result__text">{{ $t('cabinet.paymentFailed.text') }}</p>
            <NuxtLink :to="localePath('/account/subscription')" class="payment-result__btn">
                {{ $t('cabinet.paymentFailed.cta') }}
            </NuxtLink>
        </div>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default',
})

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('cabinet.paymentFailed.meta'),
    robots: 'noindex, nofollow',
})
</script>
