<template>
    <div class="admin-users-list__row" @click="goToUser">
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
        <span class="admin-users-list__col admin-users-list__col--actions" @click.stop>
            <button
                type="button"
                class="admin-blog-list__btn admin-blog-list__btn--danger"
                aria-label="Удалить пользователя"
                title="Удалить пользователя"
                :disabled="adminBusy"
                @click="onDelete"
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 7h14M10 7V5h4v2M8 7l.8 12h6.4L16 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['deleted'])

const { adminBusy, deleteUser } = useAdminDeleteUser()

function display(value) {
    if (value === undefined || value === null || value === '') return '—'
    return value
}

const statusClass = computed(() => {
    const status = String(props.user.status || '').toLowerCase()
    if (status === 'active') return 'admin-users-list__badge--paid'
    return 'admin-users-list__badge--trial'
})

function goToUser() {
    if (adminBusy.value) return
    navigateTo(`/admin/users/${props.user.id}`)
}

async function onDelete() {
    const ok = await deleteUser(props.user.id)
    if (ok) emit('deleted', props.user.id)
}
</script>
