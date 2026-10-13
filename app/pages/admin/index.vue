<template>
    <div class="admin-content">
        <h1 class="admin-content__title">Главная</h1>
        <p class="admin-content__hint">Раздел управления сайтом. Функционал появится позже.</p>

        <div class="admin-home__footer">
            <button
                type="button"
                class="admin-home__logout"
                :disabled="loggingOut"
                @click="onLogout"
            >
                {{ loggingOut ? 'Выход…' : 'Выйти' }}
            </button>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
})

const router = useRouter()
const { adminUrl } = useAdminApi()
const loggingOut = ref(false)

async function onLogout() {
    loggingOut.value = true

    try {
        const response = await $fetch(adminUrl('/api/v1/admin/logout'), {
            method: 'POST',
            credentials: 'include',
        })

        if (response?.success) {
            await router.push('/admin/login')
        }
    } catch {
        await router.push('/admin/login')
    } finally {
        loggingOut.value = false
    }
}
</script>
