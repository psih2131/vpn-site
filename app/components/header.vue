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
                <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer" class="header__connect-btn">
                    <svg class="header__connect-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                    Подключить
                </a>
                <!-- <button type="button" class="header__connect-btn" @click="openAuthModal">
                    Авторизоваться
                </button> -->
            </div>
        </div>
    </header>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'

const telegramBotLink = 'https://t.me/dark_nova_vpn_bot'
const storeModal = useModalStore()

function openAuthModal() {
    storeModal.typeActiveModal('authorization')
    storeModal.openCloseModal(true)
}
</script>
