<template>
    <div class="notify notify--success">
        <button class="notify__close" type="button" aria-label="Закрыть" @click="closeNotification">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="notify__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
                <path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <div class="notify__body">
            <p class="notify__title">Успешно</p>
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
