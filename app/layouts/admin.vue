<template>
    <div class="app-wrapper">
        <div class="admin-wrapper">
            <AdminAside />
            <slot />
        </div>

        <Modals />
        <Notifications />
    </div>
</template>

<script setup>
import '~/assets/style/admin.scss'
import Modals from '~/components/modals/Index.vue'
import Notifications from '~/components/notifications/Index.vue'
import AdminAside from '~/components/admin/AdminAside.vue'
</script>
