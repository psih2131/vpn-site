<template>
    <div class="modal">
        <button class="modal__close" type="button" aria-label="Закрыть" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="modal__header">
            <p class="modal__eyebrow">Dark Nova</p>
            <h2 class="modal__title">Авторизация</h2>
            <p class="modal__subtitle">Войдите, чтобы управлять подпиской и устройствами</p>
        </div>

        <div class="modal__form">
            <label class="modal__field">
                <span class="modal__label">Email</span>
                <input class="modal__input" type="email" name="email" placeholder="you@email.com" autocomplete="email">
            </label>

            <label class="modal__field">
                <span class="modal__label">Пароль</span>
                <input class="modal__input" type="password" name="password" placeholder="••••••••" autocomplete="current-password">
            </label>

            <button class="modal__link modal__link--right" type="button" @click="openRestorePass">
                Забыли пароль?
            </button>

            <button class="modal__submit" type="button" @click="showSuccessNotification">Войти</button>
        </div>

        <p class="modal__footer">
            Ещё нет аккаунта?
            <button class="modal__link" type="button" @click="openRegistration">
                Зарегистрироваться
            </button>
        </p>
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'
import { useNotificationStore } from '~/stores/notification'

const storeModal = useModalStore()
const storeNotification = useNotificationStore()
const router = useRouter()

function closeModal() {
    storeModal.openCloseModal(false)
}

function openRegistration() {
    storeModal.typeActiveModal('registration')
    storeModal.openCloseModal(true)
}

function openRestorePass() {
    storeModal.typeActiveModal('restorePass')
    storeModal.openCloseModal(true)
}

function showSuccessNotification() {
    storeNotification.setNotification({
        type: 'success',
        text: 'Вы успешно вошли в аккаунт',
    })
    storeModal.openCloseModal(false)
    router.push('/account')
}
</script>
