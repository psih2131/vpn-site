<template>
    <div class="admin-form__field">
        <span class="admin-form__label">Обложка</span>
        <div class="admin-form__cover">
            <div class="admin-form__cover-preview">
                <img
                    v-if="preview"
                    :src="preview"
                    alt="Превью обложки"
                    class="admin-form__cover-img"
                >
                <span v-else class="admin-form__cover-placeholder">Нет изображения</span>
            </div>

            <div class="admin-form__cover-actions">
                <input
                    ref="fileInput"
                    class="admin-form__file"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                    :disabled="uploading"
                    @change="onCoverChange"
                >
                <button
                    type="button"
                    class="admin-form__upload"
                    :disabled="uploading"
                    @click="fileInput?.click()"
                >
                    {{ uploading ? 'Загрузка…' : 'Загрузить картинку' }}
                </button>
                <button
                    v-if="preview"
                    type="button"
                    class="admin-form__clear"
                    :disabled="uploading"
                    @click="clearCover"
                >
                    Убрать
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const emit = defineEmits(['uploaded', 'cleared'])

const props = defineProps({
    initialPreview: {
        type: String,
        default: '',
    },
})

const { adminUrl, apiBase } = useAdminApi()
const storeNotification = useNotificationStore()

const fileInput = ref(null)
const objectUrl = ref('')
const preview = ref(props.initialPreview)
const uploading = ref(false)
const uploadId = ref(null)

watch(() => props.initialPreview, (value) => {
    if (!objectUrl.value) {
        preview.value = value
    }
})

function revokeObjectUrl() {
    if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value)
        objectUrl.value = ''
    }
}

async function onCoverChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    uploading.value = true

    revokeObjectUrl()
    objectUrl.value = URL.createObjectURL(file)
    preview.value = objectUrl.value

    try {
        const body = new FormData()
        body.append('file', file)
        body.append('folder', 'blog')

        const response = await $fetch(adminUrl('/api/v1/admin/uploads'), {
            method: 'POST',
            credentials: 'include',
            body,
        })

        const upload = response?.data
        if (!upload?.id) {
            throw new Error('Сервер не вернул id файла')
        }

        uploadId.value = upload.id

        if (upload.path) {
            revokeObjectUrl()
            preview.value = `${apiBase}/uploads/${upload.path}`
        }

        emit('uploaded', upload.id)
    } catch (error) {
        revokeObjectUrl()
        preview.value = props.initialPreview || ''
        uploadId.value = null
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || error?.message || 'Не удалось загрузить файл',
        })
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    } finally {
        uploading.value = false
    }
}

function clearCover() {
    revokeObjectUrl()
    preview.value = props.initialPreview || ''
    uploadId.value = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
    emit('cleared')
}

onUnmounted(() => {
    revokeObjectUrl()
})
</script>
