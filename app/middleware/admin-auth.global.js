export default defineNuxtRouteMiddleware(async (to) => {
    if (!to.path.startsWith('/admin')) return
    if (to.path === '/admin/login') return

    const { adminUrl } = useAdminApi()

    try {
        const response = await $fetch(adminUrl('/api/v1/admin/me'), {
            credentials: 'include',
        })

        if (!response?.success) {
            return navigateTo('/admin/login')
        }
    } catch {
        return navigateTo('/admin/login')
    }
})
