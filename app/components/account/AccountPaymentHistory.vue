<template>
    <section class="sub-recent">
        <h2 class="sub-recent__title">История транзакций</h2>

        <div class="sub-recent__table-wrap">
            <table class="sub-recent__table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Сумма</th>
                        <th>Валюта</th>
                        <th>Статус</th>
                        <th>Создан</th>
                        <th>Оплачен</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="pending">
                        <td colspan="6">Загрузка…</td>
                    </tr>
                    <tr v-else-if="payments.length === 0">
                        <td colspan="6">Оплат пока нет</td>
                    </tr>
                    <template v-else>
                        <tr v-for="row in payments" :key="row.id">
                            <td class="sub-recent__id">{{ row.provider_payment_id || '—' }}</td>
                            <td>
                                <strong>{{ row.amount }}</strong>
                            </td>
                            <td>{{ row.currency }}</td>
                            <td>
                                <span class="sub-recent__status" :class="statusClass(row.status)">
                                    {{ row.status }}
                                </span>
                            </td>
                            <td>{{ formatDate(row.created_at) }}</td>
                            <td>{{ formatDate(row.paid_at) }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
const { adminUrl } = useAdminApi()

const payments = ref([])
const pending = ref(true)

function statusClass(status) {
    if (status === 'CONFIRMED') return 'is-success'
    if (status === 'CANCELED') return 'is-failed'
    if (status === 'PENDING') return 'is-pending'
    return ''
}

function formatDate(value) {
    if (!value) return '—'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'

    return date.toLocaleDateString('ru-RU')
}

async function loadPayments() {
    pending.value = true

    const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined

    try {
        const data = await $fetch(adminUrl('/api/v1/account/payments'), {
            credentials: 'include',
            headers,
        })

        payments.value = data?.success && Array.isArray(data.data) ? data.data : []
    } catch {
        payments.value = []
    } finally {
        pending.value = false
    }
}

await loadPayments()
</script>
