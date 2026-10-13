<template>
    <div class="notify notify--info">
        <button class="notify__close" type="button" aria-label="Закрыть" @click="closeNotification">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="notify__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
                <path d="M12 8v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="12" cy="16.2" r="1" fill="currentColor"/>
            </svg>
        </div>

        <div class="notify__body">
            <p class="notify__title">Информация</p>
            <p class="notify__text">{{ text }}</p>
        </div>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

defineProps({
    text: {
        type: String,
        default: '',
    },
})

const storeNotification = useNotificationStore()

function closeNotification() {
    storeNotification.setNotification(null)
}
</script>
