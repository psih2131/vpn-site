<template>
    <div class="account-content">
        <h1 class="account-content__title">Главная</h1>

        <p v-if="pending" class="account-content__hint">Загрузка…</p>

        <section v-else-if="user" class="account-profile">
            <div class="account-profile__top">
                <span class="account-profile__avatar" aria-hidden="true">{{ userInitial }}</span>
                <div>
                    <h2 class="account-profile__name">{{ displayName }}</h2>
                    <p class="account-profile__email">{{ user.email }}</p>
                </div>
            </div>

            <form class="account-profile__form" @submit.prevent="onUpdate">
                <div class="account-profile__section">
                    <p class="account-profile__section-title">Основная информация</p>
                    <div class="account-profile__list">
                        <div class="account-profile__field account-profile__field--static">
                            <span class="account-profile__label">ID</span>
                            <p class="account-profile__value">{{ displayValue(user.id) }}</p>
                        </div>

                        <div class="account-profile__field account-profile__field--static">
                            <span class="account-profile__label">Email</span>
                            <p class="account-profile__value">{{ displayValue(user.email) }}</p>
                        </div>

                        <div class="account-profile__field account-profile__field--static">
                            <span class="account-profile__label">Дата создания</span>
                            <p class="account-profile__value">{{ formatDate(user.createdAt || user.created_at) }}</p>
                        </div>
                    </div>
                </div>

                <div class="account-profile__section account-profile__section--editable">
                    <p class="account-profile__section-title">Редактируемые данные</p>
                    <div class="account-profile__list">
                        <label class="account-profile__field">
                            <span class="account-profile__label">Имя</span>
                            <input
                                v-model="form.firstName"
                                class="account-profile__input"
                                type="text"
                                name="firstName"
                                placeholder="Имя"
                                autocomplete="given-name"
                            >
                        </label>

                        <label class="account-profile__field">
                            <span class="account-profile__label">Фамилия</span>
                            <input
                                v-model="form.lastName"
                                class="account-profile__input"
                                type="text"
                                name="lastName"
                                placeholder="Фамилия"
                                autocomplete="family-name"
                            >
                        </label>

                        <!--
                        <div class="account-profile__telegram">
                            <div class="account-profile__telegram-head">
                                <span class="account-profile__telegram-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.56 7.37c-.12.52-.43.65-.87.4l-2.4-1.77-1.16 1.12c-.13.13-.24.24-.49.24l.17-2.43 4.43-4.01c.19-.17-.04-.27-.3-.1l-5.48 3.45-2.36-.74c-.51-.16-.52-.51.11-.76l9.22-3.55c.43-.16.8.1.66.78z"/>
                                    </svg>
                                </span>
                                <div>
                                    <p class="account-profile__telegram-title">Свяжите ваш аккаунт с Telegram</p>
                                    <p class="account-profile__telegram-text">
                                        Укажите ссылку на профиль — после связки кабинет и бот будут работать вместе.
                                    </p>
                                </div>
                            </div>

                            <ul class="account-profile__telegram-benefits">
                                <li>Уведомления о подписке приходят в Telegram</li>
                                <li>Оплату можно оформить прямо в боте</li>
                                <li>Удобно управлять доступом без лишних писем</li>
                            </ul>

                            <label class="account-profile__telegram-field">
                                <span class="account-profile__label">Ссылка на аккаунт</span>
                                <input
                                    v-model="form.tgId"
                                    class="account-profile__input"
                                    type="text"
                                    name="tgId"
                                    placeholder="https://t.me/username"
                                    autocomplete="off"
                                >
                            </label>
                        </div>
                        -->
                    </div>

                    <p v-if="formError" class="account-profile__error">{{ formError }}</p>

                    <button class="account-profile__submit" type="submit" :disabled="saving">
                        {{ saving ? 'Сохранение…' : 'Обновить данные' }}
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
    layout: 'account',
    middleware: 'account-auth',
})

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()

const user = ref(null)
const pending = ref(true)
const saving = ref(false)
const formError = ref('')

const form = reactive({
    firstName: '',
    lastName: '',
    tgId: '',
})

const userInitial = computed(() => {
    const email = String(user.value?.email || '').trim()
    return email ? email[0].toUpperCase() : '?'
})

const displayName = computed(() => {
    const first = String(form.firstName || '').trim()
    const last = String(form.lastName || '').trim()
    const full = [first, last].filter(Boolean).join(' ')
    return full || 'Пользователь'
})

function displayValue(value) {
    if (value === null || value === undefined || value === '') return '—'
    return String(value)
}

function formatDate(value) {
    if (!value) return '—'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'

    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function fillForm(data) {
    form.firstName = data?.firstName || ''
    form.lastName = data?.lastName || ''
    form.tgId = data?.tgId != null ? String(data.tgId) : ''
}

async function onUpdate() {
    if (saving.value) return

    formError.value = ''
    saving.value = true

    try {
        const data = await $fetch(adminUrl('/api/v1/account/profile'), {
            method: 'PUT',
            credentials: 'include',
            body: {
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                tgId: form.tgId.trim(),
            },
        })

        if (!data?.success || !data?.data?.user) {
            formError.value = data?.message || 'Не удалось обновить данные'
            return
        }

        user.value = data.data.user
        fillForm(data.data.user)

        storeNotification.setNotification({
            type: 'success',
            text: 'Данные профиля обновлены',
        })
    } catch (error) {
        formError.value = error?.data?.message || error?.message || 'Не удалось обновить данные'
    } finally {
        saving.value = false
    }
}

async function loadUserInfo() {
    pending.value = true

    const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined

    try {
        const data = await $fetch(adminUrl('/api/v1/account/user-info'), {
            credentials: 'include',
            headers,
        })

        if (data?.success && data?.data?.user) {
            user.value = data.data.user
            fillForm(data.data.user)
        }
    } catch {
        user.value = null
    } finally {
        pending.value = false
    }
}

await loadUserInfo()
</script>
