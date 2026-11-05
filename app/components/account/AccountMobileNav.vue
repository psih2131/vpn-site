<template>
    <header class="account-topbar">
        <NuxtLink :to="localePath('/')" class="account-topbar__home" :aria-label="$t('cabinet.nav.homeAria')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8"/>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
        </NuxtLink>
        <NuxtLink :to="localePath('/account')" class="account-topbar__brand">
            <img class="account-topbar__mark" :src="logoMark" alt="">
            <span>Dark Nova</span>
        </NuxtLink>
        <span class="account-topbar__spacer" aria-hidden="true"></span>
    </header>

    <nav class="account-tabbar" :aria-label="$t('cabinet.nav.main')">
        <NuxtLink
            v-for="item in tabs"
            :key="item.to"
            :to="localePath(item.to)"
            class="account-tabbar__item"
            :class="{ 'is-active': isNavActive(item.to) }"
        >
            <span class="account-tabbar__icon" aria-hidden="true" v-html="item.icon"></span>
            <span class="account-tabbar__label">{{ item.label }}</span>
        </NuxtLink>

        <button
            class="account-tabbar__item"
            :class="{ 'is-active': moreOpen || moreActive }"
            type="button"
            :aria-label="$t('cabinet.nav.more')"
            :aria-expanded="moreOpen"
            @click="moreOpen = true"
        >
            <span class="account-tabbar__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                    <path d="M4 5h16M4 12h16M4 19h16"/>
                </svg>
            </span>
            <span class="account-tabbar__label">{{ $t('cabinet.nav.more') }}</span>
        </button>
    </nav>

    <Teleport to="body">
        <div v-if="moreOpen" class="account-more">
            <button class="account-more__backdrop" type="button" :aria-label="$t('cabinet.nav.close')" @click="moreOpen = false"></button>
            <div class="account-more__panel" role="dialog" aria-labelledby="account-more-title">
                <div class="account-more__head">
                    <p id="account-more-title" class="account-more__title">{{ $t('cabinet.nav.moreTitle') }}</p>
                    <button class="account-more__close" type="button" :aria-label="$t('cabinet.nav.close')" @click="moreOpen = false">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="account-more__list">
                    <component
                        :is="item.soon ? 'span' : item.external ? 'a' : NuxtLink"
                        v-for="item in moreItems"
                        :key="item.label"
                        class="account-more__link"
                        :class="{ 'is-soon': item.soon, 'is-active': !item.soon && !item.external && isNavActive(item.to) }"
                        v-bind="item.soon
                            ? { 'aria-disabled': 'true' }
                            : item.external
                                ? { href: item.to, target: '_blank', rel: 'noopener noreferrer' }
                                : { to: localePath(item.to) }"
                        @click="onMoreClick(item)"
                    >
                        <span class="account-more__icon" aria-hidden="true" v-html="item.icon"></span>
                        <span class="account-more__text">{{ item.label }}</span>
                        <span v-if="item.soon" class="account-more__mark" :aria-label="$t('cabinet.nav.soon')">
                            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <rect x="3.2" y="7" width="9.6" height="6.2" rx="1.2" stroke="currentColor" stroke-width="1.3"/>
                                <path d="M5.4 7V5.2a2.6 2.6 0 015.2 0V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span v-else class="account-more__mark" aria-hidden="true">
                            <svg v-if="item.external" viewBox="0 0 16 16" fill="none">
                                <path d="M5 11L11 5M11 5H6.5M11 5v4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg v-else viewBox="0 0 16 16" fill="none">
                                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </component>
                </div>

                <div class="account-more__lang">
                    <span>{{ $t('header.language') }}</span>
                    <LangSwitch />
                </div>

                <button class="account-more__logout" type="button" :disabled="loggingOut" @click="logout">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M10 7V6a2 2 0 012-2h7a2 2 0 012 2v12a2 2 0 01-2 2h-7a2 2 0 01-2-2v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M15 12H4m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ $t('cabinet.nav.logout') }}
                </button>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { NuxtLink } from '#components'
import logoMark from '~/assets/images/logo.png'

const route = useRoute()
const { adminUrl } = useAdminApi()
const { t } = useI18n()
const localePath = useLocalePath()

const moreOpen = ref(false)
const loggingOut = ref(false)

const icons = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
    gem: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    devices: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="9" cy="8" r="2.8"/><circle cx="16.5" cy="9" r="2.2"/><path d="M4.2 18.2c0-2.3 2.1-4.2 4.8-4.2s4.8 1.9 4.8 4.2M14 18.2c.2-1.5 1.5-2.7 3.2-2.7 1.4 0 2.6.8 3 1.9" stroke-linecap="round"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"><path d="M6.2 16.8h11.6v-5.2a5.8 5.8 0 10-11.6 0v5.2z"/><path d="M10 19.6h4" stroke-linecap="round"/></svg>`,
    support: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"><path d="M5.2 11a6.8 6.8 0 0113.6 0v1.8a2.8 2.8 0 01-2.8 2.8h-1.2v-4.6h3.8M5.2 12.8h3.8v4.6H8a2.8 2.8 0 01-2.8-2.8v-1.8z"/></svg>`,
    docs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"><path d="M7.2 3.4h6.6L18.8 8v12.2a.8.8 0 01-.8.8H7.2a.8.8 0 01-.8-.8V4.2a.8.8 0 01.8-.8z"/><path d="M13.8 3.4V8h4.6M9 12.8h6M9 16.4h6" stroke-linecap="round"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="12" cy="12" r="2.8"/><path d="M12 4v2M12 18v2M5.6 6.8l1.4 1.4M17 15.8l1.4 1.4M4 12h2M18 12h2M5.6 17.2l1.4-1.4M17 8.2l1.4-1.4"/></svg>`,
}

const tabs = computed(() => [
    { label: t('cabinet.nav.home'), to: '/account', icon: icons.home },
    { label: t('cabinet.nav.subscription'), to: '/account/subscription', icon: icons.gem },
    { label: t('cabinet.nav.vpn'), to: '/account/connect', icon: icons.globe },
    { label: t('cabinet.nav.devices'), to: '/account/devices', icon: icons.devices },
])

const moreItems = computed(() => [
    { label: t('cabinet.nav.referral'), to: '/account/referral', icon: icons.users, soon: true },
    { label: t('cabinet.nav.notifications'), to: '/account/notifications', icon: icons.bell, soon: true },
    { label: t('cabinet.nav.support'), to: 'https://t.me/darkNovaVpn_support', icon: icons.support, external: true },
    { label: t('cabinet.nav.documents'), to: '/account/documents', icon: icons.docs, soon: true },
    { label: t('cabinet.nav.settings'), to: '/account/settings', icon: icons.settings, soon: true },
])

const moreActive = computed(() => moreItems.value.some((item) => !item.soon && !item.external && isNavActive(item.to)))

function isNavActive(to) {
    const current = route.path.replace(/\/$/, '') || '/'
    const target = localePath(to).replace(/\/$/, '') || '/'
    if (to === '/account') return current === target
    return current === target || current.startsWith(`${target}/`)
}

function onMoreClick(item) {
    if (item.soon) return
    moreOpen.value = false
}

watch(() => route.fullPath, () => {
    moreOpen.value = false
})

async function logout() {
    if (loggingOut.value) return
    loggingOut.value = true

    try {
        await fetch(adminUrl('/api/v1/account/logout'), {
            method: 'POST',
            credentials: 'include',
        })
    } catch {
        // даже если запрос упал — уводим с панели
    } finally {
        loggingOut.value = false
        moreOpen.value = false
        await navigateTo(localePath('/'))
    }
}
</script>
