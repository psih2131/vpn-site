<template>
    <div class="app-wrapper">
        <div class="account-wrapper">
            <AccountAside />
            <slot />
            <AccountMobileNav />
        </div>

        <Modals />
        <Notifications />
    </div>
</template>

<script setup>
import '~/assets/style/panel.scss'
import Modals from '~/components/modals/Index.vue'
import Notifications from '~/components/notifications/Index.vue'
import AccountAside from '~/components/account/AccountAside.vue'
import AccountMobileNav from '~/components/account/AccountMobileNav.vue'
</script>
