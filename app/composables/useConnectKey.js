import { useModalStore } from '~/stores/modal'
import { useNotificationStore } from '~/stores/notification'

export function useConnectKey() {
    const storeModal = useModalStore()
    const storeNotification = useNotificationStore()
    const { adminUrl } = useAdminApi()
    const connectionKey = ref('')

    function closeModal() {
        storeModal.openCloseModal(false)
    }

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
                : ''
        } catch {
            connectionKey.value = ''
        }
    }

    async function copyKey() {
        if (!connectionKey.value) {
            await loadKey()
        }

        if (!connectionKey.value) {
            storeNotification.setNotification({
                type: 'error',
                text: 'Не удалось получить ключ',
            })
            return
        }

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

    return {
        closeModal,
        copyKey,
        loadKey,
    }
}
