<template>
    <div class="admin-login">
        <div class="admin-login__card">
            <div class="admin-login__brand">
                <span class="admin-login__logo">Dark Nova</span>
                <span class="admin-login__badge">Admin</span>
            </div>

            <h1 class="admin-login__title">Вход</h1>
            <p class="admin-login__hint">Авторизация в панель управления</p>

            <p v-if="checkingSession" class="admin-login__hint">Проверяем сессию…</p>

            <form
                v-else
                class="admin-login__form"
                @submit.prevent="onSubmit"
            >
                <label class="admin-form__field">
                    <span class="admin-form__label">Логин</span>
                    <input
                        v-model="login"
                        class="admin-form__input"
                        type="text"
                        name="login"
                        autocomplete="username"
                        placeholder="admin"
                        :disabled="loading"
                    >
                </label>

                <label class="admin-form__field">
                    <span class="admin-form__label">Пароль</span>
                    <input
                        v-model="password"
                        class="admin-form__input"
                        type="password"
                        name="password"
                        autocomplete="current-password"
                        placeholder="••••••••"
                        :disabled="loading"
                    >
                </label>

                <p v-if="formError" class="admin-login__error">{{ formError }}</p>

                <button
                    type="submit"
                    class="admin-login__submit"
                    :disabled="loading"
                >
                    {{ loading ? 'Вход…' : 'Войти' }}
                </button>
            </form>

            <NuxtLink to="/" class="admin-login__back">
                ← На сайт
            </NuxtLink>
        </div>

        <Notifications />
    </div>
</template>

<script setup>
definePageMeta({
    layout: false,
})

import '~/assets/style/admin.scss'
import Notifications from '~/components/notifications/Index.vue'
import { useNotificationStore } from '~/stores/notification'

const router = useRouter()
const storeNotification = useNotificationStore()
const { adminUrl } = useAdminApi()

const login = ref('')
const password = ref('')
const formError = ref('')
const loading = ref(false)
const checkingSession = ref(true)

async function checkSession() {
    try {
        const response = await $fetch(adminUrl('/api/v1/admin/me'), {
            credentials: 'include',
        })

        if (response?.success) {
            await router.replace('/admin')
            return
        }
    } catch {
        // нет сессии — остаёмся на логине
    } finally {
        checkingSession.value = false
    }
}

async function onSubmit() {
    formError.value = ''

    const loginValue = login.value.trim()
    const passwordValue = password.value

    if (!loginValue || !passwordValue) {
        formError.value = 'Введите логин и пароль'
        return
    }

    loading.value = true

    try {
        const response = await $fetch(adminUrl('/api/v1/admin/login'), {
            method: 'POST',
            credentials: 'include',
            body: {
                login: loginValue,
                password: passwordValue,
            },
        })

        if (!response?.success) {
            formError.value = response?.message || 'Не удалось войти'
            return
        }

        storeNotification.setNotification({
            type: 'success',
            text: 'Вы успешно авторизованы',
        })

        await router.push('/admin')
    } catch (error) {
        formError.value = error?.data?.message || error?.message || 'Неверный логин или пароль'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    checkSession()
})
</script>
