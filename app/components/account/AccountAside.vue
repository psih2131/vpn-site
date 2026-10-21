<template>
    <aside class="account-aside">
        <div class="account-aside__top">
            <div class="account-aside__header">
                <NuxtLink to="/" class="account-aside__brand">Dark Nova</NuxtLink>
                <NuxtLink to="/" class="account-aside__collapse" aria-label="На главную">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M14.5 7.5L10 12l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </NuxtLink>
            </div>

            <nav class="account-aside__nav">
                <div
                    v-for="(group, groupIndex) in navGroups"
                    :key="groupIndex"
                    class="account-aside__group"
                >
                    <component
                        :is="item.soon ? 'span' : item.external ? 'a' : NuxtLink"
                        v-for="item in group"
                        :key="item.to"
                        v-bind="item.soon
                            ? { 'aria-disabled': 'true' }
                            : item.external
                                ? { href: item.to, target: '_blank', rel: 'noopener noreferrer' }
                                : { to: item.to }"
                        class="account-aside__link"
                        :class="{
                            'is-active': !item.soon && !item.external && isNavActive(item.to),
                            'account-aside__link--featured': item.highlight,
                            'is-soon': item.soon,
                        }"
                    >
                        <svg
                            v-if="item.highlight"
                            class="account-aside__snake"
                            aria-hidden="true"
                        >
                            <rect
                                class="account-aside__snake-path"
                                x="1"
                                y="1"
                                rx="9"
                                ry="9"
                                pathLength="100"
                            />
                        </svg>
                        <span class="account-aside__link-icon" v-html="item.icon"></span>
                        <span class="account-aside__link-text">{{ item.label }}</span>
                        <span v-if="item.soon" class="account-aside__soon" aria-label="В разработке">
                            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <rect x="3.2" y="7" width="9.6" height="6.2" rx="1.2" stroke="currentColor" stroke-width="1.3"/>
                                <path d="M5.4 7V5.2a2.6 2.6 0 015.2 0V7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span v-else-if="item.badge" class="account-aside__badge">{{ item.badge }}</span>
                    </component>
                </div>
            </nav>
        </div>

        <button class="account-aside__logout" type="button" @click="logout">
            <span class="account-aside__link-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M10 7V6a2 2 0 012-2h7a2 2 0 012 2v12a2 2 0 01-2 2h-7a2 2 0 01-2-2v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M15 12H4m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <span>Выйти из аккаунта</span>
        </button>
    </aside>
</template>

<script setup>
import { NuxtLink } from '#components'

const route = useRoute()

const icons = {
    home: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 10.8L12 4.2l8 6.6V20a.8.8 0 01-.8.8h-4.4v-5.2H9.2V20.8H4.8A.8.8 0 014 20v-9.2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    vpn: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.2l6.8 2.8v4.8c0 4.6-3.1 7.8-6.8 9.2-3.7-1.4-6.8-4.6-6.8-9.2V6L12 3.2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.6 12l1.7 1.7 3.2-3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="2.8" stroke="currentColor" stroke-width="1.5"/><circle cx="16.5" cy="9" r="2.3" stroke="currentColor" stroke-width="1.5"/><path d="M4.2 18.2c0-2.3 2.1-4.2 4.8-4.2s4.8 1.9 4.8 4.2M14 18.2c.2-1.5 1.5-2.7 3.2-2.7 1.4 0 2.6.8 3 1.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none"><path d="M6.2 16.8h11.6v-5.2a5.8 5.8 0 10-11.6 0v5.2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 19.6h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    support: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 11a6.8 6.8 0 0113.6 0v1.8a2.8 2.8 0 01-2.8 2.8h-1.2v-4.6h3.8M5.2 12.8h3.8v4.6H8a2.8 2.8 0 01-2.8-2.8v-1.8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    docs: `<svg viewBox="0 0 24 24" fill="none"><path d="M7.2 3.4h6.6L18.8 8v12.2a.8.8 0 01-.8.8H7.2a.8.8 0 01-.8-.8V4.2a.8.8 0 01.8-.8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M13.8 3.4V8h4.6M9 12.8h6M9 16.4h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.8" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v2M12 18v2M5.6 6.8l1.4 1.4M17 15.8l1.4 1.4M4 12h2M18 12h2M5.6 17.2l1.4-1.4M17 8.2l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    payment: `<svg viewBox="0 0 24 24" fill="none"><rect x="3.4" y="6.2" width="17.2" height="11.6" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3.4 10h17.2M7 14.2h3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    devices: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/></svg>`,
}

const navGroups = [
    [
        { label: 'Главная', to: '/account', icon: icons.home },
        { label: 'Оплата подписки', to: '/account/subscription', icon: icons.payment },
        { label: 'Подключить VPN', to: '/account/connect', icon: icons.vpn, highlight: true },
        { label: 'Устройства', to: '/account/devices', icon: icons.devices },
        { label: 'Реферальная программа', to: '/account/referral', icon: icons.users, soon: true },
        { label: 'Уведомления', to: '/account/notifications', icon: icons.bell, soon: true },
    ],
    [
        { label: 'Поддержка', to: 'https://t.me/darkNovaVpn_support', icon: icons.support, external: true },
        { label: 'Документы', to: '/account/documents', icon: icons.docs, soon: true },
        { label: 'Настройки', to: '/account/settings', icon: icons.settings, soon: true },
    ],
]

function isNavActive(to) {
    if (to === '/account') return route.path === '/account'
    return route.path === to || route.path.startsWith(`${to}/`)
}

const { adminUrl } = useAdminApi()
const loggingOut = ref(false)

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
        await navigateTo('/')
    }
}
</script>
