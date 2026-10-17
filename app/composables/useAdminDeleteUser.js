import { useNotificationStore } from '~/stores/notification'

export function useAdminDeleteUser() {
    const { adminUrl } = useAdminApi()
    const storeNotification = useNotificationStore()
    const adminBusy = useState('admin-busy', () => false)

    async function deleteUser(userId) {
        if (!confirm(`Удалить пользователя ${userId}?`)) {
            return false
        }

        adminBusy.value = true

        try {
            const response = await $fetch(adminUrl(`/api/v1/admin/users/${userId}`), {
                method: 'DELETE',
                credentials: 'include',
            })

            if (response?.success !== true) {
                throw new Error(response?.message || 'Не удалось удалить пользователя')
            }

            storeNotification.setNotification({
                type: 'success',
                text: `Пользователь ${response?.data?.id || userId} успешно удалён`,
            })

            return true
        } catch (error) {
            storeNotification.setNotification({
                type: 'error',
                text: error?.data?.message || error?.message || 'Не удалось удалить пользователя',
            })
            return false
        } finally {
            adminBusy.value = false
        }
    }

    return {
        adminBusy,
        deleteUser,
    }
}
