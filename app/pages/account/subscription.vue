<template>
    <div class="account-content subscription-page">
        <header class="subscription-page__head">
            <h1 class="subscription-page__title">{{ $t('cabinet.pay.title') }}</h1>
        </header>
        
        <!-- Отображение статуса подписки -->
        <AccountSubscriptionStats />

        <!-- Форма оплаты подписки -->
        <AccountSubscriptionPay />

        <!-- История платежей -->
        <AccountPaymentHistory />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'account',
    middleware: 'account-auth',
})
</script>
