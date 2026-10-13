<template>
    <Transition name="notify-overlay">
        <div
            v-if="storeNotification.notification"
            class="notify-wrapper"
            @click.self="closeNotification"
        >
            <Transition name="notify-panel" mode="out-in">
                <Info
                    v-if="storeNotification.notification.type === 'info'"
                    key="info"
                    :text="storeNotification.notification.text"
                />
                <Success
                    v-else-if="storeNotification.notification.type === 'success'"
                    key="success"
                    :text="storeNotification.notification.text"
                />
                <ErrorNotify
                    v-else-if="storeNotification.notification.type === 'error'"
                    key="error"
                    :text="storeNotification.notification.text"
                />
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
import Info from '~/components/notifications/Info.vue'
import Success from '~/components/notifications/Success.vue'
import ErrorNotify from '~/components/notifications/Error.vue'
import { useNotificationStore } from '~/stores/notification'

const storeNotification = useNotificationStore()

function closeNotification() {
    storeNotification.setNotification(null)
}
</script>
