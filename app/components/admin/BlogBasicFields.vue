<template>
    <div class="admin-blog-basic">
        <div class="admin-form__row">
            <label class="admin-form__field">
                <span class="admin-form__label">Заголовок</span>
                <input
                    v-model="title"
                    class="admin-form__input"
                    type="text"
                    placeholder="Название статьи"
                >
            </label>

            <div class="admin-form__field">
                <span class="admin-form__label">Slug</span>
                <div class="admin-form__slug">
                    <input
                        v-model="slug"
                        class="admin-form__input"
                        type="text"
                        placeholder="kak-rabotaet-vpn"
                    >
                    <button
                        type="button"
                        class="admin-form__slug-btn"
                        title="Сгенерировать slug из заголовка"
                        aria-label="Сгенерировать slug из заголовка"
                        @click="onGenerateSlug"
                    >
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M4 12h4l2-7 4 14 2-7h4"
                                stroke="currentColor"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <label class="admin-form__field">
            <span class="admin-form__label">Короткое описание</span>
            <textarea
                v-model="excerpt"
                class="admin-form__textarea"
                rows="3"
                placeholder="Краткий текст для карточки и SEO"
            ></textarea>
        </label>
    </div>
</template>

<script setup>
import { slugifyTitle } from '~/utils/slugify'

const title = defineModel('title', { type: String, default: '' })
const slug = defineModel('slug', { type: String, default: '' })
const excerpt = defineModel('excerpt', { type: String, default: '' })

function onGenerateSlug() {
    slug.value = slugifyTitle(title.value)
}
</script>
