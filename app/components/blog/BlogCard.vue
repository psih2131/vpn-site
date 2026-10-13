<template>
    <NuxtLink :to="`/blog/${post.slug}`" class="blog-card">
        <div class="blog-card__media">
            <img
                v-if="imageSrc"
                class="blog-card__img"
                :src="imageSrc"
                :alt="post.title"
            >
            <div v-else class="blog-card__img blog-card__img--empty"></div>
            <div class="blog-card__media-meta">
                <span>📅 {{ post.date }}</span>
            </div>
        </div>
        <!--
        <div class="blog-card__tags">
            <span v-for="tag in (post.tags || []).slice(0, 3)" :key="tag" class="blog-tag">{{ tag }}</span>
        </div>
        -->
        <h3 class="blog-card__title">{{ post.title }}</h3>
        <p class="blog-card__excerpt">{{ post.excerpt }}</p>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
})

const { adminUrl, apiBase } = useAdminApi()

const { data: coverResponse } = await useFetch(
    () => (props.post.coverUploadId
        ? adminUrl(`/api/v1/admin/uploads/${props.post.coverUploadId}`)
        : null),
    {
        key: `blog-card-cover-${props.post.id}-${props.post.coverUploadId || 'none'}`,
        credentials: 'include',
    },
)

const imageSrc = computed(() => {
    if (props.post.image) return props.post.image
    const path = coverResponse.value?.data?.path
    return path ? `${apiBase}/uploads/${path}` : ''
})
</script>
