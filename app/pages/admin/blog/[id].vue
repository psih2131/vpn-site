<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <h1 class="admin-content__title">Редактирование поста</h1>
                <p class="admin-content__hint">ID: {{ route.params.id }}</p>
            </div>
            <div class="admin-blog__actions">
                <NuxtLink to="/admin/blog" class="admin-blog__back">
                    ← К списку
                </NuxtLink>
                <button
                    type="button"
                    class="admin-blog__add"
                    :disabled="saving || loading"
                    @click="onUpdate"
                >
                    {{ saving ? 'Сохранение…' : 'Обновить' }}
                </button>
            </div>
        </div>

        <p v-if="loading" class="admin-content__hint">Загрузка поста…</p>

        <div v-else class="admin-blog-edit">
            <AdminBlogBasicFields
                v-model:title="form.title"
                v-model:slug="form.slug"
                v-model:excerpt="form.excerpt"
            />
            <AdminBlogCoverUpload
                :key="coverPreviewKey"
                :initial-preview="coverPreview"
                @uploaded="onCoverUploaded"
                @cleared="onCoverCleared"
            />
            <AdminBlogContentFields v-model="form.contentHtml" />
            <AdminBlogRecommendedPicker
                v-model="form.recommendedIds"
                :post-id="route.params.id"
            />
            <AdminBlogSeoFields v-model="form.seo" :slug="form.slug" />
        </div>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
    layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const { adminUrl, apiBase } = useAdminApi()
const storeNotification = useNotificationStore()

const loading = ref(true)
const saving = ref(false)
const coverPreview = ref('')
const coverPreviewKey = ref(0)

const form = reactive({
    title: '',
    slug: '',
    excerpt: '',
    coverUploadId: null,
    contentHtml: '',
    recommendedIds: [],
    seo: {
        title: '',
        description: '',
        keywords: '',
        robots: 'index, follow',
        canonical: '',
        ogTitle: '',
        ogDescription: '',
        ogType: 'article',
        ogUrl: '',
        articlePublishedTime: '',
        articleModifiedTime: '',
        articleAuthor: 'Dark Nova',
        articleSection: '',
        articleTag: '',
        twitterCard: 'summary_large_image',
        twitterTitle: '',
        twitterDescription: '',
    },
})

function fillForm(post) {
    form.title = post.title || ''
    form.slug = post.slug || ''
    form.excerpt = post.excerpt || ''
    form.contentHtml = post.content_html || ''
    form.coverUploadId = post.cover_upload_id ?? null
    form.recommendedIds = Array.isArray(post.recommended_ids) ? [...post.recommended_ids] : []

    form.seo.title = post.seo_title || ''
    form.seo.description = post.seo_description || ''
    form.seo.keywords = post.seo_keywords || ''
    form.seo.robots = post.seo_robots || 'index, follow'
    form.seo.canonical = post.seo_canonical || ''
    form.seo.ogTitle = post.seo_og_title || ''
    form.seo.ogDescription = post.seo_og_description || ''
    form.seo.ogType = post.seo_og_type || 'article'
    form.seo.ogUrl = post.seo_og_url || ''
    form.seo.articlePublishedTime = post.seo_article_published_time || ''
    form.seo.articleModifiedTime = post.seo_article_modified_time || ''
    form.seo.articleAuthor = post.seo_article_author || 'Dark Nova'
    form.seo.articleSection = post.seo_article_section || ''
    form.seo.articleTag = post.seo_article_tag || ''
    form.seo.twitterCard = post.seo_twitter_card || 'summary_large_image'
    form.seo.twitterTitle = post.seo_twitter_title || ''
    form.seo.twitterDescription = post.seo_twitter_description || ''
}

async function loadCoverPreview(uploadId) {
    if (!uploadId) {
        coverPreview.value = ''
        return
    }

    try {
        const response = await $fetch(adminUrl(`/api/v1/admin/uploads/${uploadId}`), {
            credentials: 'include',
        })
        const path = response?.data?.path
        coverPreview.value = path ? `${apiBase}/uploads/${path}` : ''
    } catch {
        coverPreview.value = ''
    }
}

async function loadPost() {
    loading.value = true

    try {
        const response = await $fetch(adminUrl(`/api/v1/admin/blog/${route.params.id}`), {
            credentials: 'include',
        })

        const post = response?.data
        if (!post) {
            throw new Error('Пост не найден')
        }

        fillForm(post)
        await loadCoverPreview(post.cover_upload_id)
        coverPreviewKey.value += 1
    } catch (error) {
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || error?.message || 'Не удалось загрузить пост',
        })
        await router.push('/admin/blog')
    } finally {
        loading.value = false
    }
}

function onCoverUploaded(id) {
    form.coverUploadId = id
}

function onCoverCleared() {
    form.coverUploadId = null
    coverPreview.value = ''
}

async function onUpdate() {
    if (!form.title.trim() || !form.slug.trim()) {
        storeNotification.setNotification({
            type: 'error',
            text: 'Заполните заголовок и slug',
        })
        return
    }

    saving.value = true

    try {
        await $fetch(adminUrl(`/api/v1/admin/blog/${route.params.id}`), {
            method: 'PUT',
            credentials: 'include',
            body: {
                title: form.title,
                slug: form.slug,
                excerpt: form.excerpt,
                contentHtml: form.contentHtml,
                coverUploadId: form.coverUploadId,
                recommendedIds: form.recommendedIds,
                seo: form.seo,
            },
        })

        storeNotification.setNotification({
            type: 'success',
            text: 'Пост обновлён',
        })
    } catch (error) {
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || error?.message || 'Не удалось обновить пост',
        })
    } finally {
        saving.value = false
    }
}

onMounted(() => {
    loadPost()
})
</script>
