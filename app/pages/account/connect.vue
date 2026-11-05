<template>
    <div class="account-content connect-page">
        <header class="connect-page__head">
            <h1 class="connect-page__title">{{ $t('cabinet.connect.title') }}</h1>
            <p class="connect-page__desc">{{ $t('cabinet.connect.desc') }}</p>
        </header>

        <AccountConnectDevices />
        <AccountConnectKey />
        <AccountConnectReserveKey />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'account',
    middleware: 'account-auth',
})
</script>
