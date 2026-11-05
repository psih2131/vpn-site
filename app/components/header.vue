<template>
    <header class="header">
        <div class="container header__inner">
            <NuxtLink :to="$localePath('/')" class="header__logo">
                <img class="header__logo-icon" :src="logoMark" alt="">
                <span class="header__logo-text">Dark Nova</span>
            </NuxtLink>

            <nav class="header__nav">
                <div class="header__nav-item">
                    <span class="header__nav-badge">Free</span>
                    <a :href="`${$localePath('/')}#hero`" class="header__nav-link">{{ $t('header.tryFree') }}</a>
                </div>
                <a :href="`${$localePath('/')}#pricing`" class="header__nav-link">{{ $t('header.pricing') }}</a>
                <NuxtLink :to="$localePath('/regions')" class="header__nav-link">{{ $t('header.regions') }}</NuxtLink>
                <NuxtLink :to="$localePath('/blog')" class="header__nav-link">{{ $t('header.blog') }}</NuxtLink>
                <a href="https://t.me/darkNovaVpn_support" target="_blank" rel="noopener noreferrer" class="header__nav-link">{{ $t('header.support') }}</a>
            </nav>

            <div class="header__actions">
                <LangSwitch />

                <NuxtLink
                    v-if="user"
                    :to="$localePath('/account')"
                    class="header__user"
                >
                    <span class="header__user-avatar" aria-hidden="true">{{ userInitial }}</span>
                    <span class="header__user-email">{{ displayEmail }}</span>
                </NuxtLink>

                <button
                    v-else-if="!userPending"
                    type="button"
                    class="header__connect-btn"
                    @click="openAuthModal"
                >
                    {{ $t('header.signIn') }}
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'
import logoMark from '~/assets/images/logo.png'

const storeModal = useModalStore()
const { adminUrl } = useAdminApi()
const { trackEvent } = useGtag()

const user = ref(null)
const userPending = ref(true)

const userInitial = computed(() => {
    const email = String(user.value?.email || '').trim()
    return email ? email[0].toUpperCase() : '?'
})

const displayEmail = computed(() => {
    const email = String(user.value?.email || '').trim()
    if (email.length <= 12) return email
    return `${email.slice(0, 12)}...`
})

function openAuthModal() {
    trackEvent('click_cta', { button_name: 'header_auth' })
    storeModal.typeActiveModal('authorization')
    storeModal.openCloseModal(true)
}

async function loadUserInfo() {
    userPending.value = true

    try {
        const response = await fetch(adminUrl('/api/v1/account/user-info'), {
            method: 'GET',
            credentials: 'include',
        })

        const data = await response.json().catch(() => null)

        if (response.ok && data?.success && data?.data?.user) {
            user.value = data.data.user
            return
        }

        user.value = null
    } catch {
        user.value = null
    } finally {
        userPending.value = false
    }
}

onMounted(() => {
    loadUserInfo()
})
</script>
