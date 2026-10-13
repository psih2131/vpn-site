export function useAdminApi() {
    const config = useRuntimeConfig()
    const apiBase = String(config.public.apiBase || '').replace(/\/$/, '')

    function adminUrl(path) {
        return `${apiBase}${path}`
    }

    return {
        apiBase,
        adminUrl,
    }
}
