<template>
    <div class="account-content devices-page">
        <header class="devices-page__head">
            <h1 class="devices-page__title">{{ $t('cabinet.devices.title') }}</h1>
            <p class="devices-page__desc">{{ $t('cabinet.devices.desc') }}</p>
        </header>

        <section class="devices-card">
            <div class="devices-card__top">
                <div>
                    <p class="devices-card__label">{{ $t('cabinet.devices.connected') }}</p>
                    <p class="devices-card__value">
                        <span>{{ used }}</span>
                        <small>{{ $t('cabinet.devices.of', { limit }) }}</small>
                    </p>
                </div>
                <span class="devices-card__left">{{ $t('cabinet.devices.canAdd', { count: free }) }}</span>
            </div>

            <div class="devices-card__segments" aria-hidden="true">
                <span
                    v-for="index in limit"
                    :key="index"
                    class="devices-card__segment"
                    :class="{ 'is-filled': index <= used }"
                ></span>
            </div>
            <p class="devices-card__max">{{ $t('cabinet.devices.max', { limit }) }}</p>

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
            <p>{{ $t('cabinet.devices.hint') }}</p>
            <NuxtLink :to="localePath('/account/connect')" class="devices-hint__link">{{ $t('cabinet.devices.vpnSection') }}</NuxtLink>
        </div>

        <section class="devices-list">
            <div class="devices-list__head">
                <p class="devices-list__label">{{ $t('cabinet.devices.yours') }}</p>
                <AccountDevicesDeleteAll @deleted="loadDevices" />
            </div>
            <AccountDevicesElement
                v-for="device in devices"
                :key="device.hwid || device.id"
                :id="device.hwid || device.id"
                :name="device.deviceModel || device.deviceOs || $t('cabinet.devices.device')"
                :meta="deviceLabel(device)"
                @deleted="loadDevices"
            />
            <AccountDevicesEmptyElement
                v-for="index in free"
                :key="`free-${index}`"
                :label="$t('cabinet.devices.freeSlot')"
            />
        </section>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'account',
    middleware: 'account-auth',
})

const { adminUrl } = useAdminApi()
const localePath = useLocalePath()

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
    }
}

await loadDevices()
</script>
