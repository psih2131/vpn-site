<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <div class="admin-users__title-row">
                    <h1 class="admin-content__title">Аккаунты</h1>
                    <span v-if="!pending && !error" class="admin-users__count">{{ accounts.length }}</span>
                </div>
                <p class="admin-content__hint">Зарегистрированные на сайте</p>
            </div>
        </div>

        <p v-if="pending" class="admin-content__hint">Загрузка…</p>
        <p v-else-if="error" class="admin-content__hint">Не удалось загрузить аккаунты</p>
        <p v-else-if="!accounts.length" class="admin-content__hint">Аккаунтов пока нет</p>

        <div v-else class="admin-users-list admin-accounts-list">
            <div class="admin-users-list__head">
                <span class="admin-users-list__col">ID</span>
                <span class="admin-users-list__col">Email</span>
                <span class="admin-users-list__col">Имя</span>
                <span class="admin-users-list__col">Фамилия</span>
                <span class="admin-users-list__col">Активация</span>
                <span class="admin-users-list__col">Создан</span>
            </div>

            <div
                v-for="account in accounts"
                :key="account.id"
                class="admin-users-list__row"
            >
                <span class="admin-users-list__col">{{ account.id }}</span>
                <span class="admin-users-list__col">{{ account.email }}</span>
                <span class="admin-users-list__col">{{ displayValue(account.firstName) }}</span>
                <span class="admin-users-list__col">{{ displayValue(account.lastName) }}</span>
                <span class="admin-users-list__col">{{ account.isActivated ? 'Да' : 'Нет' }}</span>
                <span class="admin-users-list__col">{{ formatDate(account.createdAt) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
})

const { adminUrl } = useAdminApi()

const { data, pending, error } = await useAsyncData('admin-accounts', () =>
    $fetch(adminUrl('/api/v1/admin/accounts'), {
        credentials: 'include',
    }),
)

const accounts = computed(() => (Array.isArray(data.value?.data) ? data.value.data : []))

function displayValue(value) {
    const text = String(value || '').trim()
    return text || '—'
}

function formatDate(value) {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
</script>
