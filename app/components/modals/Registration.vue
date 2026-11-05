<template>
    <div class="modal">
        <button class="modal__close" type="button" :aria-label="$t('auth.close')" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="modal__header">
            <p class="modal__eyebrow">Dark Nova</p>
            <h2 class="modal__title">{{ $t('auth.register.title') }}</h2>
            <p class="modal__subtitle">{{ $t('auth.register.subtitle') }}</p>
        </div>

        <form class="modal__form" @submit.prevent="onSubmit">
            <label class="modal__field">
                <span class="modal__label">{{ $t('auth.email') }}</span>
                <input
                    v-model="email"
                    class="modal__input"
                    type="email"
                    name="email"
                    :placeholder="$t('auth.emailPlaceholder')"
                    autocomplete="email"
                    :disabled="loading"
                >
            </label>

            <label class="modal__field">
                <span class="modal__label">{{ $t('auth.password') }}</span>
                <input
                    v-model="password"
                    class="modal__input"
                    type="password"
                    name="password"
                    :placeholder="$t('auth.register.passwordPlaceholder')"
                    autocomplete="new-password"
                    :disabled="loading"
                >
            </label>

            <label class="modal__field">
                <span class="modal__label">{{ $t('auth.register.repeatPassword') }}</span>
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
                {{ loading ? $t('auth.register.creating') : $t('auth.register.submit') }}
            </button>
        </form>

        <p class="modal__footer">
            {{ $t('auth.register.hasAccount') }}
            <button class="modal__link" type="button" @click="openAuthorization">
                {{ $t('auth.register.signIn') }}
            </button>
        </p>

        <p class="modal__divider">{{ $t('auth.orTelegram') }}</p>

        <a
            :href="telegramBotLink"
            target="_blank"
            rel="noopener noreferrer"
            class="modal__telegram"
            @click="trackTelegram"
        >
            <svg class="modal__telegram-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.56 7.37c-.12.52-.43.65-.87.4l-2.4-1.77-1.16 1.12c-.13.13-.24.24-.49.24l.17-2.43 4.43-4.01c.19-.17-.04-.27-.3-.1l-5.48 3.45-2.36-.74c-.51-.16-.52-.51.11-.76l9.22-3.55c.43-.16.8.1.66.78z"
                />
            </svg>
            {{ $t('auth.useTelegram') }}
        </a>
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'
import { useNotificationStore } from '~/stores/notification'

const storeModal = useModalStore()
const storeNotification = useNotificationStore()
const { t } = useI18n()
const { adminUrl } = useAdminApi()
const { trackEvent } = useGtag()

const telegramBotLink = 'https://26j8gl.s.gy/jOFHDR'

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
    trackEvent('click_cta', { button_name: 'register_to_auth' })
    storeModal.typeActiveModal('authorization')
    storeModal.openCloseModal(true)
}

function trackTelegram() {
    trackEvent('click_cta', { button_name: 'register_telegram' })
}

function showInfoNotification() {
    storeNotification.setNotification({
        type: 'info',
        text: t('auth.register.created'),
    })
}

function validateForm() {
    const emailValue = email.value.trim()
    const passwordValue = password.value
    const passwordConfirmValue = passwordConfirm.value

    if (!emailValue) {
        formError.value = t('auth.enterEmail')
        return null
    }

    if (!EMAIL_REGEX.test(emailValue)) {
        formError.value = t('auth.invalidEmail')
        return null
    }

    if (!passwordValue) {
        formError.value = t('auth.enterPassword')
        return null
    }

    if (passwordValue !== passwordConfirmValue) {
        formError.value = t('auth.register.mismatch')
        return null
    }

    return {
        email: emailValue.toLowerCase(),
        password: passwordValue,
    }
}

async function onSubmit() {
    formError.value = ''
    trackEvent('click_register', { button_name: 'register_submit' })

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
            formError.value = data?.message || t('auth.register.failed')
            return
        }

        showInfoNotification()
        closeModal()
    } catch {
        formError.value = t('auth.register.failedLater')
    } finally {
        loading.value = false
    }
}
</script>
