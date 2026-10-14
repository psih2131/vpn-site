<template>
    <NuxtLink :to="`/admin/users/${user.id}`" class="admin-users-list__row admin-users-list__row--paying">
        <span class="admin-users-list__col admin-users-list__col--name">
            <span class="admin-users-list__name">{{ user.id }}</span>
            <span class="admin-users-list__username">
                {{ user.username ? `@${user.username}` : '—' }}
            </span>
        </span>
        <span class="admin-users-list__col admin-users-list__col--plan">
            {{ plan }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--pay-status">
            <span
                class="admin-users-list__badge"
                :class="paymentStatusClass"
            >
                {{ paymentStatus }}
            </span>
        </span>
        <span class="admin-users-list__col admin-users-list__col--status">
            <span
                class="admin-users-list__badge"
                :class="subscription.active ? 'admin-users-list__badge--paid' : 'admin-users-list__badge--overdue'"
            >
                {{ subscription.label }}
            </span>
        </span>
        <span class="admin-users-list__col admin-users-list__col--lang">
            {{ display(user.language_code) }}
        </span>
        <span class="admin-users-list__col admin-users-list__col--sub" :title="display(user.vpn_subid)">
            {{ display(user.vpn_subid) }}
        </span>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
})

function display(value) {
    if (value === undefined || value === null || value === '') return '—'
    return value
}

function getLatestPayment(payments = []) {
    if (!Array.isArray(payments) || !payments.length) return null

    return payments.reduce((latest, payment) => {
        if (!latest) return payment
        const latestEnd = new Date(latest.subscription_end_at).getTime()
        const currentEnd = new Date(payment.subscription_end_at).getTime()
        if (Number.isNaN(currentEnd)) return latest
        if (Number.isNaN(latestEnd) || currentEnd > latestEnd) return payment
        return latest
    }, null)
}

function getSubscriptionInfo(payments = []) {
    const ends = payments
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

const paidPayments = computed(() => {
    const list = props.user.payments
    if (!Array.isArray(list)) return []
    return list.filter((payment) => payment.status === 'paid')
})

const latestPayment = computed(() => getLatestPayment(paidPayments.value))
const plan = computed(() => display(latestPayment.value?.subscription_period))
const paymentStatus = computed(() => display(latestPayment.value?.status))
const paymentStatusClass = computed(() => {
    const value = String(latestPayment.value?.status || '').toLowerCase()
    if (value === 'paid') return 'admin-users-list__badge--paid'
    if (value === 'refunded' || value === 'failed' || value === 'error') {
        return 'admin-users-list__badge--overdue'
    }
    return 'admin-users-list__badge--trial'
})
const subscription = computed(() => getSubscriptionInfo(paidPayments.value))
</script>
