<template>
    <div class="admin-form__field">
        <span class="admin-form__label">Рекомендуемые посты</span>
        <p v-if="pending" class="admin-recommend__empty">Загрузка постов…</p>
        <p v-else-if="loadError" class="admin-login__error">Не удалось загрузить посты</p>
        <div v-else class="admin-recommend">
            <div class="admin-recommend__panel">
                <div class="admin-recommend__panel-title">Все посты</div>
                <div class="admin-recommend__list">
                    <button
                        v-for="post in getAvailablePosts()"
                        :key="post.id"
                        type="button"
                        class="admin-recommend__item"
                        @click="addPost(post)"
                    >
                        <span class="admin-recommend__item-title">{{ post.title }}</span>
                        <span class="admin-recommend__item-meta">
                            ID {{ post.id }} · {{ formatDate(post.created_at) }}
                        </span>
                    </button>
                    <p v-if="getAvailablePosts().length === 0" class="admin-recommend__empty">
                        {{ posts.length === 0 ? 'Постов пока нет' : 'Все посты уже добавлены' }}
                    </p>
                </div>
            </div>

            <div class="admin-recommend__panel">
                <div class="admin-recommend__panel-title">Рекомендуемые</div>
                <div class="admin-recommend__list">
                    <div
                        v-for="post in getSelectedPosts()"
                        :key="post.id"
                        class="admin-recommend__item admin-recommend__item--selected"
                    >
                        <div class="admin-recommend__item-body">
                            <span class="admin-recommend__item-title">{{ post.title }}</span>
                            <span class="admin-recommend__item-meta">
                                ID {{ post.id }} · {{ formatDate(post.created_at) }}
                            </span>
                        </div>
                        <button
                            type="button"
                            class="admin-recommend__remove"
                            aria-label="Убрать"
                            :disabled="isLockedPost(post.id)"
                            @click="removePost(post.id)"
                        >
                            ×
                        </button>
                    </div>
                    <p v-if="getSelectedPosts().length === 0" class="admin-recommend__empty">
                        Кликни пост слева, чтобы добавить
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    postId: {
        type: [String, Number],
        default: '',
    },
})

const emit = defineEmits(['update:modelValue'])

const { adminUrl } = useAdminApi()

const posts = ref([])
const pending = ref(true)
const loadError = ref(false)

function isLockedPost(id) {
    return props.postId !== '' && props.postId !== null && String(id) === String(props.postId)
}

function getSelectedIds() {
    return props.modelValue.map(String)
}

function getSelectedPosts() {
    return getSelectedIds()
        .map((id) => posts.value.find((post) => String(post.id) === id))
        .filter(Boolean)
}

function getAvailablePosts() {
    const selected = getSelectedIds()
    return posts.value.filter((post) => !selected.includes(String(post.id)))
}

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

function emitSelected(ids) {
    emit('update:modelValue', ids)
}

function ensurePostIdSelected() {
    if (props.postId === '' || props.postId === null || props.postId === undefined) return

    const id = props.postId
    if (getSelectedIds().includes(String(id))) return

    emitSelected([...props.modelValue, id])
}

function addPost(post) {
    if (getSelectedIds().includes(String(post.id))) return
    emitSelected([...props.modelValue, post.id])
}

function removePost(id) {
    if (isLockedPost(id)) return
    emitSelected(props.modelValue.filter((item) => String(item) !== String(id)))
}

async function loadPosts() {
    pending.value = true
    loadError.value = false

    try {
        const response = await $fetch(adminUrl('/api/v1/admin/blog'), {
            credentials: 'include',
        })
        posts.value = response?.data || []
        ensurePostIdSelected()
    } catch {
        posts.value = []
        loadError.value = true
    } finally {
        pending.value = false
    }
}

watch(() => props.postId, () => {
    ensurePostIdSelected()
})

onMounted(() => {
    loadPosts()
})
</script>
