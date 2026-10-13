export default defineSitemapEventHandler(async () => {
    const apiBase = (useRuntimeConfig().public.apiBase || 'http://127.0.0.1:3001').replace(/\/$/, '')

    try {
        const res = await $fetch(`${apiBase}/api/v1/admin/blog`)
        const list = res?.data || []

        return list.map((post) => ({
            loc: `/blog/${post.slug}`,
            lastmod: post.updated_at || post.created_at,
            changefreq: 'weekly',
            priority: 0.7,
        }))
    } catch (e) {
        console.error('[sitemap/blog]', e)
        return []
    }
})
