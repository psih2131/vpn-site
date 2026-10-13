<template>
    <div class="account-content connect-page">
        <header class="connect-page__head">
            <h1 class="connect-page__title">Включить VPN</h1>
            <p class="connect-page__desc">Ключ подключения и установка на ваше устройство</p>
        </header>

        <section class="sub-stats connect-stats">
            <div class="sub-stats__card">
                <span class="sub-stats__label">Подписка</span>
                <strong class="sub-stats__value">{{ info.plan }}</strong>
            </div>
            <div class="sub-stats__card">
                <span class="sub-stats__label">Статус</span>
                <strong class="sub-stats__value sub-stats__value--active">{{ info.status }}</strong>
            </div>
            <div class="sub-stats__card">
                <span class="sub-stats__label">Израсходовано трафика</span>
                <strong class="sub-stats__value">
                    {{ info.trafficUsed }}
                    <span>/ {{ info.trafficLimit }}</span>
                </strong>
            </div>
            <div class="sub-stats__card">
                <span class="sub-stats__label">Устройства</span>
                <strong class="sub-stats__value">
                    {{ info.devices }}
                    <span>/ {{ info.devicesLimit }}</span>
                </strong>
            </div>
        </section>

        <section class="connect-key">
            <div class="connect-key__top">
                <span class="connect-key__label">Ваш ключ</span>
                <span class="connect-key__badge">
                    <span class="connect-key__badge-dot" aria-hidden="true"></span>
                    VLESS
                </span>
            </div>

            <div class="connect-key__field">
                <code class="connect-key__value">{{ connectionKey }}</code>
            </div>

            <div class="connect-key__hint">
                <svg class="connect-key__hint-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 6.5v4M10 13.5h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M8.2 3.6h3.6L17 9.8v3.6a2.6 2.6 0 01-2.6 2.6H5.6A2.6 2.6 0 013 13.4V9.8L8.2 3.6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
                </svg>
                <p>
                    Данный ключ используется в клиенте «Happ». Для других приложений используйте кнопку
                    «Установить приложение» ниже.
                </p>
            </div>

            <div class="connect-key__actions">
                <button type="button" class="connect-key__btn connect-key__btn--primary" @click="copyKey">
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <rect x="7" y="7" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M13 7V5.5A1.5 1.5 0 0011.5 4h-6A1.5 1.5 0 004 5.5v6A1.5 1.5 0 005.5 13H7" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    Скопировать ключ
                </button>
                <button type="button" class="connect-key__btn connect-key__btn--ghost" @click="scrollToInstall">
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M10 3.5v8M10 11.5l-3-3M10 11.5l3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4 14.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    Установить приложение
                </button>
            </div>
        </section>

        <section class="connect-grid">
            <button type="button" class="connect-grid__item" @click="scrollToInstall">
                <span class="connect-grid__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M7 17a4 4 0 010-8 5.2 5.2 0 0110.1 1.2A3.5 3.5 0 0117 17H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M12 11v6M12 17l-2.2-2.2M12 17l2.2-2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span class="connect-grid__text">
                    <span class="connect-grid__title">Установить приложение</span>
                    <span class="connect-grid__sub">Выберите устройство</span>
                </span>
            </button>

            <button type="button" class="connect-grid__item" @click="regenerateKey">
                <span class="connect-grid__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="8.5" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M11.5 12H20M16.5 12v2.5M19 12v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </span>
                <span class="connect-grid__text">
                    <span class="connect-grid__title">Смена ключа</span>
                    <span class="connect-grid__sub">Сгенерировать новый</span>
                </span>
            </button>

            <NuxtLink to="/account/subscription" class="connect-grid__item">
                <span class="connect-grid__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 3.5l2 5.2 5.5.5-4.2 3.6 1.3 5.4L12 15.6 7.4 18.2l1.3-5.4L4.5 9.2l5.5-.5L12 3.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>
                </span>
                <span class="connect-grid__text">
                    <span class="connect-grid__title">Продлить подписку</span>
                    <span class="connect-grid__sub">Выбрать тариф</span>
                </span>
            </NuxtLink>

            <NuxtLink to="/account/documents" class="connect-grid__item">
                <span class="connect-grid__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 5.5A2.5 2.5 0 017.5 3H19v15.5H7.5A2.5 2.5 0 005 21V5.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M5 18.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </span>
                <span class="connect-grid__text">
                    <span class="connect-grid__title">Инструкция</span>
                    <span class="connect-grid__sub">Как настроить</span>
                </span>
                <span class="connect-grid__external" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                        <path d="M5 11l6-6M7 5h4v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </NuxtLink>
        </section>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
    layout: 'account',
})

const storeNotification = useNotificationStore()

const info = {
    plan: 'Trial',
    status: 'Активна',
    trafficUsed: '2.4 ГБ',
    trafficLimit: '50 ГБ',
    devices: 1,
    devicesLimit: 5,
}

const connectionKey = ref('https://opsvpnvless.ru/vless-json/8f3a2c91-4e6b-4d12-a9c7-1b0e5f84d2a1')

async function copyKey() {
    try {
        await navigator.clipboard.writeText(connectionKey.value)
        storeNotification.setNotification({
            type: 'success',
            text: 'Ключ скопирован',
        })
    } catch {
        storeNotification.setNotification({
            type: 'error',
            text: 'Не удалось скопировать ключ',
        })
    }
}

function scrollToInstall() {
    storeNotification.setNotification({
        type: 'info',
        text: 'Выбор устройства скоро появится',
    })
}

function regenerateKey() {
    storeNotification.setNotification({
        type: 'info',
        text: 'Смена ключа скоро появится',
    })
}
</script>
