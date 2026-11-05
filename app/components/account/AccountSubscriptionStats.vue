<template>
    <section class="sub-stats">
        <div class="sub-stats__card">
            <span class="sub-stats__label">{{ $t('cabinet.stats.subscription') }}</span>
            <strong class="sub-stats__value">{{ planLabel }}</strong>
        </div>
        <div class="sub-stats__card">
            <span class="sub-stats__label">{{ $t('cabinet.stats.start') }}</span>
            <strong class="sub-stats__value">{{ startDate }}</strong>
        </div>
        <div class="sub-stats__card">
            <span class="sub-stats__label">{{ $t('cabinet.stats.end') }}</span>
            <strong class="sub-stats__value">{{ endDate }}</strong>
        </div>
        <div
            class="sub-stats__card"
            :class="{ 'sub-stats__card--expired': !pending && subscription && !isActive }"
        >
            <span class="sub-stats__label">{{ $t('cabinet.stats.status') }}</span>
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
const { t, locale } = useI18n()

const subscription = ref(null)
const pending = ref(true)

const planLabel = computed(() => {
    if (pending.value) return t('cabinet.loading')
    if (!subscription.value) return '—'
    if (!subscription.value.plan_id) return 'Trial'
    return t('cabinet.stats.plan')
})

const startDate = computed(() => formatDate(subscription.value?.starts_at))
const endDate = computed(() => formatDate(subscription.value?.ends_at))

const isActive = computed(() => {
    const endsAt = subscription.value?.ends_at
    if (!endsAt) return false
    return new Date(endsAt).getTime() > Date.now()
})

const statusLabel = computed(() => {
    if (pending.value) return t('cabinet.loading')
    if (!subscription.value) return t('cabinet.stats.none')
    return isActive.value ? t('cabinet.stats.active') : t('cabinet.stats.expired')
})

function formatDate(value) {
    if (pending.value) return t('cabinet.loading')
    if (!value) return '—'

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return '—'

    return date.toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'ru-RU')
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
