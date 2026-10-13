<template>
    <div class="modal">
        <button class="modal__close" type="button" aria-label="Закрыть" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="modal__header">
            <p class="modal__eyebrow">Dark Nova</p>
            <h2 class="modal__title">Восстановление пароля</h2>
            <p class="modal__subtitle">Укажите email — отправим код для сброса пароля</p>
        </div>

        <div class="modal__form">
            <label class="modal__field">
                <span class="modal__label">Email</span>
                <input class="modal__input" type="email" name="email" placeholder="you@email.com" autocomplete="email">
            </label>

            <button class="modal__submit" type="button" @click="openRestorePassCode">Восстановить пароль</button>
        </div>

        <p class="modal__footer">
            Вспомнили пароль?
            <button class="modal__link" type="button" @click="openAuthorization">
                Вернуться ко входу
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
