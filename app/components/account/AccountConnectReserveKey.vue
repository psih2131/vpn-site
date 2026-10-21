<template>
    <section class="connect-key">
        <div class="connect-key__top">
            <span class="connect-key__label">Резервный ключ</span>
        </div>

        <UiConnectKeyField :value="connectionKey" filename="vpn-reserve-key.txt" input />

        <p class="connect-key__note">
            Это резервный ключ. Используйте только в том случае, если основной ключ перестал работать. Резервный ключ содержит настройки для всех серверов по отдельности, что исключает полную блокировку сервиса при сносе распределительного узла.
        </p>
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
        const data = await $fetch(adminUrl('/api/v1/account/vpn-parts-link'), {
            credentials: 'include',
            headers,
        })

        connectionKey.value = data?.success && data?.data?.vpnPartsLink
            ? data.data.vpnPartsLink
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
