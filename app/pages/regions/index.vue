<template>
    <div class="regions-page">
        <section class="regions-hero">
            <div class="container">
                <h1 class="regions-hero__title">
                    {{ $t('regions.title') }}
                    <span class="regions-hero__accent">{{ $t('regions.accent') }}</span>
                </h1>
                <p class="regions-hero__subtitle">{{ $t('regions.subtitle') }}</p>

                <div class="regions-hero__stats">
                    <div class="regions-hero__stat">{{ $t('regions.countries') }}</div>
                    <div class="regions-hero__stat">{{ $t('regions.locations') }}</div>
                    <div class="regions-hero__stat">{{ $t('regions.uptime') }}</div>
                </div>

                <ClientOnly>
                    <RegionsMap />
                    <template #fallback>
                        <div class="regions-map regions-map--fallback">{{ $t('regions.loading') }}</div>
                    </template>
                </ClientOnly>
            </div>
        </section>

        <section class="countries">
            <div class="container">
                <h2 class="section-title">{{ $t('servers.title') }}</h2>
                <div class="countries__grid">
                    <div
                        v-for="country in countries"
                        :key="`${country.name}-${country.city}`"
                        class="countries__item"
                    >
                        <ServerFlag :code="country.flag" class="countries__flag" />
                        <div class="countries__info">
                            <div class="countries__name">{{ country.name }}</div>
                            <div class="countries__city">{{ country.city }}</div>
                        </div>
                        <span
                            v-if="country.badge"
                            class="countries__badge"
                            :class="`countries__badge--${country.badgeType}`"
                        >
                            {{ country.badge }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section id="faq" class="faq">
            <div class="container">
                <h2 class="section-title faq__title">{{ $t('regions.faqTitle') }}</h2>
                <div class="faq__list">
                    <div
                        v-for="(item, index) in faqItems"
                        :key="index"
                        class="faq__item"
                        :class="{ 'faq__item--open': openFaq === index }"
                    >
                        <div
                            class="faq__question"
                            @click="toggleFaq(index)"
                        >
                            <span class="faq__question-text">{{ item.question }}</span>
                            <span class="faq__toggle" :class="{ 'faq__toggle--open': openFaq === index }">+</span>
                        </div>
                        <Vue3SlideUpDown
                            :model-value="openFaq === index"
                            :duration="320"
                            timing-function="cubic-bezier(0.4, 0, 0.2, 1)"
                            eager
                        >
                            <p class="faq__answer">{{ item.answer }}</p>
                        </Vue3SlideUpDown>
                    </div>
                </div>
            </div>
        </section>

        <section class="regions-cta">
            <div class="container">
                <BlogPostCta />
            </div>
        </section>
    </div>
</template>

<script setup>
import { Vue3SlideUpDown } from 'vue3-slide-up-down'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const countries = useVpnServers()

const siteUrl = 'https://darknovavpn.com'
const ogImage = `${siteUrl}/dark-nova-green-eyes.png`

const faqItems = computed(() => Array.from({ length: 5 }, (_, index) => {
    const n = index + 1
    return {
        question: t(`regions.q${n}`),
        answer: t(`regions.a${n}`),
    }
}))

const openFaq = ref(null)

function toggleFaq(index) {
    openFaq.value = openFaq.value === index ? null : index
}

useHead(() => {
    const pageTitle = t('regions.metaTitle')
    const pageDescription = t('regions.metaDescription')
    const pagePath = localePath('/regions')
    const pageUrl = `${siteUrl}${pagePath}`
    const lang = locale.value === 'en' ? 'en' : 'ru'

    return {
        title: pageTitle,
        htmlAttrs: { lang },
        meta: [
            { name: 'description', content: pageDescription },
            { name: 'robots', content: 'index, follow' },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: pageDescription },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: pageUrl },
            { property: 'og:locale', content: lang === 'en' ? 'en_US' : 'ru_RU' },
            { property: 'og:image', content: ogImage },
            { property: 'og:image:alt', content: t('regions.imageAlt') },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: pageDescription },
            { name: 'twitter:image', content: ogImage },
        ],
        link: [
            { rel: 'canonical', href: pageUrl },
            { rel: 'alternate', hreflang: 'ru', href: `${siteUrl}/regions` },
            { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en/regions` },
            { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/regions` },
        ],
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    inLanguage: lang === 'en' ? 'en-US' : 'ru-RU',
                    mainEntity: faqItems.value.map((item) => ({
                        '@type': 'Question',
                        name: item.question,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: item.answer,
                        },
                    })),
                }),
            },
        ],
    }
})
</script>
