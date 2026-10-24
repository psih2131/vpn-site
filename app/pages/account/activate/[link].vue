<template>
    <main class="activate-page">
        <div class="activate-page__card">
            <p class="activate-page__eyebrow">Dark Nova</p>
            <h1 class="activate-page__title">{{ title }}</h1>
            <p class="activate-page__text">{{ description }}</p>

            <p v-if="status === 'error'" class="activate-page__error">{{ errorMessage }}</p>
            <p v-else-if="status === 'success'" class="activate-page__success">{{ successMessage }}</p>

            <button
                v-if="status === 'idle' || status === 'loading'"
                type="button"
                class="activate-page__btn"
                :disabled="loading || !activationLink"
                @click="activateAccount"
            >
                {{ loading ? 'Активация…' : 'Активировать аккаунт' }}
            </button>

            <button
                v-else
                type="button"
                class="activate-page__btn"
                @click="openAuthorization"
            >
                Войти в аккаунт
            </button>

            <NuxtLink to="/" class="activate-page__back">
                ← На главную
            </NuxtLink>
        </div>
    </main>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'

definePageMeta({
    layout: 'default',
})

const route = useRoute()
const { adminUrl } = useAdminApi()
const storeModal = useModalStore()

const activationLink = computed(() => String(route.params.link || '').trim())

const status = ref('idle') // idle | loading | success | error
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const alreadyActivated = ref(false)

const title = computed(() => {
    if (status.value === 'success') return 'Аккаунт активирован'
    if (alreadyActivated.value) return 'Аккаунт уже активен'
    if (status.value === 'error') return 'Не удалось активировать'
    return 'Активация аккаунта'
})

const description = computed(() => {
    if (status.value === 'success') {
        return 'Email подтверждён. Теперь вы можете войти и пользоваться сервисом.'
    }
    if (alreadyActivated.value) {
        return 'Этот аккаунт уже был активирован ранее. Просто войдите с вашим email и паролем.'
    }
    if (status.value === 'error') {
        return 'Проверьте ссылку из письма или запросите новое письмо для подтверждения.'
    }
    return 'Нажмите кнопку ниже, чтобы подтвердить email и активировать аккаунт.'
})

async function activateAccount() {
    if (!activationLink.value || loading.value) return

    loading.value = true
    status.value = 'loading'
    errorMessage.value = ''
    successMessage.value = ''
    alreadyActivated.value = false

    try {
        const response = await fetch(adminUrl(`/api/v1/account/activate/${activationLink.value}`), {
            method: 'GET',
        })

        const data = await response.json().catch(() => null)
        const message = data?.data?.message || data?.message || ''

        if (!response.ok || !data?.success) {
            const text = message || 'Некорректная ссылка активации'
            errorMessage.value = text
            alreadyActivated.value = /уже активирован/i.test(text)
            status.value = 'error'
            return
        }

        successMessage.value = message || 'Аккаунт успешно активирован'
        status.value = 'success'
    } catch {
        errorMessage.value = 'Не удалось связаться с сервером. Попробуйте позже.'
        status.value = 'error'
    } finally {
        loading.value = false
    }
}

function openAuthorization() {
    const { trackEvent } = useGtag()
    trackEvent('click_cta', { button_name: 'activate_login' })
    storeModal.typeActiveModal('authorization')
    storeModal.openCloseModal(true)
}

useSeoMeta({
    title: 'Активация аккаунта — Dark Nova',
    robots: 'noindex, nofollow',
})
</script>
