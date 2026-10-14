<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <div class="admin-users__title-row">
                    <h1 class="admin-content__title">
                        <template v-if="pending">Загрузка…</template>
                        <a
                            v-else-if="telegramUrl"
                            :href="telegramUrl"
                            class="admin-user-card__tg-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ displayName }}
                        </a>
                        <template v-else>{{ displayName }}</template>
                    </h1>
                </div>
                <p class="admin-content__hint">
                    Карточка пользователя
                    <template v-if="user">#{{ user.id }}</template>
                </p>
            </div>
            <NuxtLink to="/admin/users" class="admin-blog__back">
                ← К списку
            </NuxtLink>
        </div>

        <p v-if="pending" class="admin-content__hint">Загрузка…</p>
        <p v-else-if="error" class="admin-content__hint">Не удалось загрузить пользователя</p>
        <p v-else-if="!user" class="admin-content__hint">Пользователь не найден</p>

        <template v-else>
            <section class="admin-user-card">
                <h2 class="admin-user-card__title">Базовая информация</h2>
                <div class="admin-user-card__grid">
                    <div v-if="subscription" class="admin-user-card__item">
                        <span class="admin-user-card__label">Подписка</span>
                        <span
                            class="admin-users-list__badge"
                            :class="subscription.active ? 'admin-users-list__badge--paid' : 'admin-users-list__badge--overdue'"
                        >
                            {{ subscription.label }}
                        </span>
                    </div>
                    <div v-if="latestPlan" class="admin-user-card__item">
                        <span class="admin-user-card__label">Тариф</span>
                        <span class="admin-user-card__value">{{ latestPlan }}</span>
                    </div>
                    <div
                        v-for="field in userFields"
                        :key="field.label"
                        class="admin-user-card__item"
                    >
                        <span class="admin-user-card__label">{{ field.label }}</span>
                        <a
                            v-if="field.href"
                            :href="field.href"
                            class="admin-user-card__value admin-user-card__tg-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ field.value }}
                        </a>
                        <span
                            v-else
                            class="admin-user-card__value"
                            :title="String(field.value)"
                        >
                            {{ field.value }}
                        </span>
                    </div>
                </div>
            </section>

            <section class="admin-user-payments">
                <div class="admin-users__title-row">
                    <h2 class="admin-user-card__title">Оплаты</h2>
                    <span class="admin-users__count">{{ payments.length }}</span>
                </div>

                <p v-if="!payments.length" class="admin-content__hint">Оплат пока нет</p>

                <div v-else class="admin-user-payments__list">
                    <article
                        v-for="payment in payments"
                        :key="payment.id"
                        class="admin-payment-card"
                        :class="paymentCardClass(payment.status)"
                    >
                        <div class="admin-payment-card__top">
                            <div class="admin-payment-card__main">
                                <span class="admin-payment-card__id">#{{ payment.id }}</span>
                                <span class="admin-payment-card__plan">
                                    {{ display(payment.subscription_period) }}
                                </span>
                                <span
                                    class="admin-payment-card__status"
                                    :class="paymentBadgeClass(payment.status)"
                                >
                                    {{ paymentStatusLabel(payment.status) }}
                                </span>
                            </div>
                            <div class="admin-payment-card__amount">
                                <strong>{{ display(payment.amount) }}</strong>
                                <span>{{ display(payment.currency) }}</span>
                            </div>
                        </div>

                        <div class="admin-payment-card__meta">
                            <div class="admin-payment-card__meta-item">
                                <span class="admin-payment-card__meta-label">Способ</span>
                                <span>{{ display(payment.payment_method) }}</span>
                            </div>
                            <div class="admin-payment-card__meta-item">
                                <span class="admin-payment-card__meta-label">Старт</span>
                                <span>{{ formatDate(payment.subscription_start_at) }}</span>
                            </div>
                            <div class="admin-payment-card__meta-item">
                                <span class="admin-payment-card__meta-label">Конец</span>
                                <span>{{ formatDate(payment.subscription_end_at) }}</span>
                            </div>
                            <div class="admin-payment-card__meta-item">
                                <span class="admin-payment-card__meta-label">Создан</span>
                                <span>{{ formatDate(payment.created_at) }}</span>
                            </div>
                            <div class="admin-payment-card__meta-item">
                                <span class="admin-payment-card__meta-label">Обновлён</span>
                                <span>{{ formatDate(payment.updated_at) }}</span>
                            </div>
                            <div class="admin-payment-card__meta-item">
                                <span class="admin-payment-card__meta-label">Refund</span>
                                <span>{{ formatDate(payment.refunded_at) }}</span>
                            </div>
                        </div>

                        <div class="admin-payment-card__details">
                            <div class="admin-payment-card__detail">
                                <span class="admin-payment-card__meta-label">User ID</span>
                                <code>{{ display(payment.user_id) }}</code>
                            </div>
                            <div class="admin-payment-card__detail">
                                <span class="admin-payment-card__meta-label">Invoice</span>
                                <code>{{ display(payment.invoice_payload) }}</code>
                            </div>
                            <div class="admin-payment-card__detail">
                                <span class="admin-payment-card__meta-label">TG charge</span>
                                <code>{{ display(payment.telegram_payment_charge_id) }}</code>
                            </div>
                            <div class="admin-payment-card__detail">
                                <span class="admin-payment-card__meta-label">Provider charge</span>
                                <code>{{ display(payment.provider_payment_charge_id) }}</code>
                            </div>
                            <div class="admin-payment-card__detail">
                                <span class="admin-payment-card__meta-label">Ошибка</span>
                                <code>{{ display(payment.error_message) }}</code>
                            </div>
                            <div class="admin-payment-card__flags">
                                <span class="admin-payment-card__flag">
                                    not_end_send: {{ display(payment.not_end_send) }}
                                </span>
                                <span class="admin-payment-card__flag">
                                    not_end_left_send: {{ display(payment.not_end_left_send) }}
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </template>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
})

const route = useRoute()
const { adminUrl } = useAdminApi()
const userId = String(route.params.id)

const { data, pending, error } = await useAsyncData(
    `admin-user-${userId}`,
    () => $fetch(adminUrl(`/api/v1/admin/users/${userId}`), {
        credentials: 'include',
    }),
)

const user = computed(() => data.value?.data || null)
const payments = computed(() => {
    const list = user.value?.payments
    return Array.isArray(list) ? list : []
})

function display(value) {
    if (value === undefined || value === null || value === '') return '—'
    if (typeof value === 'boolean') return value ? 'да' : 'нет'
    return String(value)
}

function formatDate(value) {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return String(value)
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function paymentBadgeClass(status) {
    const value = String(status || '').toLowerCase()
    if (value === 'paid') return 'admin-payment-card__status--paid'
    if (value === 'refunded' || value === 'failed' || value === 'error') {
        return 'admin-payment-card__status--fail'
    }
    return 'admin-payment-card__status--pending'
}

function paymentCardClass(status) {
    const value = String(status || '').toLowerCase()
    if (value === 'paid') return 'admin-payment-card--paid'
    if (value === 'refunded' || value === 'failed' || value === 'error') {
        return 'admin-payment-card--fail'
    }
    return 'admin-payment-card--pending'
}

function paymentStatusLabel(status) {
    const value = String(status || '').toLowerCase()
    if (value === 'paid') return 'Оплачено'
    if (value === 'refunded') return 'Возврат'
    if (value === 'failed' || value === 'error') return 'Ошибка'
    if (value === 'pending') return 'Не оплачено'
    return display(status)
}

function getLatestPayment(list = []) {
    if (!Array.isArray(list) || !list.length) return null

    return list.reduce((latest, payment) => {
        if (!latest) return payment
        const latestEnd = new Date(latest.subscription_end_at).getTime()
        const currentEnd = new Date(payment.subscription_end_at).getTime()
        if (Number.isNaN(currentEnd)) return latest
        if (Number.isNaN(latestEnd) || currentEnd > latestEnd) return payment
        return latest
    }, null)
}

function getSubscriptionInfo(list = []) {
    if (!Array.isArray(list) || !list.length) return null

    const ends = list
        .map((payment) => new Date(payment.subscription_end_at).getTime())
        .filter((value) => !Number.isNaN(value))

    if (!ends.length) {
        return {
            active: false,
            label: 'Нет даты',
        }
    }

    const maxEnd = Math.max(...ends)
    const diffDays = Math.ceil((maxEnd - Date.now()) / 86400000)

    if (diffDays > 0) {
        return {
            active: true,
            label: `Оплачено · ${diffDays} дн.`,
        }
    }

    return {
        active: false,
        label: `Просрочено · ${Math.abs(diffDays)} дн.`,
    }
}

const subscription = computed(() => getSubscriptionInfo(payments.value))
const latestPlan = computed(() => {
    const payment = getLatestPayment(payments.value)
    return payment?.subscription_period || ''
})

const telegramUrl = computed(() => {
    const username = user.value?.username
    if (!username) return ''
    return `https://t.me/${String(username).replace(/^@/, '')}`
})

const displayName = computed(() => {
    if (!user.value) return 'Пользователь'
    const fullName = [user.value.first_name, user.value.last_name].filter(Boolean).join(' ')
    if (fullName) return fullName
    if (user.value.username) return `@${user.value.username}`
    return `ID ${user.value.id}`
})

const userFields = computed(() => {
    if (!user.value) return []
    return [
        { label: 'ID', value: display(user.value.id) },
        { label: 'Имя', value: display(user.value.first_name) },
        { label: 'Фамилия', value: display(user.value.last_name) },
        {
            label: 'Username',
            value: user.value.username ? `@${user.value.username}` : '—',
            href: telegramUrl.value || null,
        },
        { label: 'Язык', value: display(user.value.language_code) },
        { label: 'Статус', value: display(user.value.status) },
        { label: 'VPN ID', value: display(user.value.vpn_id) },
        { label: 'VPN Sub ID', value: display(user.value.vpn_subid) },
        { label: 'Email', value: display(user.value.email) },
    ]
})
</script>
