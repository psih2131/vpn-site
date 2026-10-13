<template>
    <div class="regions-page">
        <section class="regions-hero">
            <div class="container">
                <h1 class="regions-hero__title">
                    VPN-серверы Dark Nova:
                    <span class="regions-hero__accent">карта регионов</span>
                </h1>
                <p class="regions-hero__subtitle">
                    Нидерланды, Германия, Финляндия, Швеция, Чехия, Испания и Россия — выберите локацию и подключайтесь за минуту.
                </p>

                <div class="regions-hero__stats">
                    <div class="regions-hero__stat">7 СТРАН</div>
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
    </div>
</template>

<script setup>
const pageTitle = 'VPN-серверы по странам — карта регионов | Dark Nova'
const pageDescription = 'Карта VPN-серверов Dark Nova: Нидерланды, Германия, Финляндия, Швеция, Чехия, Испания и Россия. Список локаций и протоколов VLESS / Hysteria.'

useHead({
    title: pageTitle,
    meta: [
        { name: 'description', content: pageDescription },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://dark-nova-vpn.space/regions' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
    ],
    link: [
        { rel: 'canonical', href: 'https://dark-nova-vpn.space/regions' },
    ],
})

const countries = [
    { flag: 'nl', name: 'Нидерланды Vless', city: 'VLESS | TCP | Reality', badge: 'Extra Fast', badgeType: 'fast' },
    { flag: 'nl', name: 'Нидерланды Hysteria', city: 'Hysteria | hysteria | TLS', badge: 'Extra Fast', badgeType: 'fast' },
    { flag: 'de', name: 'Германия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'de', name: 'Германия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'fi', name: 'Финляндия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'fi', name: 'Финляндия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'se', name: 'Швеция Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'se', name: 'Швеция Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'ru', name: 'Россия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'ru', name: 'Россия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'cz', name: 'Чехия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'globe', name: 'Ютуб без рекламы', city: 'VLESS | xhttp | TLS', badge: 'No Ads', badgeType: 'noads' },
]
</script>
