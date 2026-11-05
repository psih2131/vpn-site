<template>
    <section class="connect-key">
        <div class="connect-key__top">
            <span class="connect-key__label">{{ $t('cabinet.key.reserve') }}</span>
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
                    <p class="connect-key__info-title">{{ $t('cabinet.key.reserveTitle') }}</p>
                    <p class="connect-key__info-lead">{{ $t('cabinet.key.reserveLead') }}</p>
                </div>
            </div>

            <ul class="connect-key__info-list">
                <li class="connect-key__info-item">
                    <span class="connect-key__info-num">01</span>
                    <div>
                        <p class="connect-key__info-item-title">{{ $t('cabinet.key.whenTitle') }}</p>
                        <p class="connect-key__info-item-text">{{ $t('cabinet.key.whenText') }}</p>
                    </div>
                </li>
                <li class="connect-key__info-item">
                    <span class="connect-key__info-num">02</span>
                    <div>
                        <p class="connect-key__info-item-title">{{ $t('cabinet.key.diffTitle') }}</p>
                        <p class="connect-key__info-item-text">{{ $t('cabinet.key.diffText') }}</p>
                    </div>
                </li>
                <li class="connect-key__info-item">
                    <span class="connect-key__info-num">03</span>
                    <div>
                        <p class="connect-key__info-item-title">{{ $t('cabinet.key.addTitle') }}</p>
                        <p class="connect-key__info-item-text">{{ $t('cabinet.key.addText') }}</p>
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
const { t } = useI18n()

const connectionKey = ref(t('cabinet.loading'))

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
            text: t('cabinet.key.loadFailed'),
        })
    }
}

await loadKey()
</script>
