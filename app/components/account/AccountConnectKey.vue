<template>
    <section class="connect-key">
        <div class="connect-key__top">
            <span class="connect-key__label">Ваш основной VPN ключ</span>
        </div>

        <UiConnectKeyField :value="connectionKey" filename="vpn-key.txt" />

        <p class="connect-key__hint">
            <svg class="connect-key__hint-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="7.25" stroke="currentColor" stroke-width="1.5"/>
                <path d="M10 9v4.5M10 6.5h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
            <span>Если VPN с этим ключом не заработал — попробуйте резервный ключ ниже.</span>
        </p>

        <div class="connect-key__guide">
            <p class="connect-key__guide-heading">Как подключить VPN</p>

            <ol class="connect-key__roadmap">
                <li class="connect-key__roadmap-item">
                    <div class="connect-key__roadmap-rail" aria-hidden="true">
                        <span class="connect-key__roadmap-num">1</span>
                        <span class="connect-key__roadmap-line"></span>
                    </div>
                    <div class="connect-key__roadmap-card">
                        <div class="connect-key__roadmap-body">
                            <p class="connect-key__roadmap-title">Скачайте приложение под ваше устройство</p>
                            <p class="connect-key__roadmap-text">Happ или INCY — телефон, ПК или ТВ. Кнопка ниже откроет инструкцию со ссылками.</p>
                        </div>
                        <span class="connect-key__roadmap-check" aria-hidden="true">
                            <svg viewBox="0 0 20 20" fill="none">
                                <path d="M5 10.5 8.2 13.5 15 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                </li>
                <li class="connect-key__roadmap-item">
                    <div class="connect-key__roadmap-rail" aria-hidden="true">
                        <span class="connect-key__roadmap-num">2</span>
                        <span class="connect-key__roadmap-line"></span>
                    </div>
                    <div class="connect-key__roadmap-card">
                        <div class="connect-key__roadmap-body">
                            <p class="connect-key__roadmap-title">Вставьте ссылку в скачанное приложение</p>
                            <p class="connect-key__roadmap-text">Скопируйте ключ выше → в приложении «+» → вставить из буфера.</p>
                        </div>
                        <span class="connect-key__roadmap-check" aria-hidden="true">
                            <svg viewBox="0 0 20 20" fill="none">
                                <path d="M5 10.5 8.2 13.5 15 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                </li>
                <li class="connect-key__roadmap-item">
                    <div class="connect-key__roadmap-rail" aria-hidden="true">
                        <span class="connect-key__roadmap-num">3</span>
                    </div>
                    <div class="connect-key__roadmap-card">
                        <div class="connect-key__roadmap-body">
                            <p class="connect-key__roadmap-title">Выберите сервер и включите</p>
                            <p class="connect-key__roadmap-text">В списке доступных серверов выберите локацию и нажмите кнопку подключения.</p>
                        </div>
                        <span class="connect-key__roadmap-check" aria-hidden="true">
                            <svg viewBox="0 0 20 20" fill="none">
                                <path d="M5 10.5 8.2 13.5 15 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </div>
                </li>
            </ol>

            <AccountConnectActions class="connect-key__guide-actions" />
        </div>
    </section>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()

const connectionKey = ref('Загрузка…')

async function loadKey() {
    const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined

    try {
        const data = await $fetch(adminUrl('/api/v1/account/vpn-link'), {
            credentials: 'include',
            headers,
        })

        connectionKey.value = data?.success && data?.data?.vpnLink
            ? data.data.vpnLink
            : '—'
    } catch {
        connectionKey.value = '—'
        storeNotification.setNotification({
            type: 'error',
            text: 'Не удалось получить ключ',
        })
    }
}

await loadKey()
</script>
