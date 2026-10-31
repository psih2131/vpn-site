<template>
    <component
        :is="to ? 'a' : 'button'"
        class="connect-grid__item"
        :class="{
            'connect-grid__item--pulse': pulse,
            'connect-grid__item--black': black,
        }"
        v-bind="to ? { href: to } : { type: 'button' }"
    >
        <span class="connect-grid__icon" aria-hidden="true">
            <slot name="icon" />
        </span>
        <span class="connect-grid__text">
            <span class="connect-grid__title">{{ title }}</span>
            <span v-if="text" class="connect-grid__sub">{{ text }}</span>
        </span>
        <span v-if="arrow" class="connect-grid__external" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
                <path d="M5 11L11 5M11 5H6.5M11 5v4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    </component>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: '',
    },
    to: {
        type: String,
        default: '',
    },
    arrow: {
        type: Boolean,
        default: false,
    },
    pulse: {
        type: Boolean,
        default: false,
    },
    black: {
        type: Boolean,
        default: false,
    },
})
</script>
