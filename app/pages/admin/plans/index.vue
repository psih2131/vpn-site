<template>
    <div class="admin-content">
        <div class="admin-blog__header">
            <div>
                <h1 class="admin-content__title">Тарифы</h1>
                <p class="admin-content__hint">Управление тарифами для оплаты на сайте</p>
            </div>
        </div>

        <p v-if="pending" class="admin-content__hint">Загрузка…</p>
        <p v-else-if="loadError" class="admin-content__hint">{{ loadError }}</p>

        <template v-else>
            <p v-if="!plans.length && !isCreating" class="admin-content__hint">Тарифов пока нет</p>

            <div v-if="plans.length" class="admin-plans-list">
                <div class="admin-plans-list__head">
                    <span>Название</span>
                    <span>Code</span>
                    <span>Цена</span>
                    <span>Дней</span>
                    <span>Статус</span>
                    <span>Действия</span>
                </div>

                <div
                    v-for="plan in plans"
                    :key="plan.id"
                    class="admin-plans-list__item"
                >
                    <div class="admin-plans-list__row">
                        <span class="admin-plans-list__title">{{ plan.title }}</span>
                        <span class="admin-plans-list__muted">{{ plan.code }}</span>
                        <span>{{ formatPrice(plan.price, plan.currency) }}</span>
                        <span class="admin-plans-list__muted">{{ plan.durationDays }}</span>
                        <span>
                            <span
                                class="admin-plans-list__badge"
                                :class="plan.isActive ? 'is-active' : 'is-off'"
                            >
                                {{ plan.isActive ? 'Активен' : 'Выключен' }}
                            </span>
                        </span>
                        <span class="admin-plans-list__actions">
                            <button
                                type="button"
                                class="admin-blog-list__btn"
                                title="Редактировать"
                                aria-label="Редактировать"
                                @click="toggleEdit(plan)"
                            >
                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M4 20h4l10.5-10.5a2.1 2.1 0 00-3-3L5 17v3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                                    <path d="M13.5 6.5l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                                </svg>
                            </button>
                            <button
                                type="button"
                                class="admin-blog-list__btn admin-blog-list__btn--danger"
                                title="Удалить"
                                aria-label="Удалить"
                                :disabled="deletingId === plan.id"
                                @click="onDelete(plan)"
                            >
                                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 7h14M10 7V5h4v2M8 7l.8 12h6.4L16 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </span>
                    </div>

                    <form
                        v-if="editingId === plan.id"
                        class="admin-plans-form"
                        @submit.prevent="onSaveEdit"
                    >
                        <div class="admin-plans-form__grid">
                            <label class="admin-form__field">
                                <span class="admin-form__label">Code</span>
                                <input v-model="editForm.code" class="admin-form__input" type="text" required>
                            </label>
                            <label class="admin-form__field">
                                <span class="admin-form__label">Название</span>
                                <input v-model="editForm.title" class="admin-form__input" type="text" required>
                            </label>
                            <label class="admin-form__field">
                                <span class="admin-form__label">Цена</span>
                                <input v-model.number="editForm.price" class="admin-form__input" type="number" min="0" step="1" required>
                            </label>
                            <label class="admin-form__field">
                                <span class="admin-form__label">Валюта</span>
                                <input v-model="editForm.currency" class="admin-form__input" type="text" required>
                            </label>
                            <label class="admin-form__field">
                                <span class="admin-form__label">Дней</span>
                                <input v-model.number="editForm.durationDays" class="admin-form__input" type="number" min="1" step="1" required>
                            </label>
                            <label class="admin-form__field admin-plans-form__checkbox">
                                <span class="admin-form__label">Активен</span>
                                <input v-model="editForm.isActive" type="checkbox">
                            </label>
                        </div>

                        <p v-if="formError" class="admin-plans-form__error">{{ formError }}</p>

                        <div class="admin-plans-form__actions">
                            <button type="button" class="admin-plans-form__cancel" @click="closeEdit">Отмена</button>
                            <button type="submit" class="admin-blog__add" :disabled="saving">
                                {{ saving ? 'Сохранение…' : 'Сохранить' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="admin-plans-create">
                <button
                    v-if="!isCreating"
                    type="button"
                    class="admin-blog__add"
                    @click="openCreate"
                >
                    + Добавить новый тариф
                </button>

                <form
                    v-else
                    class="admin-plans-form admin-plans-form--create"
                    @submit.prevent="onSaveCreate"
                >
                    <p class="admin-plans-form__title">Новый тариф</p>

                    <div class="admin-plans-form__grid">
                        <label class="admin-form__field">
                            <span class="admin-form__label">Code</span>
                            <input v-model="createForm.code" class="admin-form__input" type="text" placeholder="monthly" required>
                        </label>
                        <label class="admin-form__field">
                            <span class="admin-form__label">Название</span>
                            <input v-model="createForm.title" class="admin-form__input" type="text" placeholder="1 месяц" required>
                        </label>
                        <label class="admin-form__field">
                            <span class="admin-form__label">Цена</span>
                            <input v-model.number="createForm.price" class="admin-form__input" type="number" min="0" step="1" required>
                        </label>
                        <label class="admin-form__field">
                            <span class="admin-form__label">Валюта</span>
                            <input v-model="createForm.currency" class="admin-form__input" type="text" required>
                        </label>
                        <label class="admin-form__field">
                            <span class="admin-form__label">Дней</span>
                            <input v-model.number="createForm.durationDays" class="admin-form__input" type="number" min="1" step="1" required>
                        </label>
                        <label class="admin-form__field admin-plans-form__checkbox">
                            <span class="admin-form__label">Активен</span>
                            <input v-model="createForm.isActive" type="checkbox">
                        </label>
                    </div>

                    <p v-if="formError" class="admin-plans-form__error">{{ formError }}</p>

                    <div class="admin-plans-form__actions">
                        <button type="button" class="admin-plans-form__cancel" @click="closeCreate">Отмена</button>
                        <button type="submit" class="admin-blog__add" :disabled="saving">
                            {{ saving ? 'Сохранение…' : 'Сохранить новый тариф' }}
                        </button>
                    </div>
                </form>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
    layout: 'admin',
})

const { adminUrl } = useAdminApi()
const storeNotification = useNotificationStore()

const plans = ref([])
const pending = ref(true)
const loadError = ref('')
const editingId = ref(null)
const isCreating = ref(false)
const saving = ref(false)
const deletingId = ref(null)
const formError = ref('')

const editForm = reactive({
    code: '',
    title: '',
    price: 0,
    currency: 'RUB',
    durationDays: 30,
    isActive: true,
})

const createForm = reactive({
    code: '',
    title: '',
    price: 130,
    currency: 'RUB',
    durationDays: 30,
    isActive: true,
})

function formatPrice(price, currency = 'RUB') {
    const value = Number(price)
    if (!Number.isFinite(value)) return '—'
    return `${value} ${currency || 'RUB'}`
}

function fillEditForm(plan) {
    editForm.code = plan.code || ''
    editForm.title = plan.title || ''
    editForm.price = Number(plan.price) || 0
    editForm.currency = plan.currency || 'RUB'
    editForm.durationDays = Number(plan.durationDays) || 30
    editForm.isActive = Boolean(plan.isActive)
}

function resetCreateForm() {
    createForm.code = ''
    createForm.title = ''
    createForm.price = 130
    createForm.currency = 'RUB'
    createForm.durationDays = 30
    createForm.isActive = true
}

function toggleEdit(plan) {
    formError.value = ''
    isCreating.value = false

    if (editingId.value === plan.id) {
        editingId.value = null
        return
    }

    editingId.value = plan.id
    fillEditForm(plan)
}

function closeEdit() {
    editingId.value = null
    formError.value = ''
}

function openCreate() {
    formError.value = ''
    editingId.value = null
    isCreating.value = true
    resetCreateForm()
}

function closeCreate() {
    isCreating.value = false
    formError.value = ''
}

async function loadPlans() {
    pending.value = true
    loadError.value = ''

    try {
        const response = await $fetch(adminUrl('/api/v1/admin/plans'), {
            credentials: 'include',
        })

        plans.value = Array.isArray(response?.data) ? response.data : []
    } catch (error) {
        loadError.value = error?.data?.message || 'Не удалось загрузить тарифы'
        plans.value = []
    } finally {
        pending.value = false
    }
}

async function onSaveEdit() {
    if (!editingId.value || saving.value) return

    saving.value = true
    formError.value = ''

    try {
        const response = await $fetch(adminUrl(`/api/v1/admin/plans/${editingId.value}`), {
            method: 'PUT',
            credentials: 'include',
            body: {
                code: editForm.code.trim(),
                title: editForm.title.trim(),
                price: Number(editForm.price),
                currency: editForm.currency.trim(),
                durationDays: Number(editForm.durationDays),
                isActive: Boolean(editForm.isActive),
            },
        })

        if (!response?.success || !response?.data) {
            formError.value = response?.message || 'Не удалось сохранить тариф'
            return
        }

        const index = plans.value.findIndex((item) => item.id === editingId.value)
        if (index !== -1) {
            plans.value[index] = response.data
        }

        editingId.value = null
        storeNotification.setNotification({
            type: 'success',
            text: 'Тариф обновлён',
        })
    } catch (error) {
        formError.value = error?.data?.message || error?.message || 'Не удалось сохранить тариф'
    } finally {
        saving.value = false
    }
}

async function onSaveCreate() {
    if (saving.value) return

    saving.value = true
    formError.value = ''

    try {
        const response = await $fetch(adminUrl('/api/v1/admin/plans'), {
            method: 'POST',
            credentials: 'include',
            body: {
                code: createForm.code.trim(),
                title: createForm.title.trim(),
                price: Number(createForm.price),
                currency: createForm.currency.trim(),
                durationDays: Number(createForm.durationDays),
                isActive: Boolean(createForm.isActive),
            },
        })

        if (!response?.success || !response?.data) {
            formError.value = response?.message || 'Не удалось создать тариф'
            return
        }

        plans.value = [...plans.value, response.data].sort(
            (a, b) => Number(a.durationDays) - Number(b.durationDays),
        )
        isCreating.value = false
        resetCreateForm()

        storeNotification.setNotification({
            type: 'success',
            text: 'Тариф добавлен',
        })
    } catch (error) {
        formError.value = error?.data?.message || error?.message || 'Не удалось создать тариф'
    } finally {
        saving.value = false
    }
}

async function onDelete(plan) {
    if (!confirm(`Удалить тариф «${plan.title}»?`)) return

    deletingId.value = plan.id
    formError.value = ''

    try {
        await $fetch(adminUrl(`/api/v1/admin/plans/${plan.id}`), {
            method: 'DELETE',
            credentials: 'include',
        })

        plans.value = plans.value.filter((item) => item.id !== plan.id)
        if (editingId.value === plan.id) editingId.value = null

        storeNotification.setNotification({
            type: 'success',
            text: 'Тариф удалён',
        })
    } catch (error) {
        storeNotification.setNotification({
            type: 'error',
            text: error?.data?.message || error?.message || 'Не удалось удалить тариф',
        })
    } finally {
        deletingId.value = null
    }
}

await loadPlans()
</script>
