<template>
    <div class="connect-key__field">
        <input
            v-if="input"
            class="connect-key__input"
            type="text"
            :value="value"
            readonly
        >
        <code v-else class="connect-key__value">{{ value }}</code>
        <button type="button" class="connect-key__copy" :aria-label="$t('cabinet.key.copy')" @click="copyKey">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="7" y="7" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M13 7V5.5A1.5 1.5 0 0011.5 4h-6A1.5 1.5 0 004 5.5v6A1.5 1.5 0 005.5 13H7" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        </button>
        <button type="button" class="connect-key__download" :aria-label="$t('cabinet.key.download')" @click="downloadKey">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 3.5v8M10 11.5l-3-3M10 11.5l3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 16.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    filename: {
        type: String,
        default: 'vpn-key.txt',
    },
    input: {
        type: Boolean,
        default: false,
    },
})

const storeNotification = useNotificationStore()
const { t } = useI18n()

function keyIsReady(key) {
    return Boolean(key) && key !== '—' && key !== t('cabinet.loading')
}

function downloadKey() {
    const key = props.value
    if (!keyIsReady(key)) {
        storeNotification.setNotification({
            type: 'error',
            text: t('cabinet.key.notReady'),
        })
        return
    }

    const blob = new Blob([key], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = props.filename
    link.click()
    URL.revokeObjectURL(url)
}

async function copyKey() {
    if (!keyIsReady(props.value)) {
        storeNotification.setNotification({
            type: 'error',
            text: t('cabinet.key.notReady'),
        })
        return
    }

    try {
        await navigator.clipboard.writeText(props.value)
        storeNotification.setNotification({
            type: 'success',
            text: t('cabinet.key.copied'),
        })
    } catch {
        storeNotification.setNotification({
            type: 'error',
            text: t('cabinet.key.copyFailed'),
        })
    }
}
</script>
