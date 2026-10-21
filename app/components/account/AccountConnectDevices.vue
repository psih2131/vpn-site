<template>
    <NuxtLink to="/account/devices" class="connect-devices">
        <div class="connect-devices__main">
            <span class="connect-devices__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/>
                    <path d="M10 19v-3.96 3.15"/>
                    <path d="M7 19h5"/>
                    <rect width="6" height="10" x="16" y="12" rx="2"/>
                </svg>
            </span>
            <div class="connect-devices__text">
                <p class="connect-devices__title">Устройства</p>
                <p class="connect-devices__desc">До {{ limit }} устройств. Список, добавление и удаление — в разделе «Устройства».</p>
            </div>
        </div>

        <div class="connect-devices__meter">
            <span class="connect-devices__bar" aria-hidden="true">
                <span class="connect-devices__bar-fill" :style="{ width: `${usedPercent}%` }"></span>
            </span>
            <span class="connect-devices__count">{{ used }} / {{ limit }}</span>
        </div>
    </NuxtLink>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()

const devices = ref([])
const limit = 5
const used = computed(() => devices.value.length)

const usedPercent = computed(() => {
    if (!limit) return 0
    return Math.min(100, Math.round((used.value / limit) * 100))
})

async function loadDevices() {
    const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined

    try {
        const data = await $fetch(adminUrl('/api/v1/account/vpn-devices'), {
            credentials: 'include',
            headers,
        })

        devices.value = data?.success && Array.isArray(data.data?.devices)
            ? data.data.devices
            : []
    } catch {
        devices.value = []
        storeNotification.setNotification({
            type: 'error',
            text: 'Не удалось получить устройства',
        })
    }
}

await loadDevices()
</script>
