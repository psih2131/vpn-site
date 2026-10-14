<template>
    <Teleport to="body">
        <div class="admin-image-modal" role="dialog" aria-modal="true" aria-labelledby="admin-image-modal-title">
            <button class="admin-image-modal__backdrop" type="button" aria-label="Закрыть" @click="close" />

            <div class="admin-image-modal__panel">
                <div class="admin-image-modal__header">
                    <h2 id="admin-image-modal-title" class="admin-image-modal__title">Картинка в статью</h2>
                    <button class="admin-image-modal__close" type="button" aria-label="Закрыть" @click="close">×</button>
                </div>

                <div class="admin-form__cover">
                    <div class="admin-form__cover-preview">
                        <img
                            v-if="preview"
                            :src="preview"
                            alt="Превью картинки"
                            class="admin-form__cover-img"
                        >
                        <span v-else class="admin-form__cover-placeholder">Нет изображения</span>
                    </div>

                    <div class="admin-form__cover-actions">
                        <input
                            ref="fileInput"
                            class="admin-form__file"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            :disabled="uploading"
                            @change="onFileChange"
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
                            @click="clearFile"
                        >
                            Убрать
                        </button>
                    </div>
                </div>

                <div class="admin-image-modal__footer">
                    <button type="button" class="admin-form__clear" :disabled="uploading" @click="close">
                        Отмена
                    </button>
                    <button
                        type="button"
                        class="admin-form__upload"
                        :disabled="uploading || !imageUrl"
                        @click="confirm"
                    >
                        ОК
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

const emit = defineEmits(['confirm', 'close'])

const { adminUrl, apiBase } = useAdminApi()
const storeNotification = useNotificationStore()

const fileInput = ref(null)
const objectUrl = ref('')
const preview = ref('')
const imageUrl = ref('')
const uploading = ref(false)

function revokeObjectUrl() {
    if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value)
        objectUrl.value = ''
    }
}

async function onFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    uploading.value = true
    imageUrl.value = ''

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
        if (!upload?.path) {
            throw new Error('Сервер не вернул путь файла')
        }

        revokeObjectUrl()
        imageUrl.value = `${apiBase}/uploads/${upload.path}`
        preview.value = imageUrl.value
    } catch (error) {
        revokeObjectUrl()
        preview.value = ''
        imageUrl.value = ''
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

function clearFile() {
    revokeObjectUrl()
    preview.value = ''
    imageUrl.value = ''
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

function close() {
    emit('close')
}

function confirm() {
    if (!imageUrl.value) return
    emit('confirm', imageUrl.value)
}

onUnmounted(() => {
    revokeObjectUrl()
})
</script>
