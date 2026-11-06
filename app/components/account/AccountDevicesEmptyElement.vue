<template>
    <div class="devices-slot">
        <span class="devices-slot__plus" aria-hidden="true">+</span>
        <span>{{ label }}</span>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: '',
    },
})
</script>
