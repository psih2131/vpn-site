<template>
    <main class="payment-result">
        <div class="payment-result__card">
            <span class="payment-result__icon payment-result__icon--success" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 12.5 10 16.5 18 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </span>
            <p class="payment-result__eyebrow">Dark Nova</p>
            <h1 class="payment-result__title">Оплата прошла</h1>
            <p class="payment-result__text">
                Платёж принят. Подписка обновится в кабинете — можно переходить и подключать VPN.
            </p>
            <NuxtLink to="/account" class="payment-result__btn">
                Перейти в кабинет
            </NuxtLink>
        </div>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default',
})

useSeoMeta({
    title: 'Оплата прошла — Dark Nova',
    robots: 'noindex, nofollow',
})
</script>
