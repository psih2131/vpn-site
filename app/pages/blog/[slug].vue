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
                <span class="blog-post__date">Добавлено: {{ post.datePublished }}</span>
                <span
                    v-if="post.dateUpdated && post.dateUpdated !== post.datePublished"
                    class="blog-post__date"
                >
                    Обновлено: {{ post.dateUpdated }}
                </span>
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
        key: 'blog-posts-raw',
        credentials: 'include',
    },
)

function toIsoDate(raw) {
    if (!raw) return ''
    const date = new Date(raw)
    if (Number.isNaN(date.getTime())) return String(raw)
    return date.toISOString()
}

const coverPath = coverResponse.value?.data?.path || ''
const postImage = coverPath ? `${apiBase}/uploads/${coverPath}` : ''
const row = postResponse.value?.data || null

const publishedIso = row
    ? (row.seo_article_published_time || toIsoDate(row.created_at))
    : ''
const modifiedIso = row
    ? (row.seo_article_modified_time || toIsoDate(row.updated_at || row.created_at))
    : ''

const post = row
    ? {
        id: row.id,
        slug: row.slug,
        title: row.title || '',
        excerpt: row.excerpt || '',
        datePublished: formatDate(row.created_at, true),
        dateUpdated: formatDate(row.updated_at || row.created_at, true),
        image: postImage,
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
        seo_article_published_time: publishedIso,
        seo_article_modified_time: modifiedIso,
        seo_article_author: row.seo_article_author || 'Dark Nova',
        seo_article_section: row.seo_article_section || '',
        seo_article_tag: row.seo_article_tag || '',
        seo_twitter_card: row.seo_twitter_card || 'summary_large_image',
        seo_twitter_title: row.seo_twitter_title || '',
        seo_twitter_description: row.seo_twitter_description || '',
    }
    : null

const recommendedIds = Array.isArray(row?.recommended_ids) ? row.recommended_ids : []
const allRows = allPostsResponse.value?.data || []
const recommendedPosts = recommendedIds
    .map((id) => allRows.find((item) => Number(item.id) === Number(id)))
    .filter(Boolean)
    .map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title || '',
        excerpt: item.excerpt || '',
        date: formatDate(item.created_at),
        coverUploadId: item.cover_upload_id,
    }))

useHead(() => {
    if (!post) {
        return {
            title: 'Статья не найдена | Dark Nova VPN',
            meta: [
                { name: 'description', content: 'Блог Dark Nova VPN' },
                { name: 'robots', content: 'noindex, follow' },
            ],
        }
    }

    const pageTitle = post.seo_title || post.title || 'Блог Dark Nova VPN'
    const pageDescription = post.seo_description || post.excerpt || ''
    const ogTitle = post.seo_og_title || pageTitle
    const ogDescription = post.seo_og_description || pageDescription
    const twitterTitle = post.seo_twitter_title || pageTitle
    const twitterDescription = post.seo_twitter_description || pageDescription
    const ogImage = post.image || 'https://dark-nova-vpn.space/dark-nova-green-eyes.png'
    const defaultCanonical = post.slug
        ? `https://dark-nova-vpn.space/blog/${post.slug}`
        : ''
    const canonical = post.seo_canonical || defaultCanonical
    const ogUrl = post.seo_og_url || canonical

    return {
        title: pageTitle,
        meta: [
            { name: 'description', content: pageDescription },
            { name: 'keywords', content: post.seo_keywords || '' },
            { name: 'robots', content: post.seo_robots || 'index, follow' },

            { property: 'og:title', content: ogTitle },
            { property: 'og:description', content: ogDescription },
            { property: 'og:type', content: post.seo_og_type || 'article' },
            { property: 'og:url', content: ogUrl },
            { property: 'og:image', content: ogImage },

            { property: 'article:published_time', content: post.seo_article_published_time || '' },
            { property: 'article:modified_time', content: post.seo_article_modified_time || '' },
            { property: 'article:author', content: post.seo_article_author || 'Dark Nova' },
            { property: 'article:section', content: post.seo_article_section || '' },
            { property: 'article:tag', content: post.seo_article_tag || '' },

            { name: 'twitter:card', content: post.seo_twitter_card || 'summary_large_image' },
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
