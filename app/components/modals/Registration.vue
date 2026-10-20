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

        <form class="modal__form" @submit.prevent="onSubmit">
            <label class="modal__field">
                <span class="modal__label">Email</span>
                <input
                    v-model="email"
                    class="modal__input"
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    autocomplete="email"
                    :disabled="loading"
                >
            </label>

            <label class="modal__field">
                <span class="modal__label">Пароль</span>
                <input
                    v-model="password"
                    class="modal__input"
                    type="password"
                    name="password"
                    placeholder="Минимум 8 символов"
                    autocomplete="new-password"
                    :disabled="loading"
                >
            </label>

            <label class="modal__field">
                <span class="modal__label">Повторите пароль</span>
                <input
                    v-model="passwordConfirm"
                    class="modal__input"
                    type="password"
                    name="passwordConfirm"
                    placeholder="••••••••"
                    autocomplete="new-password"
                    :disabled="loading"
                >
            </label>

            <p v-if="formError" class="modal__error">{{ formError }}</p>

            <button class="modal__submit" type="submit" :disabled="loading">
                {{ loading ? 'Создание…' : 'Создать аккаунт' }}
            </button>
        </form>

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
const { adminUrl } = useAdminApi()

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const formError = ref('')
const loading = ref(false)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
        text: 'Аккаунт создан. Мы отправили письмо со ссылкой для подтверждения — проверьте почту, включая папку «Спам».',
    })
}

function validateForm() {
    const emailValue = email.value.trim()
    const passwordValue = password.value
    const passwordConfirmValue = passwordConfirm.value

    if (!emailValue) {
        formError.value = 'Введите email'
        return null
    }

    if (!EMAIL_REGEX.test(emailValue)) {
        formError.value = 'Некорректный email'
        return null
    }

    if (!passwordValue) {
        formError.value = 'Введите пароль'
        return null
    }

    if (passwordValue !== passwordConfirmValue) {
        formError.value = 'Пароли не совпадают'
        return null
    }

    return {
        email: emailValue.toLowerCase(),
        password: passwordValue,
    }
}

async function onSubmit() {
    formError.value = ''

    const payload = validateForm()
    if (!payload) return

    loading.value = true

    try {
        const response = await fetch(adminUrl('/api/v1/account/registration'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        const data = await response.json().catch(() => null)

        if (!response.ok || !data?.success) {
            formError.value = data?.message || 'Не удалось создать аккаунт'
            return
        }

        showInfoNotification()
        closeModal()
    } catch {
        formError.value = 'Не удалось создать аккаунт. Попробуйте позже.'
    } finally {
        loading.value = false
    }
}
</script>
