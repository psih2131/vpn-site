<template>
    <button
        class="devices-list__clear"
        type="button"
        :disabled="deleting"
        @click="deleteAll"
    >
        {{ $t('cabinet.devices.removeAll') }}
    </button>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const emit = defineEmits(['deleted'])

const { adminUrl } = useAdminApi()
const { t } = useI18n()
const storeNotification = useNotificationStore()
const deleting = ref(false)

async function deleteAll() {
    if (deleting.value) return

    deleting.value = true

    try {
        const data = await $fetch(adminUrl('/api/v1/account/vpn-devices-delete-all'), {
            method: 'POST',
            credentials: 'include',
        })

        if (!data?.success) {
            storeNotification.setNotification({
                type: 'error',
                text: t('cabinet.devices.removeAllFailedText'),
            })
            return
        }

        emit('deleted')
        storeNotification.setNotification({
            type: 'success',
            text: t('cabinet.devices.removedAllText'),
        })
    } catch {
        storeNotification.setNotification({
            type: 'error',
            text: t('cabinet.devices.removeAllFailedText'),
        })
    } finally {
        deleting.value = false
    }
}
</script>
