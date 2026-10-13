<template>
    <div class="blog-post-page">
        <div v-if="pending" class="blog-post-page__inner">
            <p class="blog-post__date">Загрузка…</p>
        </div>

        <div v-else-if="post" class="blog-post-page__inner">
            <nav class="blog-breadcrumbs" aria-label="Хлебные крошки">
                <NuxtLink to="/" class="blog-breadcrumbs__link">Главная</NuxtLink>
                <span class="blog-breadcrumbs__sep">/</span>
                <NuxtLink to="/blog" class="blog-breadcrumbs__link">Блог</NuxtLink>
                <span class="blog-breadcrumbs__sep">/</span>
                <span class="blog-breadcrumbs__current">{{ post.title }}</span>
            </nav>

            <h1 class="blog-post__title">{{ post.title }}</h1>

            <div class="blog-post__meta">
                <span class="blog-post__date">{{ post.date }}</span>
            </div>

            <!--
            <div class="blog-post__tags">
              <span v-for="tag in post.tags" :key="tag" class="blog-tag">#{{ tag }}</span>
            </div>
            -->

            <div v-if="post.image" class="blog-post__cover">
                <img :src="post.image" :alt="post.title">
            </div>

            <div class="blog-post__content text-content" v-html="post.contentHtml"></div>

            <BlogPostCta />

            <section v-if="recommendedPosts.length" class="blog-similar">
                <h2 class="blog-similar__title">Похожие статьи</h2>
                <div class="blog-similar__grid">
                    <BlogCard
                        v-for="item in recommendedPosts"
                        :key="item.id"
                        :post="item"
                    />
                </div>
                <div class="blog-similar__more">
                    <NuxtLink to="/blog" class="blog-btn-more">Все статьи</NuxtLink>
                </div>
            </section>
        </div>

        <div v-else class="blog-post-page__inner">
            <nav class="blog-breadcrumbs" aria-label="Хлебные крошки">
                <NuxtLink to="/" class="blog-breadcrumbs__link">Главная</NuxtLink>
                <span class="blog-breadcrumbs__sep">/</span>
                <NuxtLink to="/blog" class="blog-breadcrumbs__link">Блог</NuxtLink>
            </nav>
            <h1 class="blog-post__title">Статья не найдена</h1>
            <p class="blog-post__date">Проверьте ссылку или вернитесь в блог.</p>
            <div class="blog-similar__more">
                <NuxtLink to="/blog" class="blog-btn-more">Все статьи</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const { adminUrl, apiBase } = useAdminApi()

function formatDate(raw, long = false) {
    if (!raw) return '—'
    const date = new Date(raw)
    if (Number.isNaN(date.getTime())) return String(raw)
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: long ? 'long' : 'short',
        year: 'numeric',
    })
}

const { data: postResponse, pending } = await useFetch(
    () => adminUrl(`/api/v1/admin/blog/slug/${route.params.slug}`),
    {
        key: `blog-post-${route.params.slug}`,
        credentials: 'include',
    },
)

const { data: coverResponse } = await useFetch(
    () => {
        const coverUploadId = postResponse.value?.data?.cover_upload_id
        return coverUploadId
            ? adminUrl(`/api/v1/admin/uploads/${coverUploadId}`)
            : null
    },
    {
        key: `blog-post-cover-${route.params.slug}`,
        credentials: 'include',
    },
)

const { data: allPostsResponse } = await useFetch(
    () => adminUrl('/api/v1/admin/blog'),
    {
        key: 'blog-posts',
        credentials: 'include',
    },
)

function mapPost(row, image = '') {
    if (!row) return null

    return {
        id: row.id,
        slug: row.slug,
        title: row.title || '',
        excerpt: row.excerpt || '',
        date: formatDate(row.created_at, true),
        image,
        contentHtml: row.content_html || '',
        seo_title: row.seo_title || '',
        seo_description: row.seo_description || '',
        seo_keywords: row.seo_keywords || '',
        seo_robots: row.seo_robots || 'index, follow',
        seo_canonical: row.seo_canonical || '',
        seo_og_title: row.seo_og_title || '',
        seo_og_description: row.seo_og_description || '',
        seo_og_type: row.seo_og_type || 'article',
        seo_og_url: row.seo_og_url || '',
        seo_article_published_time: row.seo_article_published_time || '',
        seo_article_modified_time: row.seo_article_modified_time || '',
        seo_article_author: row.seo_article_author || 'Dark Nova',
        seo_article_section: row.seo_article_section || '',
        seo_article_tag: row.seo_article_tag || '',
        seo_twitter_card: row.seo_twitter_card || 'summary_large_image',
        seo_twitter_title: row.seo_twitter_title || '',
        seo_twitter_description: row.seo_twitter_description || '',
    }
}

function mapRecommended(row) {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title || '',
        excerpt: row.excerpt || '',
        date: formatDate(row.created_at),
        coverUploadId: row.cover_upload_id,
    }
}

const post = computed(() => {
    const row = postResponse.value?.data || null
    const coverPath = coverResponse.value?.data?.path || ''
    const image = coverPath ? `${apiBase}/uploads/${coverPath}` : ''
    return mapPost(row, image)
})

const recommendedPosts = computed(() => {
    const row = postResponse.value?.data || null
    const recommendedIds = Array.isArray(row?.recommended_ids) ? row.recommended_ids : []
    const allRows = allPostsResponse.value?.data || []

    return recommendedIds
        .map((id) => allRows.find((item) => Number(item.id) === Number(id)))
        .filter(Boolean)
        .map(mapRecommended)
})

useHead(() => {
    const current = post.value
    if (!current) {
        return {
            title: 'Статья не найдена | Dark Nova VPN',
            meta: [
                { name: 'description', content: 'Блог Dark Nova VPN' },
                { name: 'robots', content: 'noindex, follow' },
            ],
        }
    }

    const pageTitle = current.seo_title || current.title || 'Блог Dark Nova VPN'
    const pageDescription = current.seo_description || current.excerpt || ''
    const ogTitle = current.seo_og_title || pageTitle
    const ogDescription = current.seo_og_description || pageDescription
    const twitterTitle = current.seo_twitter_title || pageTitle
    const twitterDescription = current.seo_twitter_description || pageDescription
    const ogImage = current.image || ''
    const canonical = current.seo_canonical || ''
    const ogUrl = current.seo_og_url || canonical || ''

    return {
        title: pageTitle,
        meta: [
            { name: 'description', content: pageDescription },
            { name: 'keywords', content: current.seo_keywords || '' },
            { name: 'robots', content: current.seo_robots || 'index, follow' },

            { property: 'og:title', content: ogTitle },
            { property: 'og:description', content: ogDescription },
            { property: 'og:type', content: current.seo_og_type || 'article' },
            { property: 'og:url', content: ogUrl },
            { property: 'og:image', content: ogImage },

            { property: 'article:published_time', content: current.seo_article_published_time || '' },
            { property: 'article:modified_time', content: current.seo_article_modified_time || '' },
            { property: 'article:author', content: current.seo_article_author || 'Dark Nova' },
            { property: 'article:section', content: current.seo_article_section || '' },
            { property: 'article:tag', content: current.seo_article_tag || '' },

            { name: 'twitter:card', content: current.seo_twitter_card || 'summary_large_image' },
            { name: 'twitter:title', content: twitterTitle },
            { name: 'twitter:description', content: twitterDescription },
            { name: 'twitter:image', content: ogImage },
        ],
        link: canonical
            ? [{ rel: 'canonical', href: canonical }]
            : [],
    }
})
</script>
