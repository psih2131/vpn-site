<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <div class="admin-users__title-row">
                    <h1 class="admin-content__title">Платящие</h1>
                    <span v-if="!pending && !error" class="admin-users__count">{{ users.length }}</span>
                </div>
                <p class="admin-content__hint">Список платящих пользователей VPN</p>
            </div>
        </div>

        <AdminUsersTabs active="paying" />

        <p v-if="pending" class="admin-content__hint">Загрузка…</p>
        <p v-else-if="error" class="admin-content__hint">Не удалось загрузить платящих пользователей</p>
        <p v-else-if="!users.length" class="admin-content__hint">Платящих пользователей пока нет</p>

        <div v-else class="admin-users-list">
            <div class="admin-users-list__head admin-users-list__head--paying">
                <span class="admin-users-list__col admin-users-list__col--name">Пользователь</span>
                <span class="admin-users-list__col admin-users-list__col--plan">Тариф</span>
                <span class="admin-users-list__col admin-users-list__col--pay-status">Платёж</span>
                <span class="admin-users-list__col admin-users-list__col--status">Статус</span>
                <span class="admin-users-list__col admin-users-list__col--lang">Язык</span>
                <span class="admin-users-list__col admin-users-list__col--sub">VPN Sub ID</span>
            </div>

            <AdminPayingUserListItem
                v-for="user in users"
                :key="user.id"
                :user="user"
            />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
})

const { adminUrl } = useAdminApi()

const { data, pending, error } = await useAsyncData('admin-users-paying', () =>
    $fetch(adminUrl('/api/v1/admin/users/paying'), {
        credentials: 'include',
    }),
)

const users = computed(() => {
    const list = data.value?.data
    return Array.isArray(list) ? list : []
})
</script>
