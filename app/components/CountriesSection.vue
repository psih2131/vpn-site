<template>
    <section id="regions" class="countries">
        <div class="container">
            <h2 class="section-title">{{ title }}</h2>
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
</template>

<script setup>
import ServerFlag from '~/components/ServerFlag.vue'

defineProps({
    title: {
        type: String,
        required: true,
    },
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
