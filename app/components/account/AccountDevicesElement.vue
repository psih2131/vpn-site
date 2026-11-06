<template>
    <div class="devices-slot devices-slot--active">
        <span class="devices-slot__plus" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/>
                <path d="M10 19v-3.96 3.15"/>
                <path d="M7 19h5"/>
                <rect width="6" height="10" x="16" y="12" rx="2"/>
            </svg>
        </span>
        <span class="devices-slot__info">
            <span class="devices-slot__name">{{ name }}</span>
            <span class="devices-slot__meta">{{ meta }}</span>
        </span>
        <button
            class="devices-slot__remove"
            type="button"
            :disabled="deleting"
            @click="deleteDevice"
        >
            {{ $t('cabinet.devices.remove') }}
        </button>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
    name: {
        type: String,
        default: '',
    },
    meta: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['deleted'])

const { adminUrl } = useAdminApi()
const { t } = useI18n()
const storeNotification = useNotificationStore()
const deleting = ref(false)

async function deleteDevice() {
    if (deleting.value || props.id === '' || props.id == null) return

    deleting.value = true

    try {
        const data = await $fetch(adminUrl('/api/v1/account/vpn-devices-delete-one'), {
            method: 'POST',
            credentials: 'include',
            body: { hwid: props.id },
        })

        if (!data?.success) {
            storeNotification.setNotification({
                type: 'error',
                text: t('cabinet.devices.removeFailedText'),
            })
            return
        }

        emit('deleted')
        storeNotification.setNotification({
            type: 'success',
            text: t('cabinet.devices.removedText'),
        })
    } catch {
        storeNotification.setNotification({
            type: 'error',
            text: t('cabinet.devices.removeFailedText'),
        })
    } finally {
        deleting.value = false
    }
}
</script>
