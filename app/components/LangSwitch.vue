<template>
    <nav class="lang-switch" :aria-label="$t('header.language')">
        <NuxtLink
            v-for="item in locales"
            :key="item.code"
            :to="$switchLocalePath(item.code)"
            class="lang-switch__link"
            :class="{ 'lang-switch__link--active': item.code === locale }"
            :aria-current="item.code === locale ? 'true' : undefined"
        >
            {{ item.code.toUpperCase() }}
        </NuxtLink>
    </nav>
</template>

<script setup>
const { locale, locales } = useI18n()
</script>
