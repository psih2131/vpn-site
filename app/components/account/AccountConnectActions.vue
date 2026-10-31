<template>
    <div class="connect-grid">
        <UiConnectActionButton title="Начать установку VPN" pulse @click="openDevices">
            <template #icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                </svg>
            </template>
        </UiConnectActionButton>

        <!--
        <UiConnectActionButton title="Видео инструкция" black @click="openVideos">
            <template #icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="6" width="13" height="12" rx="2"/>
                    <path d="m16 10 5-3v10l-5-3"/>
                </svg>
            </template>
        </UiConnectActionButton>
        -->
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'

const storeModal = useModalStore()

function openDevices() {
    storeModal.typeActiveModal('connectDevice')
    storeModal.openCloseModal(true)
}

// function openVideos() {
//     storeModal.typeActiveModal('videoInstruction')
//     storeModal.openCloseModal(true)
// }
</script>
