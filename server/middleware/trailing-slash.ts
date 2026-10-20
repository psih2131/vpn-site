export default defineEventHandler((event) => {
    const url = getRequestURL(event)
    const path = url.pathname

    if (path === '/' || !path.endsWith('/')) return

    // служебные пути Nuxt / статика
    if (
        path.startsWith('/_nuxt')
        || path.startsWith('/__nuxt')
        || path.startsWith('/__sitemap__')
    ) {
        return
    }

    return sendRedirect(event, `${path.slice(0, -1)}${url.search}`, 301)
})
