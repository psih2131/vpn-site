<template>
    <section class="connect-key">
        <div class="connect-key__top">
            <span class="connect-key__label">Резервный VPN ключ</span>
        </div>

        <UiConnectKeyField :value="connectionKey" filename="vpn-reserve-key.txt" input />

        <div class="connect-key__info">
            <div class="connect-key__info-head">
                <span class="connect-key__info-mark" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 3.2l6.8 2.8v4.8c0 4.6-3.1 7.8-6.8 9.2-3.7-1.4-6.8-4.6-6.8-9.2V6L12 3.2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M12 8.5v4M12 15.2h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    </svg>
                </span>
                <div>
                    <p class="connect-key__info-title">Запасной ключ на случай сбоя</p>
                    <p class="connect-key__info-lead">Подключайте только если основной VPN ключ перестал работать.</p>
                </div>
            </div>

            <ul class="connect-key__info-list">
                <li class="connect-key__info-item">
                    <span class="connect-key__info-num">01</span>
                    <div>
                        <p class="connect-key__info-item-title">Когда нужен</p>
                        <p class="connect-key__info-item-text">Не обновляется список серверов, не идёт подключение или приложение показывает ошибку.</p>
                    </div>
                </li>
                <li class="connect-key__info-item">
                    <span class="connect-key__info-num">02</span>
                    <div>
                        <p class="connect-key__info-item-title">Чем отличается</p>
                        <p class="connect-key__info-item-text">Серверы идут по отдельности. Если один узел заблокируют, остальные продолжат работать.</p>
                    </div>
                </li>
                <li class="connect-key__info-item">
                    <span class="connect-key__info-num">03</span>
                    <div>
                        <p class="connect-key__info-item-title">Как добавить</p>
                        <p class="connect-key__info-item-text">Добавляется точно так же, как основной ключ. Если основной уже был в приложении — лучше удалить его и подключить резервный.</p>
                    </div>
                </li>
            </ul>
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
