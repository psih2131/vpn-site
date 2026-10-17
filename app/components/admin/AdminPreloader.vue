<template>
    <Teleport to="body">
        <Transition name="admin-preloader">
            <div
                v-if="adminBusy"
                class="admin-preloader"
                role="status"
                aria-live="polite"
                aria-busy="true"
            >
                <div class="admin-preloader__card">
                    <div class="admin-preloader__spinner" aria-hidden="true"></div>
                    <p class="admin-preloader__text">Удаляем пользователя…</p>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const adminBusy = useState('admin-busy', () => false)
</script>
