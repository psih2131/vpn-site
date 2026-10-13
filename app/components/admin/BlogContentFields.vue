<template>
    <div class="admin-form__field">
        <span class="admin-form__label">Контент статьи</span>
        <ClientOnly>
            <AdminBlogContentEditor v-model="contentHtml" />
            <template #fallback>
                <div class="admin-editor-fallback">Загрузка редактора…</div>
            </template>
        </ClientOnly>
    </div>
</template>

<script setup>
const contentHtml = defineModel({ type: String, default: '' })
</script>
