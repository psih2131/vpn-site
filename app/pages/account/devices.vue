<template>
    <div class="account-content devices-page">
        <header class="devices-page__head">
            <h1 class="devices-page__title">Устройства</h1>
            <p class="devices-page__desc">Устройства, на которых подключён ваш ключ.</p>
        </header>

        <section class="devices-card">
            <div class="devices-card__top">
                <div>
                    <p class="devices-card__label">Подключено</p>
                    <p class="devices-card__value">
                        <span>{{ used }}</span>
                        <small>из {{ limit }}</small>
                    </p>
                </div>
                <span class="devices-card__left">Можно добавить ещё {{ free }}</span>
            </div>

            <div class="devices-card__segments" aria-hidden="true">
                <span
                    v-for="index in limit"
                    :key="index"
                    class="devices-card__segment"
                    :class="{ 'is-filled': index <= used }"
                ></span>
            </div>
            <p class="devices-card__max">Максимум {{ limit }} устройств</p>

            <!--
            <div class="devices-card__actions">
                <button type="button" class="devices-card__add" @click="addDevice">
                    + Добавить устройство
                </button>
                <button type="button" class="devices-card__clear" @click="clearDevices">
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3.2 4.2h9.6M6.2 4.2V3.2A1 1 0 017.2 2.2h1.6a1 1 0 011 1v1M5 4.2l.4 8.2a1 1 0 001 .9h3.2a1 1 0 001-.9l.4-8.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Удалить все устройства
                </button>
            </div>
            -->
        </section>

        <div class="devices-hint">
            <span class="devices-hint__icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                    <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4"/>
                    <path d="M11 8h6M14.2 8v2M16.4 8v2.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
            </span>
            <p>Добавьте ключ из раздела «VPN» в приложение — устройство появится здесь.</p>
            <NuxtLink to="/account/connect" class="devices-hint__link">Раздел VPN →</NuxtLink>
        </div>

        <section class="devices-list">
            <p class="devices-list__label">Ваши устройства</p>
            <div
                v-for="device in devices"
                :key="device.id"
                class="devices-slot devices-slot--active"
            >
                <span class="devices-slot__plus" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/>
                        <path d="M10 19v-3.96 3.15"/>
                        <path d="M7 19h5"/>
                        <rect width="6" height="10" x="16" y="12" rx="2"/>
                    </svg>
                </span>
                <span class="devices-slot__info">
                    <span class="devices-slot__name">{{ device.deviceModel || device.deviceOs || 'Устройство' }}</span>
                    <span class="devices-slot__meta">{{ deviceLabel(device) }}</span>
                </span>
            </div>
            <div
                v-for="index in free"
                :key="`free-${index}`"
                class="devices-slot"
            >
                <span class="devices-slot__plus" aria-hidden="true">+</span>
                <span>Свободный слот</span>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
    layout: 'account',
    middleware: 'account-auth',
})

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()

const devices = ref([])
const limit = 5
const used = computed(() => devices.value.length)
const free = computed(() => Math.max(limit - used.value, 0))

function deviceLabel(device) {
    const parts = [device.deviceOs, device.osVersion].filter(Boolean)
    return parts.join(' · ') || device.userAgent || ''
}

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
