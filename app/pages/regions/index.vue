<template>
    <div class="regions-page">
        <section class="regions-hero">
            <div class="container">
                <h1 class="regions-hero__title">
                    VPN-серверы Dark Nova:
                    <span class="regions-hero__accent">карта регионов</span>
                </h1>
                <p class="regions-hero__subtitle">
                    Нидерланды, Германия, Финляндия, США, Чехия и Россия — выберите локацию и подключайтесь за минуту.
                </p>

                <div class="regions-hero__stats">
                    <div class="regions-hero__stat">6 СТРАН</div>
                    <div class="regions-hero__stat">10 ЛОКАЦИЙ</div>
                    <div class="regions-hero__stat">99.9% UPTIME</div>
                </div>

                <ClientOnly>
                    <RegionsMap />
                    <template #fallback>
                        <div class="regions-map regions-map--fallback">Загрузка карты…</div>
                    </template>
                </ClientOnly>
            </div>
        </section>

        <section class="countries">
            <div class="container">
                <h2 class="section-title">Список доступных vpn серверов</h2>
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
                <h2 class="section-title faq__title">Ответы на вопросы</h2>
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

const pageTitle = 'VPN-серверы по странам — карта регионов | Dark Nova'
const pageDescription = 'Карта VPN-серверов Dark Nova: Нидерланды, Германия, Финляндия, США, Чехия и Россия. Список локаций и протоколов VLESS / Hysteria.'
const pageUrl = 'https://darknovavpn.com/regions'
const ogImage = 'https://darknovavpn.com/dark-nova-green-eyes.png'

const faqItems = [
    {
        question: 'В каких странах есть серверы Dark Nova?',
        answer: 'Сейчас доступны локации в Нидерландах, Германии, Финляндии, США, Чехии и России. На карте выше отмечены страны с серверами, ниже — полный список протоколов VLESS и Hysteria.',
    },
    {
        question: 'Одна подписка работает на все регионы?',
        answer: 'Да. Одна ссылка-подписка из Telegram-бота открывает все доступные серверы в Happ или INCY. Отдельно покупать доступ к каждой стране не нужно.',
    },
    {
        question: 'Как выбрать страну в Happ или INCY?',
        answer: 'Добавьте подписку из бота в клиент, обновите список серверов и выберите нужную локацию — например Германию или Нидерланды. Подключение занимает несколько секунд.',
    },
    {
        question: 'Что делать, если сервер не подключается?',
        answer: 'Смените локацию в списке, проверьте что подписка активна и ссылка вставлена целиком. Если не помогло — напишите в поддержку Dark Nova в Telegram, подскажем по вашему устройству.',
    },
    {
        question: 'Чем отличаются VLESS и Hysteria?',
        answer: 'VLESS Reality хорошо маскируется под обычный HTTPS-трафик. Hysteria часто даёт более стабильную скорость на нестабильных сетях. В подписке обычно есть оба варианта — можно переключаться и сравнить.',
    },
]

const openFaq = ref(null)

function toggleFaq(index) {
    openFaq.value = openFaq.value === index ? null : index
}

useHead({
    title: pageTitle,
    meta: [
        { name: 'description', content: pageDescription },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: pageUrl },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:alt', content: 'VPN-серверы Dark Nova — карта регионов' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:image', content: ogImage },
    ],
    link: [
        { rel: 'canonical', href: pageUrl },
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqItems.map((item) => ({
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
})

const countries = [
    { flag: 'nl', name: 'Нидерланды Vless', city: 'VLESS | TCP | Reality', badge: 'Extra Fast', badgeType: 'fast' },
    { flag: 'nl', name: 'Нидерланды Hysteria', city: 'Hysteria | hysteria | TLS', badge: 'Extra Fast', badgeType: 'fast' },
    { flag: 'de', name: 'Германия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'de', name: 'Германия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'fi', name: 'Финляндия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'fi', name: 'Финляндия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'us', name: 'США Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'us', name: 'США Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'ru', name: 'Россия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'ru', name: 'Россия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'cz', name: 'Чехия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'globe', name: 'Ютуб без рекламы', city: 'VLESS | xhttp | TLS', badge: 'No Ads', badgeType: 'noads' },
]
</script>
