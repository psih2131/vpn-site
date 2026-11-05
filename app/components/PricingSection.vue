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
                        <h3 class="pricing__promo-title">{{ $t('pricing.referralLine1') }}<br>{{ $t('pricing.referralLine2') }}</h3>
                        <p class="pricing__promo-text">{{ $t('pricing.referralText') }}</p>
                    </div>
                    <img
                        :src="promoReferral"
                        :alt="$t('pricing.referralAlt')"
                        :title="$t('pricing.referralAlt')"
                        class="pricing__promo-image pricing__promo-image--referral"
                    />
                </div>
                <div class="pricing__promo-card">
                    <div class="pricing__promo-content">
                        <h3 class="pricing__promo-title">{{ $t('pricing.refundLine1') }}<br>{{ $t('pricing.refundLine2') }}</h3>
                        <p class="pricing__promo-text">{{ $t('pricing.refundText1') }}<br>{{ $t('pricing.refundText2') }}</p>
                    </div>
                    <img
                        :src="promoRefund"
                        :alt="$t('pricing.refundAlt')"
                        :title="$t('pricing.refundAlt')"
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
const { t } = useI18n()

function openRegistration(buttonName) {
    trackEvent('click_cta', { button_name: buttonName })
    storeModal.typeActiveModal('registration')
    storeModal.openCloseModal(true)
}

const sharedFeatures = computed(() => [
    t('pricing.noTraffic'),
    t('pricing.noSpeed'),
    t('pricing.devices'),
    t('pricing.whitelist'),
])

const plans = computed(() => [
    {
        badge: t('pricing.basic'),
        badgeIcon: 'base',
        trackId: `${props.trackPrefix}pricing_1m`,
        title: t('pricing.month1'),
        features: [
            t('pricing.days30'),
            ...sharedFeatures.value.slice(0, 3),
            t('pricing.support'),
            t('pricing.servers10'),
            sharedFeatures.value[3],
        ],
        disabledFeatures: [],
        priceValue: t('pricing.priceMonth'),
        pricePeriodLine1: t('pricing.per'),
        pricePeriodLine2: t('pricing.month'),
        priceNote: t('pricing.noteMonth'),
        button: t('pricing.button'),
    },
    {
        badge: t('pricing.value'),
        badgeIcon: 'value',
        trackId: `${props.trackPrefix}pricing_3m`,
        title: t('pricing.month3'),
        features: [
            t('pricing.days90'),
            t('pricing.save10'),
            ...sharedFeatures.value.slice(0, 3),
            t('pricing.support'),
            t('pricing.servers10'),
            sharedFeatures.value[3],
        ],
        disabledFeatures: [],
        priceValue: t('pricing.priceQuarter'),
        pricePeriodLine1: t('pricing.per'),
        pricePeriodLine2: t('pricing.month'),
        priceNote: t('pricing.noteQuarter'),
        priceDiscount: t('pricing.discountQuarter'),
        button: t('pricing.button'),
    },
    {
        badge: t('pricing.value'),
        badgeIcon: 'value',
        trackId: `${props.trackPrefix}pricing_1y`,
        title: t('pricing.year1'),
        features: [
            t('pricing.days365'),
            t('pricing.save17'),
            ...sharedFeatures.value.slice(0, 3),
            t('pricing.service'),
            t('pricing.allServers'),
            sharedFeatures.value[3],
        ],
        disabledFeatures: [],
        priceValue: t('pricing.priceYear'),
        pricePeriodLine1: t('pricing.per'),
        pricePeriodLine2: t('pricing.month'),
        priceNote: t('pricing.noteYear'),
        priceDiscount: t('pricing.discountYear'),
        button: t('pricing.button'),
    },
])
</script>
