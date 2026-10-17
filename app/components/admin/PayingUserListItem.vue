<template>
    <div class="admin-users-list__row admin-users-list__row--paying" @click="goToUser">
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
        <span class="admin-users-list__col admin-users-list__col--total">
            {{ totalPaid }}
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
        <span class="admin-users-list__col admin-users-list__col--actions" @click.stop>
            <button
                type="button"
                class="admin-blog-list__btn admin-blog-list__btn--danger"
                aria-label="Удалить пользователя"
                title="Удалить пользователя"
                :disabled="adminBusy"
                @click="onDelete"
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 7h14M10 7V5h4v2M8 7l.8 12h6.4L16 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['deleted'])

const { adminBusy, deleteUser } = useAdminDeleteUser()

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

const totalPaid = computed(() => {
    const total = paidPayments.value.reduce((sum, payment) => {
        const amount = Number(payment.amount)
        return sum + (Number.isFinite(amount) ? amount : 0)
    }, 0)

    if (!paidPayments.value.length) return '—'

    const formatted = Number.isInteger(total)
        ? String(total)
        : total.toFixed(2)

    return `${formatted} ₽`
})

function goToUser() {
    if (adminBusy.value) return
    navigateTo(`/admin/users/${props.user.id}`)
}

async function onDelete() {
    const ok = await deleteUser(props.user.id)
    if (ok) emit('deleted', props.user.id)
}
</script>
