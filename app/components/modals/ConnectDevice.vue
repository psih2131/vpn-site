<template>
    <div
        class="modal device-modal"
        :class="{ 'device-modal--guide': selected }"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="selected ? 'device-guide-title' : 'device-modal-title'"
    >
        <button class="modal__close device-modal__x" type="button" aria-label="Закрыть" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="device-modal__body">
        <ConnectDeviceWindows v-if="selected === 'windows'" @back="selected = null" />
        <ConnectDeviceMac v-else-if="selected === 'mac'" @back="selected = null" />
        <ConnectDeviceLinux v-else-if="selected === 'linux'" @back="selected = null" />
        <ConnectDeviceIpad v-else-if="selected === 'ipad'" @back="selected = null" />
        <ConnectDeviceIphone v-else-if="selected === 'iphone'" @back="selected = null" />
        <ConnectDeviceAndroid v-else-if="selected === 'android'" @back="selected = null" />
        <ConnectDeviceAppleTv v-else-if="selected === 'apple-tv'" @back="selected = null" />
        <ConnectDeviceAndroidTv v-else-if="selected === 'android-tv'" @back="selected = null" />

        <template v-else>
            <div class="device-modal__head">
                <h2 id="device-modal-title" class="device-modal__title">Выберите ваше устройство</h2>
                <p class="device-modal__text">Мы подберём подходящий клиент и инструкцию</p>
            </div>

            <div class="device-modal__grid">
                <button
                    v-for="device in devices"
                    :key="device.id"
                    type="button"
                    class="device-modal__item"
                    @click="selected = device.id"
                >
                    <span class="device-modal__icon" aria-hidden="true" v-html="device.icon"></span>
                    <span>{{ device.label }}</span>
                </button>
            </div>

            <button class="device-modal__close" type="button" @click="closeModal">Закрыть</button>
        </template>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'
import ConnectDeviceWindows from '~/components/modals/devices/Windows.vue'
import ConnectDeviceMac from '~/components/modals/devices/Mac.vue'
import ConnectDeviceLinux from '~/components/modals/devices/Linux.vue'
import ConnectDeviceIpad from '~/components/modals/devices/Ipad.vue'
import ConnectDeviceIphone from '~/components/modals/devices/Iphone.vue'
import ConnectDeviceAndroid from '~/components/modals/devices/Android.vue'
import ConnectDeviceAppleTv from '~/components/modals/devices/AppleTv.vue'
import ConnectDeviceAndroidTv from '~/components/modals/devices/AndroidTv.vue'

const storeModal = useModalStore()
const selected = ref(null)

watch(() => storeModal.modalActive, (isOpen) => {
    if (!isOpen) selected.value = null
})

const monitor = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`
const apple = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.2 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1.1 8.5.7 1 1.5 2.2 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7 1.8-1.1 2.5-2.1c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.2-3.5zM14.6 6.6c.6-.7 1-1.6.9-2.6-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5 1 .1 1.9-.5 2.5-1.2z"/></svg>`
const phone = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>`
const tablet = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 18h2"/></svg>`
const tv = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="m8 7 4-4 4 4"/></svg>`

const devices = [
    { id: 'windows', label: 'Windows', icon: monitor },
    { id: 'mac', label: 'Mac OS', icon: apple },
    { id: 'linux', label: 'Linux', icon: monitor },
    { id: 'ipad', label: 'iPad', icon: tablet },
    { id: 'iphone', label: 'iPhone', icon: phone },
    { id: 'android', label: 'Android', icon: phone },
    { id: 'apple-tv', label: 'Apple TV', icon: tv },
    { id: 'android-tv', label: 'Android TV', icon: tv },
]

function closeModal() {
    storeModal.openCloseModal(false)
}
</script>
