<template>
    <div
        class="modal device-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
    >
        <button class="modal__close device-modal__x" type="button" aria-label="Закрыть" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="device-modal__body">
            <div class="device-modal__head">
                <h2 id="video-modal-title" class="device-modal__title">Видеоинструкция</h2>
                <p class="device-modal__text">Выберите устройство — откроем видео на YouTube</p>
            </div>

            <div class="device-modal__grid">
                <a
                    v-for="item in platforms"
                    :key="item.id"
                    class="device-modal__item"
                    :href="item.url || undefined"
                    :target="item.url ? '_blank' : undefined"
                    :rel="item.url ? 'noopener noreferrer' : undefined"
                    @click="!item.url && $event.preventDefault()"
                >
                    <span class="device-modal__icon" aria-hidden="true" v-html="item.icon"></span>
                    <span>{{ item.label }}</span>
                </a>
            </div>

            <button class="device-modal__close" type="button" @click="closeModal">Закрыть</button>
        </div>
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'

const storeModal = useModalStore()

const monitor = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`
const phone = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>`

const platforms = [
    {
        id: 'windows',
        label: 'Windows',
        icon: monitor,
        url: '', // YouTube: https://www.youtube.com/watch?v=...
    },
    {
        id: 'iphone',
        label: 'iPhone',
        icon: phone,
        url: '', // YouTube: https://www.youtube.com/watch?v=...
    },
]

function closeModal() {
    storeModal.openCloseModal(false)
}
</script>
