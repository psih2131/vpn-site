<template>
    <div class="account-content subscription-page">
        <header class="subscription-page__head">
            <h1 class="subscription-page__title">Оплата подписки</h1>
        </header>

        <section class="sub-stats">
            <div class="sub-stats__card">
                <span class="sub-stats__label">Подписка</span>
                <strong class="sub-stats__value">{{ status.plan }}</strong>
            </div>
            <div class="sub-stats__card">
                <span class="sub-stats__label">Начало</span>
                <strong class="sub-stats__value">{{ status.startDate }}</strong>
            </div>
            <div class="sub-stats__card">
                <span class="sub-stats__label">Окончание</span>
                <strong class="sub-stats__value">{{ status.endDate }}</strong>
            </div>
            <div class="sub-stats__card">
                <span class="sub-stats__label">Статус</span>
                <strong class="sub-stats__value sub-stats__value--active">Активна</strong>
            </div>
        </section>

        <section class="sub-pay">
            <div class="sub-pay__head">
                <p class="sub-pay__label">Период оплаты</p>
                <p class="sub-pay__desc">
                    Не обязательно ждать окончания текущей подписки — можно оплатить заранее.
                    Новый срок добавится к оставшемуся времени.
                </p>
            </div>

            <div class="sub-pay__list">
                <button
                    v-for="plan in plans"
                    :key="plan.id"
                    type="button"
                    class="sub-pay__item"
                    :class="{ 'is-active': selectedPlan === plan.id }"
                    @click="selectedPlan = plan.id"
                >
                    <span class="sub-pay__meta">
                        <span class="sub-pay__name">{{ plan.name }}</span>
                        <span v-if="plan.benefit" class="sub-pay__benefit">{{ plan.benefit }}</span>
                    </span>

                    <span class="sub-pay__price">{{ plan.price }}</span>
                    <span class="sub-pay__check" aria-hidden="true"></span>
                </button>
            </div>

            <div class="sub-pay__footer">
                <button type="button" class="sub-pay__btn">
                    Оплатить {{ selectedPlanData.price }}
                </button>
            </div>
        </section>

        <section class="sub-recent">
            <h2 class="sub-recent__title">История транзакций</h2>

            <div class="sub-recent__table-wrap">
                <table class="sub-recent__table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Период</th>
                            <th>Дата</th>
                            <th>Способ оплаты</th>
                            <th>Сумма</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in history" :key="row.id">
                            <td class="sub-recent__id">{{ row.txId }}</td>
                            <td>{{ row.period }}</td>
                            <td>{{ row.date }}</td>
                            <td>{{ row.method }}</td>
                            <td>
                                <strong>{{ row.amount }}</strong>
                            </td>
                            <td>
                                <span class="sub-recent__status" :class="`is-${row.status}`">
                                    {{ statusLabel(row.status) }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'account',
})

const status = {
    plan: 'Trial',
    startDate: '18.09.2026',
    endDate: '21.09.2026',
}
const selectedPlan = ref('quarter')

const plans = [
    {
        id: 'month',
        name: '1 месяц',
        benefit: '',
        price: '349 ₽',
    },
    {
        id: 'quarter',
        name: '3 месяца',
        benefit: 'Выгода −15%',
        price: '890 ₽',
    },
    {
        id: 'year',
        name: '12 месяцев',
        benefit: 'Выгода −30%',
        price: '2 990 ₽',
    },
]

const selectedPlanData = computed(() => {
    return plans.find((plan) => plan.id === selectedPlan.value) || plans[0]
})

const history = [
    { id: 1, txId: 'TX-94821', date: '18.09.2026', period: 'Trial 3 дня', method: 'Бонус', amount: '0 ₽', status: 'success' },
    { id: 2, txId: 'TX-94102', date: '01.09.2026', period: '1 месяц', method: 'Карта', amount: '349 ₽', status: 'success' },
    { id: 3, txId: 'TX-93844', date: '12.08.2026', period: '3 месяца', method: 'Карта', amount: '890 ₽', status: 'success' },
    { id: 4, txId: 'TX-93110', date: '03.07.2026', period: '1 месяц', method: 'Карта', amount: '349 ₽', status: 'failed' },
]

function statusLabel(statusKey) {
    if (statusKey === 'success') return 'Успешно'
    if (statusKey === 'failed') return 'Ошибка'
    return statusKey
}
</script>
