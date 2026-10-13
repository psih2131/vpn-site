<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <h1 class="admin-content__title">Новый пост</h1>
                <p class="admin-content__hint">Создание статьи</p>
            </div>
            <div class="admin-blog__actions">
                <NuxtLink to="/admin/blog" class="admin-blog__back">
                    ← К списку
                </NuxtLink>
                <button
                    type="button"
                    class="admin-blog__add"
                    :disabled="saving"
                    @click="onPublish"
                >
                    {{ saving ? 'Публикация…' : 'Опубликовать' }}
                </button>
            </div>
        </div>

        <div class="admin-blog-edit">
            <AdminBlogBasicFields
                v-model:title="form.title"
                v-model:slug="form.slug"
                v-model:excerpt="form.excerpt"
            />
            <AdminBlogCoverUpload
                @uploaded="onCoverUploaded"
                @cleared="onCoverCleared"
            />
            <AdminBlogContentFields v-model="form.contentHtml" />
            <AdminBlogRecommendedPicker v-model="form.recommendedIds" />
            <AdminBlogSeoFields v-model="form.seo" :slug="form.slug" />
        </div>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
    layout: 'admin',
})

const router = useRouter()
const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()
const saving = ref(false)

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

function onCoverUploaded(id) {
    form.coverUploadId = id
}

function onCoverCleared() {
    form.coverUploadId = null
}

async function onPublish() {
    if (!form.title.trim() || !form.slug.trim()) {
        storeNotification.setNotification({
            type: 'error',
            text: 'Заполните заголовок и slug',
        })
        return
    }

    saving.value = true

    try {
        await $fetch(adminUrl('/api/v1/admin/blog'), {
            method: 'POST',
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
            text: 'Пост опубликован',
        })

        await router.push('/admin/blog')
    } catch (error) {
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || error?.message || 'Не удалось опубликовать пост',
        })
    } finally {
        saving.value = false
    }
}
</script>
