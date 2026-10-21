<template>
    <section class="connect-key">
        <div class="connect-key__top">
            <span class="connect-key__label">Ваш ключ</span>
        </div>

        <UiConnectKeyField :value="connectionKey" filename="vpn-key.txt" />

        <div class="connect-key__alert" role="note">
            <span class="connect-key__alert-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3.6 2.7 19.2a1.4 1.4 0 0 0 1.2 2.1h16.2a1.4 1.4 0 0 0 1.2-2.1L12 3.6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                    <path d="M12 9.2v4.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M12 16.8h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                </svg>
            </span>
            <div class="connect-key__alert-body">
                <p class="connect-key__alert-title">Внимание</p>
                <p class="connect-key__alert-text">
                    Ключ данной конфигурации может использоваться только в клиентах Happ и INCY. Подробнее в разделе «Установить приложение».
                </p>
            </div>
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
