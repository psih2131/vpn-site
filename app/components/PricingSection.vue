<template>
    <section id="pricing" class="pricing">
        <div class="container">
            <h2 class="section-title">{{ title }}</h2>
            <div class="pricing__grid">
                <div v-for="plan in plans" :key="plan.title" class="pricing__card">
                    <div class="pricing__badge">
                        <svg v-if="plan.badgeIcon === 'test'" class="pricing__badge-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="8" cy="8" r="6"/>
                            <path d="M5.5 10c.8 1 1.6 1.5 2.5 1.5s1.7-.5 2.5-1.5"/>
                            <circle cx="6" cy="6.5" r=".75" fill="currentColor" stroke="none"/>
                            <circle cx="10" cy="6.5" r=".75" fill="currentColor" stroke="none"/>
                        </svg>
                        <svg v-else-if="plan.badgeIcon === 'base'" class="pricing__badge-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="2" y="5" width="12" height="9" rx="1"/>
                            <path d="M5 5V4a3 3 0 016 0v1"/>
                        </svg>
                        <svg v-else class="pricing__badge-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="8" cy="8" r="6"/>
                            <path d="M5 10s1 1.5 3 1.5 3-1.5 3-1.5"/>
                            <circle cx="6" cy="7" r=".75" fill="currentColor" stroke="none"/>
                            <circle cx="10" cy="7" r=".75" fill="currentColor" stroke="none"/>
                        </svg>
                        {{ plan.badge }}
                    </div>
                    <h3 class="pricing__card-title">{{ plan.title }}</h3>
                    <ul class="pricing__list">
                        <li
                            v-for="(feature, index) in plan.features"
                            :key="feature"
                            class="pricing__list-item"
                            :class="{ 'pricing__list-item--disabled': plan.disabledFeatures.includes(index) }"
                        >
                            <span
                                class="pricing__list-dot"
                                :class="{ 'pricing__list-dot--disabled': plan.disabledFeatures.includes(index) }"
                            ></span>
                            {{ feature }}
                        </li>
                    </ul>
                    <div class="pricing__price-block">
                        <div class="pricing__price-top">
                            <div class="pricing__price-main">
                                <span class="pricing__price-value">{{ plan.priceValue }}</span>
                                <span class="pricing__price-period">
                                    <span class="pricing__price-period-line">{{ plan.pricePeriodLine1 }}</span>
                                    <span class="pricing__price-period-line">{{ plan.pricePeriodLine2 }}</span>
                                </span>
                            </div>
                            <span v-if="plan.priceDiscount" class="pricing__price-discount">{{ plan.priceDiscount }}</span>
                        </div>
                        <p v-if="plan.priceNote" class="pricing__price-note">{{ plan.priceNote }}</p>
                    </div>
                    <button type="button" class="pricing__btn" @click="openRegistration(plan.trackId)">
                        {{ plan.button }}
                    </button>
                </div>
            </div>

            <div class="pricing__promo-row">
                <div class="pricing__promo-card">
                    <div class="pricing__promo-content">
                        <h3 class="pricing__promo-title">Реферальная<br />программа для вас</h3>
                        <p class="pricing__promo-text">
                            50% комиссия со всех платежей привлеченного пользователя.
                            Лимит на вывод — 2000₽, также можете оплачивать тариф
                            со своего реферального счета.
                        </p>
                    </div>
                    <img
                        :src="promoReferral"
                        alt="Реферальная программа Dark Nova VPN"
                        title="Реферальная программа Dark Nova VPN"
                        class="pricing__promo-image pricing__promo-image--referral"
                    />
                </div>
                <div class="pricing__promo-card">
                    <div class="pricing__promo-content">
                        <h3 class="pricing__promo-title">Вернем деньги<br />в течение 14 дней</h3>
                        <p class="pricing__promo-text">
                            если вам не понравится<br />или не подойдет Dark Nova VPN.
                        </p>
                    </div>
                    <img
                        :src="promoRefund"
                        alt="Возврат денег в течение 14 дней — Dark Nova VPN"
                        title="Возврат денег в течение 14 дней — Dark Nova VPN"
                        class="pricing__promo-image pricing__promo-image--refund"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import promoReferral from '~/assets/images/promo-referral.png'
import promoRefund from '~/assets/images/promo-refund.png'
import { useModalStore } from '~/stores/modal'

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    trackPrefix: {
        type: String,
        default: '',
    },
})

const storeModal = useModalStore()
const { trackEvent } = useGtag()

function openRegistration(buttonName) {
    trackEvent('click_cta', { button_name: buttonName })
    storeModal.typeActiveModal('registration')
    storeModal.openCloseModal(true)
}

const monthlyPlanFeatures = [
    '30 дней',
    'Нет лимита на трафик',
    'Нет ограничения по скорости',
    '5 устройств на подписку',
    'Приоритетная техподдержка',
    '10 серверов',
    'Обход белых списков',
]

const yearlyPlanFeatures = [
    '365 дней',
    'Выгода 17%',
    'Нет лимита на трафик',
    'Нет ограничения по скорости',
    '5 устройств на подписку',
    'Приоритетное обслуживание',
    'Все серверы',
    'Обход белых списков',
]

const quarterlyPlanFeatures = [
    '90 дней',
    'Выгода 10%',
    'Нет лимита на трафик',
    'Нет ограничения по скорости',
    '5 устройств на подписку',
    'Приоритетная техподдержка',
    '10 серверов',
    'Обход белых списков',
]

const plans = [
    {
        badge: 'Базовый тариф',
        badgeIcon: 'base',
        trackId: `${props.trackPrefix}pricing_1m`,
        title: 'Подписка на 1 месяц',
        features: monthlyPlanFeatures,
        disabledFeatures: [],
        priceValue: '130₽',
        pricePeriodLine1: 'в',
        pricePeriodLine2: 'месяц',
        priceNote: '130₽ списывается ежемесячно',
        button: 'Попробовать бесплатно',
    },
    {
        badge: 'Выгодный тариф',
        badgeIcon: 'value',
        trackId: `${props.trackPrefix}pricing_3m`,
        title: 'Подписка на 3 месяца',
        features: quarterlyPlanFeatures,
        disabledFeatures: [],
        priceValue: '117₽',
        pricePeriodLine1: 'в',
        pricePeriodLine2: 'месяц',
        priceNote: '350₽ оплата за 3 месяца',
        priceDiscount: '-10%',
        button: 'Попробовать бесплатно',
    },
    {
        badge: 'Выгодный тариф',
        badgeIcon: 'value',
        trackId: `${props.trackPrefix}pricing_1y`,
        title: 'Подписка на 1 год',
        features: yearlyPlanFeatures,
        disabledFeatures: [],
        priceValue: '108₽',
        pricePeriodLine1: 'в',
        pricePeriodLine2: 'месяц',
        priceNote: '1 300₽ оплата за год',
        priceDiscount: '-17%',
        button: 'Попробовать бесплатно',
    },
]
</script>
