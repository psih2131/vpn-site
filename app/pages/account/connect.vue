<template>
    <div class="account-content connect-page">
        <header class="connect-page__head">
            <h1 class="connect-page__title">Ключ VPN</h1>
            <p class="connect-page__desc">Ключ подключения и установка на ваше устройство</p>
        </header>

        <AccountConnectDevices />
        <AccountConnectKey />
        <AccountConnectReserveKey />
        <AccountConnectActions />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'account',
    middleware: 'account-auth',
})
</script>
