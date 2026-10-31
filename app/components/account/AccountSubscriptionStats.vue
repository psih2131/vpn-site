<template>
    <section class="sub-stats">
        <div class="sub-stats__card">
            <span class="sub-stats__label">Подписка</span>
            <strong class="sub-stats__value">{{ planLabel }}</strong>
        </div>
        <div class="sub-stats__card">
            <span class="sub-stats__label">Начало</span>
            <strong class="sub-stats__value">{{ startDate }}</strong>
        </div>
        <div class="sub-stats__card">
            <span class="sub-stats__label">Окончание</span>
            <strong class="sub-stats__value">{{ endDate }}</strong>
        </div>
        <div
            class="sub-stats__card"
            :class="{ 'sub-stats__card--expired': !pending && subscription && !isActive }"
        >
            <span class="sub-stats__label">Статус</span>
            <strong
                class="sub-stats__value"
                :class="{
                    'sub-stats__value--active': isActive,
                    'sub-stats__value--expired': !pending && subscription && !isActive,
                }"
            >{{ statusLabel }}</strong>
        </div>
    </section>
</template>

<script setup>
const { adminUrl } = useAdminApi()

const subscription = ref(null)
const pending = ref(true)

const planLabel = computed(() => {
    if (pending.value) return 'Загрузка…'
    if (!subscription.value) return '—'
    if (!subscription.value.plan_id) return 'Trial'
    return 'Тариф'
})

const startDate = computed(() => formatDate(subscription.value?.starts_at))
const endDate = computed(() => formatDate(subscription.value?.ends_at))

const isActive = computed(() => {
    const endsAt = subscription.value?.ends_at
    if (!endsAt) return false
    return new Date(endsAt).getTime() > Date.now()
})

const statusLabel = computed(() => {
    if (pending.value) return 'Загрузка…'
    if (!subscription.value) return 'Нет подписки'
    return isActive.value ? 'Активна' : 'Истекла'
})

function formatDate(value) {
    if (pending.value) return 'Загрузка…'
    if (!value) return '—'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'

    return date.toLocaleDateString('ru-RU')
}

async function loadSubscription() {
    pending.value = true

    const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined

    try {
        const data = await $fetch(adminUrl('/api/v1/account/subscription'), {
            credentials: 'include',
            headers,
        })

        subscription.value = data?.success ? data.data : null
    } catch {
        subscription.value = null
    } finally {
        pending.value = false
    }
}

await loadSubscription()
</script>
