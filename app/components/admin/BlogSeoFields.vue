<template>
    <div class="admin-form__field">
        <span class="admin-form__label">SEO</span>
        <div class="admin-seo">
        <div class="admin-seo__section">
            <h3 class="admin-seo__section-title">Basic meta</h3>
            <div class="admin-form__row">
                <label class="admin-form__field">
                    <span class="admin-form__label">title</span>
                    <input v-model="seo.title" class="admin-form__input" type="text" placeholder="SEO title">
                </label>
                <label class="admin-form__field">
                    <span class="admin-form__label">keywords</span>
                    <input v-model="seo.keywords" class="admin-form__input" type="text" placeholder="vpn, privacy, dark nova">
                </label>
            </div>
            <label class="admin-form__field">
                <span class="admin-form__label">description</span>
                <textarea v-model="seo.description" class="admin-form__textarea" rows="2" placeholder="Meta description"></textarea>
            </label>
            <div class="admin-form__row">
                <label class="admin-form__field">
                    <span class="admin-form__label">robots</span>
                    <input v-model="seo.robots" class="admin-form__input" type="text" placeholder="index, follow">
                </label>
                <div class="admin-form__field">
                    <span class="admin-form__label">canonical</span>
                    <div class="admin-form__slug">
                        <input
                            v-model="seo.canonical"
                            class="admin-form__input"
                            type="text"
                            placeholder="https://dark-nova-vpn.space/blog/..."
                        >
                        <button
                            type="button"
                            class="admin-form__slug-btn"
                            title="Сгенерировать canonical из slug"
                            aria-label="Сгенерировать canonical из slug"
                            @click="onGenerateCanonical"
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
        </div>

        <div class="admin-seo__section">
            <h3 class="admin-seo__section-title">Open Graph</h3>
            <div class="admin-form__row">
                <label class="admin-form__field">
                    <span class="admin-form__label">og:title</span>
                    <input v-model="seo.ogTitle" class="admin-form__input" type="text">
                </label>
                <label class="admin-form__field">
                    <span class="admin-form__label">og:type</span>
                    <input v-model="seo.ogType" class="admin-form__input" type="text" placeholder="article">
                </label>
            </div>
            <label class="admin-form__field">
                <span class="admin-form__label">og:description</span>
                <textarea v-model="seo.ogDescription" class="admin-form__textarea" rows="2"></textarea>
            </label>
            <div class="admin-form__field">
                <span class="admin-form__label">og:url</span>
                <div class="admin-form__slug">
                    <input
                        v-model="seo.ogUrl"
                        class="admin-form__input"
                        type="text"
                        placeholder="https://..."
                    >
                    <button
                        type="button"
                        class="admin-form__slug-btn"
                        title="Сгенерировать og:url из slug"
                        aria-label="Сгенерировать og:url из slug"
                        @click="onGenerateOgUrl"
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

        <div class="admin-seo__section">
            <h3 class="admin-seo__section-title">Open Graph Article</h3>
            <div class="admin-form__row">
                <label class="admin-form__field">
                    <span class="admin-form__label">article:published_time</span>
                    <input v-model="seo.articlePublishedTime" class="admin-form__input" type="text" placeholder="2026-10-12T10:00:00+03:00">
                </label>
                <label class="admin-form__field">
                    <span class="admin-form__label">article:modified_time</span>
                    <input v-model="seo.articleModifiedTime" class="admin-form__input" type="text" placeholder="2026-10-12T18:00:00+03:00">
                </label>
            </div>
            <div class="admin-form__row">
                <label class="admin-form__field">
                    <span class="admin-form__label">article:author</span>
                    <input v-model="seo.articleAuthor" class="admin-form__input" type="text" placeholder="Dark Nova">
                </label>
                <label class="admin-form__field">
                    <span class="admin-form__label">article:section</span>
                    <input v-model="seo.articleSection" class="admin-form__input" type="text" placeholder="VPN / Privacy">
                </label>
            </div>
            <label class="admin-form__field">
                <span class="admin-form__label">article:tag</span>
                <input v-model="seo.articleTag" class="admin-form__input" type="text" placeholder="vpn, happ, privacy">
            </label>
        </div>

        <div class="admin-seo__section">
            <h3 class="admin-seo__section-title">Twitter Card</h3>
            <div class="admin-form__row">
                <label class="admin-form__field">
                    <span class="admin-form__label">twitter:card</span>
                    <input v-model="seo.twitterCard" class="admin-form__input" type="text" placeholder="summary_large_image">
                </label>
                <label class="admin-form__field">
                    <span class="admin-form__label">twitter:title</span>
                    <input v-model="seo.twitterTitle" class="admin-form__input" type="text">
                </label>
            </div>
            <label class="admin-form__field">
                <span class="admin-form__label">twitter:description</span>
                <textarea v-model="seo.twitterDescription" class="admin-form__textarea" rows="2"></textarea>
            </label>
        </div>
        </div>
    </div>
</template>

<script setup>
const seo = defineModel({
    type: Object,
    required: true,
})

const props = defineProps({
    slug: {
        type: String,
        default: '',
    },
})

const siteUrl = 'https://dark-nova-vpn.space'

function buildPostUrl() {
    const cleanSlug = String(props.slug || '').trim().replace(/^\/+|\/+$/g, '')
    if (!cleanSlug) return ''
    return `${siteUrl}/blog/${cleanSlug}`
}

function onGenerateCanonical() {
    const url = buildPostUrl()
    if (!url) return
    seo.value.canonical = url
}

function onGenerateOgUrl() {
    const url = buildPostUrl()
    if (!url) return
    seo.value.ogUrl = url
}
</script>
