<template>
    <main class="main">

      <ClientOnly>
          <HeroAnim />
      </ClientOnly>

        <!-- Hero -->
        <section id="hero" class="hero">
            <img
                :src="heroSchematic"
                :alt="$t('home.hero.schematicAlt')"
                :title="$t('home.hero.schematicAlt')"
                class="hero__schematic"
            />
            <div class="container">
                <div class="hero__inner">
                    <div class="hero__content">
                        <span class="hero__badge">
                            <svg class="hero__badge-icon" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1.2 9.7 5.5 14.4 6l-3.5 3.1.9 4.5L8 11.4 4.2 13.6l.9-4.5L1.6 6l4.7-.5L8 1.2Z"/>
                            </svg>
                            {{ $t('home.hero.badge') }}
                        </span>
                        <h1 class="hero__title">{{ $t('home.hero.titleLine1') }}<br>{{ $t('home.hero.titleLine2') }}</h1>
                        <p class="hero__text">{{ $t('home.hero.text') }}</p>
                        <div class="hero__actions">
                            <button type="button" class="hero__btn" @click="openRegistration('hero_connect_free')">
                                {{ $t('home.hero.connect') }}
                                <svg class="hero__btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
                                    <path d="M3 8h10M9 4l4 4-4 4"/>
                                </svg>
                            </button>
                            <a href="#howto" class="hero__btn hero__btn--ghost">
                                <span class="hero__play">
                                    <svg viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M6 4.2v7.6L12.4 8 6 4.2Z"/>
                                    </svg>
                                </span>
                                {{ $t('home.hero.how') }}
                            </a>
                        </div>
                        <div class="hero__trust">
                            <span class="hero__trust-label">{{ $t('home.hero.trust') }}</span>
                            <div class="hero__trust-list">
                                <span class="hero__trust-item">
                                    <img
                                        :src="logoHapp"
                                        :alt="$t('home.hero.happAlt')"
                                        :title="$t('home.hero.happAlt')"
                                        class="hero__trust-logo"
                                    />
                                    <span class="hero__trust-name">Happ</span>
                                </span>
                                <span class="hero__trust-plus">+</span>
                                <span class="hero__trust-item">
                                    <img
                                        :src="logoIncy"
                                        :alt="$t('home.hero.incyAlt')"
                                        :title="$t('home.hero.incyAlt')"
                                        class="hero__trust-logo"
                                    />
                                    <span class="hero__trust-name">INCY</span>
                                </span>
                            </div>
                        </div>
                    </div>


                    

                    <!-- <div class="hero__panel">
                        <div class="hero__panel-head">
                            <div>
                                <p class="hero__panel-kicker">Соединение</p>
                                <h2 class="hero__panel-title">Статус серверов</h2>
                            </div>
                            <span class="hero__live">
                                <span class="hero__live-dot"></span>
                                Online
                            </span>
                        </div>

                        <div class="hero__legend">
                            <span class="hero__legend-item">
                                <i class="hero__legend-swatch hero__legend-swatch--muted"></i>
                                VLESS
                            </span>
                            <span class="hero__legend-item">
                                <i class="hero__legend-swatch hero__legend-swatch--green"></i>
                                Hysteria
                            </span>
                        </div>

                        <div class="hero__chart">
                            <div v-for="bar in heroChart" :key="bar.label" class="hero__col">
                                <div class="hero__col-bars">
                                    <span class="hero__bar hero__bar--muted" :style="{ height: bar.vless }"></span>
                                    <span class="hero__bar hero__bar--green" :style="{ height: bar.hysteria }"></span>
                                </div>
                                <span class="hero__col-label" :class="{ 'hero__col-label--active': bar.active }">{{ bar.label }}</span>
                            </div>
                        </div>

                        <div class="hero__panel-foot">
                            <div>
                                <p class="hero__metric-label">Средний пинг</p>
                                <p class="hero__metric-value">18 ms</p>
                            </div>
                            <span class="hero__growth">
                                Extra Fast
                                <b>+стабильность</b>
                            </span>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>


        <!-- Features -->
        <section class="features">
            <div class="container">
                <h2 class="section-title">{{ $t('home.features.title') }}</h2>
                <div class="features__grid">
                    <div class="features__card features__card--large">
                        <div class="features__card-content">
                            <h3 class="features__card-title">{{ $t('home.features.logsLine1') }}<br>{{ $t('home.features.logsLine2') }}</h3>
                            <p class="features__card-text">{{ $t('home.features.logsText') }}</p>
                        </div>
                        <img
                            :src="featureSecurity"
                            :alt="$t('home.features.logsAlt')"
                            :title="$t('home.features.logsAlt')"
                            class="features__image features__image--security"
                        />
                    </div>

                    <div class="features__card features__card--row">
                        <div class="features__card-content">
                            <h3 class="features__card-title">{{ $t('home.features.serversLine1') }}<br>{{ $t('home.features.serversLine2') }}</h3>
                            <p class="features__card-text">{{ $t('home.features.serversText') }}</p>
                        </div>
                        <img
                            :src="featureApps"
                            :alt="$t('home.features.serversAlt')"
                            :title="$t('home.features.serversAlt')"
                            class="features__image features__image--apps"
                        />
                    </div>

                    <div class="features__card features__card--row">
                        <div class="features__card-content">
                            <h3 class="features__card-title">{{ $t('home.features.speedLine1') }}<br>{{ $t('home.features.speedLine2') }}</h3>
                            <p class="features__card-text">{{ $t('home.features.speedText') }}</p>
                        </div>
                        <img
                            :src="featureSpeed"
                            :alt="$t('home.features.speedAlt')"
                            :title="$t('home.features.speedAlt')"
                            class="features__image features__image--speed"
                        />
                    </div>
                </div>
            </div>
        </section>

        <PricingSection :title="$t('home.pricingTitle')" />

        <CountriesSection :title="$t('servers.title')" />

        <!-- How to connect -->
        <section id="howto" class="howto-grid">
            <div class="container">
                <h2 class="section-title howto-grid__title">{{ $t('home.howto.title') }}</h2>
                <p class="howto-grid__subtitle">{{ $t('home.howto.subtitle') }}</p>

                <div class="howto-grid__wrap">
                    <article v-for="step in howtoSteps" :key="step.num" class="howto-grid__cell">
                        <div class="howto-grid__head">
                            <span class="howto-grid__num">{{ step.num }}.</span>
                            <svg class="howto-grid__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">
                                <path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7"/>
                            </svg>
                        </div>
                        <div class="howto-grid__body">
                            <h3 class="howto-grid__step-title">{{ step.title }}</h3>
                            <p class="howto-grid__step-text">{{ step.text }}</p>
                        </div>
                        <span class="howto-grid__meta">{{ step.meta }}</span>
                    </article>

                    <button
                        type="button"
                        class="howto-grid__cell howto-grid__cell--cta"
                        @click="openRegistration('howto_start_free')"
                    >
                        <div class="howto-grid__head">
                            <span class="howto-grid__num howto-grid__num--accent">05.</span>
                            <svg class="howto-grid__arrow howto-grid__arrow--accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">
                                <path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7"/>
                            </svg>
                        </div>
                        <div class="howto-grid__body">
                            <h3 class="howto-grid__step-title">{{ $t('home.howto.ctaTitle') }}</h3>
                            <p class="howto-grid__step-text">{{ $t('home.howto.ctaText') }}</p>
                        </div>
                        <span class="howto-grid__meta howto-grid__meta--accent">{{ $t('home.howto.ctaMeta') }}</span>
                    </button>

                    <div class="howto-grid__cell howto-grid__cell--empty"></div>
                </div>
            </div>
        </section>

        <!-- Devices -->
        <section class="devices-alt">
            <div class="container">
                <div class="devices-alt__inner">
                    <div class="devices-alt__visual">
                        <img
                            :src="devicesAltPhone"
                            :alt="$t('home.devices.phoneAlt')"
                            :title="$t('home.devices.phoneAlt')"
                            class="devices-alt__phone"
                        />
                    </div>

                    <div class="devices-alt__content">
                        <span class="devices-alt__eyebrow">
                            <svg class="devices-alt__eyebrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3">
                                <circle cx="8" cy="8" r="6"/>
                                <circle cx="8" cy="8" r="2" fill="currentColor" stroke="none"/>
                            </svg>
                            {{ $t('home.devices.eyebrow') }}
                        </span>
                        <h2 class="devices-alt__title">{{ $t('home.devices.title') }}</h2>

                        <div class="devices-alt__list">
                            <div
                                v-for="(item, index) in deviceBenefits"
                                :key="item.title"
                                class="devices-alt__item"
                                :class="{ 'devices-alt__item--open': openDevice === index }"
                            >
                                <button
                                    class="devices-alt__head"
                                    :aria-expanded="openDevice === index"
                                    @click="toggleDevice(index)"
                                >
                                    <span class="devices-alt__item-title">{{ item.title }}</span>
                                    <span class="devices-alt__chevron">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
                                            <path d="M5.5 3.5 10.5 8l-5 4.5"/>
                                        </svg>
                                    </span>
                                </button>
                                <Vue3SlideUpDown
                                    :model-value="openDevice === index"
                                    :duration="320"
                                    timing-function="cubic-bezier(0.4, 0, 0.2, 1)"
                                    eager
                                >
                                    <div class="devices-alt__body">
                                        <p class="devices-alt__text">{{ item.text }}</p>
                                        <button type="button" class="devices-alt__more" @click="openRegistration('devices_connect')">
                                            {{ $t('home.devices.connect') }}
                                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                                                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/>
                                            </svg>
                                        </button>
                                    </div>
                                </Vue3SlideUpDown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <PlatformsSection
            :title="$t('home.platformsTitle')"
            :subtitle="$t('home.platformsSubtitle')"
        />

        

        <!-- FAQ -->
        <section id="faq" class="faq">
            <div class="container">
                <h2 class="section-title faq__title">{{ $t('home.faq.title') }}</h2>
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

        <!-- SEO -->
        <section id="about-vpn" class="seo-block">
            <div class="container">
                <div class="seo-block__inner">
                    <h2 class="section-title seo-block__title">{{ $t('home.seo.title') }}</h2>
                    <div class="seo-block__content">
                        <p>{{ $t('home.seo.p1Before') }}<strong>{{ $t('home.seo.p1Strong') }}</strong>{{ $t('home.seo.p1After') }}</p>
                        <p>{{ $t('home.seo.p2') }}</p>

                        <h3 class="seo-block__subtitle">{{ $t('home.seo.sub1') }}</h3>
                        <p>{{ $t('home.seo.p3') }}</p>
                        <p>{{ $t('home.seo.p4') }}</p>

                        <h3 class="seo-block__subtitle">{{ $t('home.seo.sub2') }}</h3>
                        <p>{{ $t('home.seo.p5') }}</p>
                        <p>{{ $t('home.seo.p6') }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Blog -->
        <!-- <section id="blog" class="blog">
            <div class="container">
                <h2 class="section-title">Блог</h2>
                <div class="blog__grid">
                    <article v-for="post in blogPosts" :key="post.title" class="blog__card">
                        <img :src="post.image" :alt="post.title" :title="post.title" class="blog__image" />
                        <div class="blog__body">
                            <time class="blog__date">{{ post.date }}</time>
                            <h3 class="blog__title">{{ post.title }}</h3>
                            <p class="blog__excerpt">{{ post.excerpt }}</p>
                            <span class="blog__link">Скоро →</span>
                        </div>
                    </article>
                </div>
            </div>
        </section> -->
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3SlideUpDown } from 'vue3-slide-up-down'
import heroSchematic from '~/assets/images/hero-schematic.png'
import logoHapp from '~/assets/images/logo/happ.webp'
import logoIncy from '~/assets/images/logo/incy.png'
import devicesAltPhone from '~/assets/images/devices-alt-phone.png'
import featureSecurity from '~/assets/images/feature-security.png'
import featureApps from '~/assets/images/feature-apps.png'
import featureSpeed from '~/assets/images/feature-speed.png'
import blogImg1 from '~/assets/images/s3.jpg'
import blogImg2 from '~/assets/images/s4.jpg'
import blogImg3 from '~/assets/images/s5.jpg'


import HeroAnim from '~/components/hero-anim.vue'


import { useModalStore } from '~/stores/modal'

definePageMeta({ layout: 'default' })

const storeModal = useModalStore()
const { trackEvent } = useGtag()
const { t, locale } = useI18n()
const localePath = useLocalePath()

function openRegistration(buttonName = 'cta_register') {
    trackEvent('click_cta', { button_name: buttonName })
    storeModal.typeActiveModal('registration')
    storeModal.openCloseModal(true)
}

const openFaq = ref(null)

function toggleFaq(index) {
    openFaq.value = openFaq.value === index ? null : index
}

const heroChart = [
    { label: 'NL', vless: '62%', hysteria: '88%', active: true },
    { label: 'DE', vless: '48%', hysteria: '70%' },
    { label: 'FI', vless: '55%', hysteria: '76%' },
    { label: 'US', vless: '42%', hysteria: '64%' },
    { label: 'RU', vless: '36%', hysteria: '52%' },
]

const openDevice = ref(0)

function toggleDevice(index) {
    openDevice.value = openDevice.value === index ? null : index
}

const deviceBenefits = computed(() => [1, 2, 3, 4].map((n) => ({
    title: t(`home.devices.b${n}Title`),
    text: t(`home.devices.b${n}Text`),
})))

const howtoSteps = computed(() => [1, 2, 3, 4].map((n) => ({
    num: String(n).padStart(2, '0'),
    title: t(`home.howto.s${n}Title`),
    text: t(`home.howto.s${n}Text`),
    meta: t(`home.howto.s${n}Meta`),
})))

const faqItems = computed(() => Array.from({ length: 10 }, (_, index) => {
    const n = index + 1
    return {
        question: t(`home.faq.q${n}`),
        answer: t(`home.faq.a${n}`),
    }
}))

const blogPosts = [
    {
        date: '15 августа 2025',
        title: 'Как выбрать VPN: 5 главных критериев',
        excerpt: 'Разбираем, на что обращать внимание при выборе VPN-сервиса: скорость, безопасность, количество серверов и политика логов.',
        image: blogImg1,
    },
    {
        date: '3 августа 2025',
        title: 'Зачем нужен VPN в 2025 году',
        excerpt: 'VPN — это не только обход блокировок. Рассказываем о защите данных, безопасности в публичных Wi-Fi и приватности.',
        image: blogImg2,
    },
    {
        date: '20 июля 2025',
        title: 'Настройка VPN на Android за 2 минуты',
        excerpt: 'Пошаговая инструкция по подключению Dark Nova VPN на Android через Telegram-бот без сложных настроек.',
        image: blogImg3,
    },
]




const siteUrl = 'https://darknovavpn.com'
const ogImage = `${siteUrl}/dark-nova-green-eyes.png`

useHead(() => {
    const pageTitle = t('home.meta.title')
    const pageDescription = t('home.meta.description')
    const pagePath = localePath('/')
    const pageUrl = `${siteUrl}${pagePath === '/' ? '/' : pagePath}`
    const lang = locale.value === 'en' ? 'en' : 'ru'
    const ogLocale = lang === 'en' ? 'en_US' : 'ru_RU'
    const inLanguage = lang === 'en' ? 'en-US' : 'ru-RU'

    return {
        title: pageTitle,
        htmlAttrs: { lang },
        meta: [
            { name: 'description', content: pageDescription },
            { name: 'keywords', content: t('home.meta.keywords') },
            { name: 'author', content: 'Dark Nova VPN' },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { name: 'googlebot', content: 'index, follow' },
            { name: 'theme-color', content: '#000000' },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: pageDescription },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: pageUrl },
            { property: 'og:locale', content: ogLocale },
            { property: 'og:site_name', content: 'Dark Nova VPN' },
            { property: 'og:image', content: ogImage },
            { property: 'og:image:alt', content: t('home.meta.imageAlt') },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: pageDescription },
            { name: 'twitter:image', content: ogImage },
        ],
        link: [
            { rel: 'canonical', href: pageUrl },
            { rel: 'alternate', hreflang: 'ru', href: `${siteUrl}/` },
            { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en` },
            { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` },
        ],
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'WebSite',
                            '@id': `${pageUrl}#website`,
                            url: pageUrl,
                            name: 'Dark Nova VPN',
                            description: pageDescription,
                            inLanguage,
                            publisher: { '@id': `${siteUrl}/#organization` },
                        },
                        {
                            '@type': 'Organization',
                            '@id': `${siteUrl}/#organization`,
                            name: 'Dark Nova VPN',
                            url: `${siteUrl}/`,
                            logo: {
                                '@type': 'ImageObject',
                                url: ogImage,
                            },
                            image: ogImage,
                            sameAs: [
                                'https://t.me/darkNovaVpn_support',
                            ],
                            contactPoint: {
                                '@type': 'ContactPoint',
                                contactType: 'customer support',
                                url: 'https://t.me/darkNovaVpn_support',
                                availableLanguage: ['Russian', 'English'],
                            },
                        },
                        {
                            '@type': 'SoftwareApplication',
                            name: pageTitle,
                            alternateName: 'Dark Nova VPN',
                            applicationCategory: 'SecurityApplication',
                            operatingSystem: 'Android, iOS, Windows, macOS, Linux, Android TV',
                            offers: (lang === 'en'
                                ? [
                                    ['2', 'USD'],
                                    ['4.5', 'USD'],
                                    ['16', 'USD'],
                                ]
                                : [
                                    ['130', 'RUB'],
                                    ['350', 'RUB'],
                                    ['1300', 'RUB'],
                                ]).map(([price, priceCurrency], index) => ({
                                    '@type': 'Offer',
                                    name: t(['home.meta.offer1Name', 'home.meta.offer3Name', 'home.meta.offer12Name'][index]),
                                    price,
                                    priceCurrency,
                                    url: `${pageUrl}#pricing`,
                                    description: t(['home.meta.offer1Description', 'home.meta.offer3Description', 'home.meta.offer12Description'][index]),
                                })),
                            description: pageDescription,
                        },
                        {
                            '@type': 'FAQPage',
                            '@id': `${pageUrl}#faq`,
                            url: pageUrl,
                            inLanguage,
                            isPartOf: { '@id': `${pageUrl}#website` },
                            mainEntity: faqItems.value.map((item) => ({
                                '@type': 'Question',
                                name: item.question,
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: item.answer,
                                },
                            })),
                        },
                    ],
                }),
            },
        ],
    }
})
</script>
