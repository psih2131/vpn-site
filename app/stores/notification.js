import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
    const notification = ref(null)

    function setNotification(value) {
        notification.value = value
    }

    return {
        notification,
        setNotification,
    }
})
