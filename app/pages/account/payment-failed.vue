<template>
    <main class="payment-result">
        <div class="payment-result__card">
            <span class="payment-result__icon payment-result__icon--failed" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M8 8 16 16M16 8 8 16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
                </svg>
            </span>
            <p class="payment-result__eyebrow">Dark Nova</p>
            <h1 class="payment-result__title">Оплата не прошла</h1>
            <p class="payment-result__text">
                Платёж отменён или отклонён. Деньги не списаны — можно вернуться и попробовать ещё раз.
            </p>
            <NuxtLink to="/account/subscription" class="payment-result__btn">
                Вернуться к оплате
            </NuxtLink>
        </div>
    </main>
</template>

<script setup>
definePageMeta({
    layout: 'default',
})

useSeoMeta({
    title: 'Оплата не прошла — Dark Nova',
    robots: 'noindex, nofollow',
})
</script>
