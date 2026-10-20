export default defineNuxtRouteMiddleware(async () => {
    const { adminUrl } = useAdminApi()

    // При SSR cookie из браузера сами не уходят на внешний API —
    // пробрасываем заголовок Cookie с входящего запроса.
    const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined

    try {
        const response = await $fetch(adminUrl('/api/v1/account/user-info'), {
            credentials: 'include',
            headers,
        })

        if (!response?.success || !response?.data?.user) {
            return navigateTo('/')
        }
    } catch {
        return navigateTo('/')
    }
})
