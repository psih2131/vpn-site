<template>
    <div class="app-wrapper">
        <Header />
        <slot />
        <Footer />
        <Modals />
        <Notifications />
    </div>
</template>

<script setup>
import '~/assets/style/main.scss'
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Modals from '~/components/modals/Index.vue'
import Notifications from '~/components/notifications/Index.vue'
</script>
