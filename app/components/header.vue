<template>
    <header class="header">
        <div class="container header__inner">
            <a href="/" class="header__logo">
                <svg class="header__logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2L32 8V18C32 26 26 32 18 34C10 32 4 26 4 18V8L18 2Z" fill="#00D981"/>
                    <path d="M18 10L24 13V18C24 22 21 25 18 26C15 25 12 22 12 18V13L18 10Z" fill="#000"/>
                </svg>
                <span class="header__logo-text">Dark Nova</span>
            </a>

            <nav class="header__nav">
                <div class="header__nav-item">
                    <span class="header__nav-badge">Free</span>
                    <a href="/#hero" class="header__nav-link">Попробовать бесплатно</a>
                </div>
                <a href="/#pricing" class="header__nav-link">Тарифный план</a>
                <NuxtLink to="/regions" class="header__nav-link">Доступные регионы</NuxtLink>
                <NuxtLink to="/blog" class="header__nav-link">Блог</NuxtLink>
                <a href="https://t.me/darkNovaVpn_support" target="_blank" rel="noopener noreferrer" class="header__nav-link">Поддержка</a>
            </nav>

            <div class="header__actions">
                <NuxtLink
                    v-if="user"
                    to="/account"
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
                    Авторизоваться
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'

const storeModal = useModalStore()
const { adminUrl } = useAdminApi()

const user = ref(null)
const userPending = ref(true)

const userInitial = computed(() => {
    const email = String(user.value?.email || '').trim()
    return email ? email[0].toUpperCase() : '?'
})

const displayEmail = computed(() => {
    const email = String(user.value?.email || '').trim()
    if (email.length <= 15) return email
    return `${email.slice(0, 15)}...`
})

function openAuthModal() {
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
