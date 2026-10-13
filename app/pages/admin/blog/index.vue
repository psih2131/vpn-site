<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <h1 class="admin-content__title">Блог</h1>
                <p class="admin-content__hint">Список статей сайта</p>
            </div>
            <NuxtLink to="/admin/blog/new" class="admin-blog__add">
                + Добавить пост
            </NuxtLink>
        </div>

        <p v-if="pending" class="admin-content__hint">Загрузка…</p>
        <p v-else-if="error" class="admin-content__hint">Не удалось загрузить посты</p>
        <p v-else-if="!(data?.data || []).length" class="admin-content__hint">Постов пока нет</p>

        <div v-else class="admin-blog-list">
            <div class="admin-blog-list__head">
                <span class="admin-blog-list__col admin-blog-list__col--title">Название</span>
                <span class="admin-blog-list__col admin-blog-list__col--id">ID</span>
                <span class="admin-blog-list__col admin-blog-list__col--date">Дата публикации</span>
                <span class="admin-blog-list__col admin-blog-list__col--actions">Действия</span>
            </div>

            <AdminBlogListItem
                v-for="post in (data?.data || [])"
                :key="post.id"
                :post="post"
                @deleted="onPostDeleted"
            />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
})

const { adminUrl } = useAdminApi()

const { data, pending, error } = await useAsyncData('admin-blog-posts', () =>
    $fetch(adminUrl('/api/v1/admin/blog'), {
        credentials: 'include',
    }),
)

function onPostDeleted(id) {
    if (!data.value?.data) return
    data.value.data = data.value.data.filter((post) => String(post.id) !== String(id))
}
</script>
