<template>
    <div class="app-wrapper">
        <div class="admin-wrapper">
            <AdminAside />
            <slot />
        </div>

        <Modals />
        <Notifications />
        <AdminPreloader />
    </div>
</template>

<script setup>
import '~/assets/style/admin.scss'
import Modals from '~/components/modals/Index.vue'
import Notifications from '~/components/notifications/Index.vue'
import AdminAside from '~/components/admin/AdminAside.vue'
import AdminPreloader from '~/components/admin/AdminPreloader.vue'
</script>
