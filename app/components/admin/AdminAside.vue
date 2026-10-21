<template>
    <aside class="admin-aside">
        <div class="admin-aside__top">
            <div class="admin-aside__header">
                <NuxtLink to="/admin" class="admin-aside__brand">Dark Nova</NuxtLink>
                <span class="admin-aside__badge">Admin</span>
            </div>

            <p class="admin-aside__caption">Управление сайтом</p>

            <nav class="admin-aside__nav">
                <NuxtLink
                    v-for="item in navItems"
                    :key="item.to"
                    :to="item.to"
                    class="admin-aside__link"
                    :class="{ 'is-active': isNavActive(item.to) }"
                >
                    <span class="admin-aside__link-icon" v-html="item.icon"></span>
                    <span class="admin-aside__link-text">{{ item.label }}</span>
                </NuxtLink>
            </nav>
        </div>

        <div class="admin-aside__bottom">
            <NuxtLink to="/" class="admin-aside__site-link">
                ← На сайт
            </NuxtLink>
        </div>
    </aside>
</template>

<script setup>
const route = useRoute()

const icons = {
    home: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 10.8L12 4.2l8 6.6V20a.8.8 0 01-.8.8h-4.4v-5.2H9.2V20.8H4.8A.8.8 0 014 20v-9.2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    blog: `<svg viewBox="0 0 24 24" fill="none"><path d="M7.2 3.4h6.6L18.8 8v12.2a.8.8 0 01-.8.8H7.2a.8.8 0 01-.8-.8V4.2a.8.8 0 01.8-.8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M13.8 3.4V8h4.6M9 12.8h6M9 16.4h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none"><path d="M16.2 7.4a3.2 3.2 0 11-6.4 0 3.2 3.2 0 016.4 0zM4.8 19.2a5.2 5.2 0 0110.4 0M14.8 12.6a3.2 3.2 0 013.8-3.1 3.2 3.2 0 01.6 6.2M19.2 19.2a4.4 4.4 0 00-2.8-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    accounts: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 12.2a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM5.2 19.4a6.8 6.8 0 0113.6 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    plans: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 7.2h15M4.5 12h15M4.5 16.8h10.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16.8 15.2l1.6 1.6 3.2-3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

const navItems = [
    { label: 'Главная', to: '/admin', icon: icons.home },
    { label: 'Блог', to: '/admin/blog', icon: icons.blog },
    { label: 'Пользователи', to: '/admin/users', icon: icons.users },
    { label: 'Аккаунты', to: '/admin/accounts', icon: icons.accounts },
    { label: 'Тарифы', to: '/admin/plans', icon: icons.plans },
]

function isNavActive(to) {
    if (to === '/admin') return route.path === '/admin'
    return route.path === to || route.path.startsWith(`${to}/`)
}
</script>
