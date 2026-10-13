<template>
    <div class="modal">
        <button class="modal__close" type="button" aria-label="Закрыть" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="modal__header">
            <p class="modal__eyebrow">Dark Nova</p>
            <h2 class="modal__title">Регистрация</h2>
            <p class="modal__subtitle">Создайте аккаунт и получите доступ к VPN</p>
        </div>

        <div class="modal__form">
            <label class="modal__field">
                <span class="modal__label">Email</span>
                <input class="modal__input" type="email" name="email" placeholder="you@email.com" autocomplete="email">
            </label>

            <label class="modal__field">
                <span class="modal__label">Пароль</span>
                <input class="modal__input" type="password" name="password" placeholder="Минимум 8 символов" autocomplete="new-password">
            </label>

            <label class="modal__field">
                <span class="modal__label">Повторите пароль</span>
                <input class="modal__input" type="password" name="passwordConfirm" placeholder="••••••••" autocomplete="new-password">
            </label>

            <button class="modal__submit" type="button" @click="showInfoNotification">Создать аккаунт</button>
        </div>

        <p class="modal__footer">
            Уже есть аккаунт?
            <button class="modal__link" type="button" @click="openAuthorization">
                Авторизоваться
            </button>
        </p>
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'
import { useNotificationStore } from '~/stores/notification'

const storeModal = useModalStore()
const storeNotification = useNotificationStore()

function closeModal() {
    storeModal.openCloseModal(false)
}

function openAuthorization() {
    storeModal.typeActiveModal('authorization')
    storeModal.openCloseModal(true)
}

function showInfoNotification() {
    storeNotification.setNotification({
        type: 'info',
        text: 'Аккаунт создан. Проверьте email для подтверждения',
    })
}
</script>
