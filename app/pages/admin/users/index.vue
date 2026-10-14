<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <div class="admin-users__title-row">
                    <h1 class="admin-content__title">Пользователи</h1>
                    <span v-if="!pending && !error" class="admin-users__count">{{ users.length }}</span>
                    <span
                        v-if="!pending && !error"
                        class="admin-users__count admin-users__count--active"
                    >
                        active {{ activeUsersCount }}
                    </span>
                </div>
                <p class="admin-content__hint">Список всех пользователей VPN</p>
            </div>
        </div>

        <AdminUsersTabs active="all" />

        <p v-if="pending" class="admin-content__hint">Загрузка…</p>
        <p v-else-if="error" class="admin-content__hint">Не удалось загрузить пользователей</p>
        <p v-else-if="!users.length" class="admin-content__hint">Пользователей пока нет</p>

        <div v-else class="admin-users-list admin-users-list--all">
            <div class="admin-users-list__head">
                <span class="admin-users-list__col admin-users-list__col--id">ID</span>
                <span class="admin-users-list__col admin-users-list__col--first">Имя</span>
                <span class="admin-users-list__col admin-users-list__col--last">Фамилия</span>
                <span class="admin-users-list__col admin-users-list__col--username">Username</span>
                <span class="admin-users-list__col admin-users-list__col--lang">Язык</span>
                <span class="admin-users-list__col admin-users-list__col--status">Статус</span>
                <span class="admin-users-list__col admin-users-list__col--vpn">VPN ID</span>
                <span class="admin-users-list__col admin-users-list__col--sub">VPN Sub ID</span>
                <span class="admin-users-list__col admin-users-list__col--email">Email</span>
            </div>

            <AdminUserListItem
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

const { data, pending, error } = await useAsyncData('admin-users-all', () =>
    $fetch(adminUrl('/api/v1/admin/users'), {
        credentials: 'include',
    }),
)

const users = computed(() => {
    const rows = data.value?.data?.rows
    return Array.isArray(rows) ? rows : []
})

const activeUsersCount = computed(() => (
    users.value.filter((user) => String(user.status || '').toLowerCase() === 'active').length
))
</script>
