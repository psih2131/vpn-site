<template>
    <div class="blog-page">
        <div class="blog-page__inner">
            <section class="blog-page__section">
                <nav class="blog-breadcrumbs" aria-label="Хлебные крошки">
                    <NuxtLink to="/" class="blog-breadcrumbs__link">Главная</NuxtLink>
                    <span class="blog-breadcrumbs__sep">/</span>
                    <span class="blog-breadcrumbs__current">Блог</span>
                </nav>

                <h2 class="blog-page__title">Наш блог</h2>

                <p v-if="pending" class="blog-card__excerpt">Загрузка…</p>
                <p v-else-if="error" class="blog-card__excerpt">Не удалось загрузить статьи</p>
                <p v-else-if="!posts.length" class="blog-card__excerpt">Постов пока нет</p>

                <div v-else class="blog-recommended__grid">
                    <BlogCard
                        v-for="post in posts"
                        :key="post.id"
                        :post="post"
                    />
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Блог Dark Nova VPN — статьи про VPN, Happ и INCY',
    meta: [
        {
            name: 'description',
            content: 'Статьи Dark Nova VPN: подключение Happ и INCY, безопасность, обход блокировок, серверы и инструкции для устройств.',
        },
        {
            name: 'keywords',
            content: 'блог VPN, Dark Nova, Happ, INCY, VPN ключ, безопасность, обход блокировок',
        },
        { name: 'robots', content: 'index, follow' },

        { property: 'og:title', content: 'Блог Dark Nova VPN — статьи про VPN, Happ и INCY' },
        {
            property: 'og:description',
            content: 'Гайды и статьи про VPN: подключение, безопасность, серверы и работа с Happ и INCY.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://dark-nova-vpn.space/blog' },
        { property: 'og:image', content: 'https://dark-nova-vpn.space/dark-nova-green-eyes.png' },
        { property: 'og:image:alt', content: 'Блог Dark Nova VPN' },

        { property: 'article:published_time', content: '' },
        { property: 'article:modified_time', content: '' },
        { property: 'article:author', content: 'Dark Nova' },
        { property: 'article:section', content: 'Блог' },
        { property: 'article:tag', content: 'VPN' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Блог Dark Nova VPN — статьи про VPN, Happ и INCY' },
        {
            name: 'twitter:description',
            content: 'Гайды и статьи про VPN: подключение, безопасность, серверы и работа с Happ и INCY.',
        },
        { name: 'twitter:image', content: 'https://dark-nova-vpn.space/dark-nova-green-eyes.png' },
    ],
    link: [
        { rel: 'canonical', href: 'https://dark-nova-vpn.space/blog' },
    ],
})

const { adminUrl } = useAdminApi()

function formatDate(raw) {
    if (!raw) return '—'
    const date = new Date(raw)
    if (Number.isNaN(date.getTime())) return String(raw)
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

const { data: posts, pending, error } = await useFetch(
    () => adminUrl('/api/v1/admin/blog'),
    {
        key: 'blog-posts',
        credentials: 'include',
        default: () => [],
        transform: (response) => {
            const rows = response?.data || []
            return rows.map((row) => ({
                id: row.id,
                slug: row.slug,
                title: row.title,
                excerpt: row.excerpt || '',
                date: formatDate(row.created_at),
                coverUploadId: row.cover_upload_id,
            }))
        },
    },
)
</script>
