<template>
    <div class="admin-users__tabs">
        <NuxtLink
            to="/admin/users"
            class="admin-users__tab"
            :class="{ 'is-active': active === 'all' }"
        >
            Все пользователи
        </NuxtLink>
        <NuxtLink
            to="/admin/users/paying"
            class="admin-users__tab"
            :class="{ 'is-active': active === 'paying' }"
        >
            Платящие
        </NuxtLink>
    </div>
</template>

<script setup>
defineProps({
    active: {
        type: String,
        required: true,
        validator: (value) => ['all', 'paying'].includes(value),
    },
})
</script>
