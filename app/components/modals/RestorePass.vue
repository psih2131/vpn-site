<template>
    <div class="modal">
        <button class="modal__close" type="button" :aria-label="$t('auth.close')" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="modal__header">
            <p class="modal__eyebrow">Dark Nova</p>
            <h2 class="modal__title">{{ $t('auth.restore.title') }}</h2>
            <p class="modal__subtitle">{{ $t('auth.restore.subtitle') }}</p>
        </div>

        <div class="modal__form">
            <label class="modal__field">
                <span class="modal__label">{{ $t('auth.email') }}</span>
                <input class="modal__input" type="email" name="email" :placeholder="$t('auth.emailPlaceholder')" autocomplete="email">
            </label>

            <button class="modal__submit" type="button" @click="openRestorePassCode">{{ $t('auth.restore.submit') }}</button>
        </div>

        <p class="modal__footer">
            {{ $t('auth.restore.remembered') }}
            <button class="modal__link" type="button" @click="openAuthorization">
                {{ $t('auth.restore.back') }}
            </button>
        </p>
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'

const storeModal = useModalStore()

function closeModal() {
    storeModal.openCloseModal(false)
}

function openAuthorization() {
    storeModal.typeActiveModal('authorization')
    storeModal.openCloseModal(true)
}

function openRestorePassCode() {
    storeModal.typeActiveModal('restorePassCode')
    storeModal.openCloseModal(true)
}
</script>
