<template>
    <div class="account-content">
        <h1 class="account-content__title">Уведомления</h1>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'account',
    middleware: 'account-auth',
})
</script>
