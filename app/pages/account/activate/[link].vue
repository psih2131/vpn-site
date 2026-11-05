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
                {{ loading ? $t('auth.activate.activating') : $t('auth.activate.activate') }}
            </button>

            <button
                v-else
                type="button"
                class="activate-page__btn"
                @click="openAuthorization"
            >
                {{ $t('auth.activate.signIn') }}
            </button>

            <NuxtLink :to="$localePath('/')" class="activate-page__back">
                {{ $t('auth.activate.back') }}
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
const { t } = useI18n()

const activationLink = computed(() => String(route.params.link || '').trim())

const status = ref('idle') // idle | loading | success | error
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const alreadyActivated = ref(false)

const title = computed(() => {
    if (status.value === 'success') return t('auth.activate.titleSuccess')
    if (alreadyActivated.value) return t('auth.activate.titleAlready')
    if (status.value === 'error') return t('auth.activate.titleError')
    return t('auth.activate.titleIdle')
})

const description = computed(() => {
    if (status.value === 'success') return t('auth.activate.descSuccess')
    if (alreadyActivated.value) return t('auth.activate.descAlready')
    if (status.value === 'error') return t('auth.activate.descError')
    return t('auth.activate.descIdle')
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
            const text = message || t('auth.activate.invalidLink')
            errorMessage.value = text
            alreadyActivated.value = /уже активирован/i.test(text)
            status.value = 'error'
            return
        }

        successMessage.value = message || t('auth.activate.successFallback')
        status.value = 'success'
    } catch {
        errorMessage.value = t('auth.activate.networkError')
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
    title: () => t('auth.activate.metaTitle'),
    robots: 'noindex, nofollow',
})
</script>
