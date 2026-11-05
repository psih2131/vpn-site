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

const countries = useVpnServers()
</script>
