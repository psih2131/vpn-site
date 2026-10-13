<template>
    <div class="admin-blog-list__row">
        <span class="admin-blog-list__col admin-blog-list__col--title">{{ post.title }}</span>
        <span class="admin-blog-list__col admin-blog-list__col--id">{{ post.id }}</span>
        <span class="admin-blog-list__col admin-blog-list__col--date">{{ formatDate(post.created_at || post.date) }}</span>
        <span class="admin-blog-list__col admin-blog-list__col--actions">
            <NuxtLink
                :to="`/admin/blog/${post.id}`"
                class="admin-blog-list__btn"
                aria-label="Редактировать"
                title="Редактировать"
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 20h4l10.5-10.5a2.1 2.1 0 00-3-3L5 17v3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                    <path d="M13.5 6.5l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
            </NuxtLink>
            <button
                type="button"
                class="admin-blog-list__btn admin-blog-list__btn--danger"
                aria-label="Удалить"
                title="Удалить"
                :disabled="deleting"
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
import { useNotificationStore } from '~/stores/notification'

const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['deleted'])

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()
const deleting = ref(false)

function formatDate(raw) {
    if (!raw) return '—'

    const date = new Date(raw)
    if (Number.isNaN(date.getTime())) return String(raw)

    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

async function onDelete() {
    deleting.value = true

    try {
        await $fetch(adminUrl(`/api/v1/admin/blog/${props.post.id}`), {
            method: 'DELETE',
            credentials: 'include',
        })

        emit('deleted', props.post.id)
    } catch (error) {
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || error?.message || 'Не удалось удалить пост',
        })
    } finally {
        deleting.value = false
    }
}
</script>
