<template>
    <NuxtLink :to="`/admin/users/${user.id}`" class="admin-users-list__row">
        <span class="admin-users-list__col admin-users-list__col--id" :title="String(user.id)">
            {{ user.id }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--first">
            {{ display(user.first_name) }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--last">
            {{ display(user.last_name) }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--username">
            {{ user.username ? `@${user.username}` : '—' }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--lang">
            {{ display(user.language_code) }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--status">
            <span
                class="admin-users-list__badge"
                :class="statusClass"
            >
                {{ display(user.status) }}
            </span>
        </span>
        <span class="admin-users-list__col admin-users-list__col--vpn" :title="display(user.vpn_id)">
            {{ display(user.vpn_id) }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--sub" :title="display(user.vpn_subid)">
            {{ display(user.vpn_subid) }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--email" :title="display(user.email)">
            {{ display(user.email) }}
        </span>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
})

function display(value) {
    if (value === undefined || value === null || value === '') return '—'
    return value
}

const statusClass = computed(() => {
    const status = String(props.user.status || '').toLowerCase()
    if (status === 'active') return 'admin-users-list__badge--paid'
    return 'admin-users-list__badge--trial'
})
</script>
