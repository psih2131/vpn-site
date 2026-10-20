<template>
    <main class="main">

      <ClientOnly>
          <HeroAnim />
      </ClientOnly>

        <!-- Hero -->
        <section id="hero" class="hero">
            <img
                :src="heroSchematic"
                alt="Схема подключения VPN ключа Dark Nova для Happ и INCY"
                title="Схема подключения VPN ключа Dark Nova для Happ и INCY"
                class="hero__schematic"
            />
            <div class="container">
                <div class="hero__inner">
                    <div class="hero__content">
                        <span class="hero__badge">
                            <svg class="hero__badge-icon" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1.2 9.7 5.5 14.4 6l-3.5 3.1.9 4.5L8 11.4 4.2 13.6l.9-4.5L1.6 6l4.7-.5L8 1.2Z"/>
                            </svg>
                            3 дня бесплатно
                        </span>
                        <h1 class="hero__title">Получи VPN ключ для Happ и INCY<br />бесплатно</h1>
                        <p class="hero__text">
                            Выдаём ключ для Happ и INCY в Telegram за пару минут.
                            Вы получаете VPN на 3 дня бесплатно, 5 устройств на подписке,
                            10 евро-серверов, без карт и сложных настроек.
                            Цена подписки на месяц — от 130₽/мес.
                        </p>
                        <div class="hero__actions">
                            <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer" class="hero__btn">
                                Подключить бесплатно
                                <svg class="hero__btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
                                    <path d="M3 8h10M9 4l4 4-4 4"/>
                                </svg>
                            </a>
                            <a href="#howto" class="hero__btn hero__btn--ghost">
                                <span class="hero__play">
                                    <svg viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M6 4.2v7.6L12.4 8 6 4.2Z"/>
                                    </svg>
                                </span>
                                Как это работает
                            </a>
                        </div>
                        <div class="hero__trust">
                            <span class="hero__trust-label">Работает с клиентами</span>
                            <div class="hero__trust-list">
                                <span class="hero__trust-item">
                                    <img
                                        :src="logoHapp"
                                        alt="Клиент Happ для VPN ключа Dark Nova"
                                        title="Клиент Happ для VPN ключа Dark Nova"
                                        class="hero__trust-logo"
                                    />
                                    <span class="hero__trust-name">Happ</span>
                                </span>
                                <span class="hero__trust-plus">+</span>
                                <span class="hero__trust-item">
                                    <img
                                        :src="logoIncy"
                                        alt="Клиент INCY для VPN ключа Dark Nova"
                                        title="Клиент INCY для VPN ключа Dark Nova"
                                        class="hero__trust-logo"
                                    />
                                    <span class="hero__trust-name">INCY</span>
                                </span>
                            </div>
                        </div>
                    </div>


                    

                    <!-- <div class="hero__panel">
                        <div class="hero__panel-head">
                            <div>
                                <p class="hero__panel-kicker">Соединение</p>
                                <h2 class="hero__panel-title">Статус серверов</h2>
                            </div>
                            <span class="hero__live">
                                <span class="hero__live-dot"></span>
                                Online
                            </span>
                        </div>

                        <div class="hero__legend">
                            <span class="hero__legend-item">
                                <i class="hero__legend-swatch hero__legend-swatch--muted"></i>
                                VLESS
                            </span>
                            <span class="hero__legend-item">
                                <i class="hero__legend-swatch hero__legend-swatch--green"></i>
                                Hysteria
                            </span>
                        </div>

                        <div class="hero__chart">
                            <div v-for="bar in heroChart" :key="bar.label" class="hero__col">
                                <div class="hero__col-bars">
                                    <span class="hero__bar hero__bar--muted" :style="{ height: bar.vless }"></span>
                                    <span class="hero__bar hero__bar--green" :style="{ height: bar.hysteria }"></span>
                                </div>
                                <span class="hero__col-label" :class="{ 'hero__col-label--active': bar.active }">{{ bar.label }}</span>
                            </div>
                        </div>

                        <div class="hero__panel-foot">
                            <div>
                                <p class="hero__metric-label">Средний пинг</p>
                                <p class="hero__metric-value">18 ms</p>
                            </div>
                            <span class="hero__growth">
                                Extra Fast
                                <b>+стабильность</b>
                            </span>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>


        <!-- Features -->
        <section class="features">
            <div class="container">
                <h2 class="section-title">Почему доверяют нашему VPN?</h2>
                <div class="features__grid">
                    <div class="features__card features__card--large">
                        <div class="features__card-content">
                            <h3 class="features__card-title">Не записываем логи<br />вашей активности.</h3>
                            <p class="features__card-text">
                                Без журнала посещений и передачи данных третьим лицам.
                                Провайдер видит только зашифрованный трафик — не вашу историю.
                            </p>
                        </div>
                        <img
                            :src="featureSecurity"
                            alt="Защита данных без логов — Dark Nova VPN"
                            title="Защита данных без логов — Dark Nova VPN"
                            class="features__image features__image--security"
                        />
                    </div>

                    <div class="features__card features__card--row">
                        <div class="features__card-content">
                            <h3 class="features__card-title">10 VPN серверов<br />со всего мира.</h3>
                            <p class="features__card-text">
                                10 серверов в разных странах, включая отдельные серверы
                                для обхода белых списков и YouTube без рекламы.
                            </p>
                        </div>
                        <img
                            :src="featureApps"
                            alt="10 VPN серверов Dark Nova по всему миру"
                            title="10 VPN серверов Dark Nova по всему миру"
                            class="features__image features__image--apps"
                        />
                    </div>

                    <div class="features__card features__card--row">
                        <div class="features__card-content">
                            <h3 class="features__card-title">Низкий пинг<br />и стабильная скорость.</h3>
                            <p class="features__card-text">
                                Серверы близко к пользователям: комфортный пинг для стриминга,
                                онлайн-игр и быстрой загрузки файлов без просадок.
                            </p>
                        </div>
                        <img
                            :src="featureSpeed"
                            alt="Высокая скорость и низкий пинг Dark Nova VPN"
                            title="Высокая скорость и низкий пинг Dark Nova VPN"
                            class="features__image features__image--speed"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing -->
        <section id="pricing" class="pricing">
            <div class="container">
                <h2 class="section-title">Тарифный план</h2>
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
                        <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer" class="pricing__btn">
                            {{ plan.button }}
                        </a>
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

        <!-- Countries -->
        <section id="regions" class="countries">
            <div class="container">
                <h2 class="section-title">Список доступных vpn серверов</h2>
                <div class="countries__grid">
                    <div v-for="country in countries" :key="`${country.name}-${country.city}`" class="countries__item">
                        <ServerFlag :code="country.flag" class="countries__flag" />
                        <div class="countries__info">
                            <div class="countries__name">{{ country.name }}</div>
                            <div class="countries__city">{{ country.city }}</div>
                        </div>
                        <span
                            v-if="country.badge"
                            class="countries__badge"
                            :class="`countries__badge--${country.badgeType}`"
                        >
                            {{ country.badge }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- How to connect -->
        <section id="howto" class="howto-grid">
            <div class="container">
                <h2 class="section-title howto-grid__title">Как подключить наш VPN</h2>
                <p class="howto-grid__subtitle">
                    Четыре шага и пара минут — без регистрации, ручных настроек и лишних приложений.
                </p>

                <div class="howto-grid__wrap">
                    <article v-for="step in howtoSteps" :key="step.num" class="howto-grid__cell">
                        <div class="howto-grid__head">
                            <span class="howto-grid__num">{{ step.num }}.</span>
                            <svg class="howto-grid__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">
                                <path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7"/>
                            </svg>
                        </div>
                        <div class="howto-grid__body">
                            <h3 class="howto-grid__step-title">{{ step.title }}</h3>
                            <p class="howto-grid__step-text">{{ step.text }}</p>
                        </div>
                        <span class="howto-grid__meta">{{ step.meta }}</span>
                    </article>

                    <a
                        :href="telegramBotLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="howto-grid__cell howto-grid__cell--cta"
                    >
                        <div class="howto-grid__head">
                            <span class="howto-grid__num howto-grid__num--accent">05.</span>
                            <svg class="howto-grid__arrow howto-grid__arrow--accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">
                                <path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7"/>
                            </svg>
                        </div>
                        <div class="howto-grid__body">
                            <h3 class="howto-grid__step-title">Пользуйтесь свободным интернетом</h3>
                            <p class="howto-grid__step-text">3 дня бесплатно, карта не нужна. Дальше — 130₽ в месяц.</p>
                        </div>
                        <span class="howto-grid__meta howto-grid__meta--accent">Начать в Telegram</span>
                    </a>

                    <div class="howto-grid__cell howto-grid__cell--empty"></div>
                </div>
            </div>
        </section>

        <!-- Devices -->
        <section class="devices-alt">
            <div class="container">
                <div class="devices-alt__inner">
                    <div class="devices-alt__visual">
                        <img
                            :src="devicesAltPhone"
                            alt="Приложение Dark Nova VPN на смартфоне"
                            title="Приложение Dark Nova VPN на смартфоне"
                            class="devices-alt__phone"
                        />
                    </div>

                    <div class="devices-alt__content">
                        <span class="devices-alt__eyebrow">
                            <svg class="devices-alt__eyebrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3">
                                <circle cx="8" cy="8" r="6"/>
                                <circle cx="8" cy="8" r="2" fill="currentColor" stroke="none"/>
                            </svg>
                            Одна подписка
                        </span>
                        <h2 class="devices-alt__title">На всех ваших устройствах</h2>

                        <div class="devices-alt__list">
                            <div
                                v-for="(item, index) in deviceBenefits"
                                :key="item.title"
                                class="devices-alt__item"
                                :class="{ 'devices-alt__item--open': openDevice === index }"
                            >
                                <button
                                    class="devices-alt__head"
                                    :aria-expanded="openDevice === index"
                                    @click="toggleDevice(index)"
                                >
                                    <span class="devices-alt__item-title">{{ item.title }}</span>
                                    <span class="devices-alt__chevron">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
                                            <path d="M5.5 3.5 10.5 8l-5 4.5"/>
                                        </svg>
                                    </span>
                                </button>
                                <Vue3SlideUpDown
                                    :model-value="openDevice === index"
                                    :duration="320"
                                    timing-function="cubic-bezier(0.4, 0, 0.2, 1)"
                                    eager
                                >
                                    <div class="devices-alt__body">
                                        <p class="devices-alt__text">{{ item.text }}</p>
                                        <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer" class="devices-alt__more">
                                            Подключить
                                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                                                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/>
                                            </svg>
                                        </a>
                                    </div>
                                </Vue3SlideUpDown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Platforms -->
        <section id="platforms" class="platforms">
            <div class="container">
                <h2 class="section-title platforms__title">Dark Nova VPN работает на всех устройствах</h2>
                <p class="platforms__subtitle">
                    Один аккаунт — все платформы. Подключение идёт через приложения Happ и INCY:
                    вы получаете ссылку-подписку в Telegram-боте, вставляете её в клиент —
                    и все серверы появляются в списке автоматически.
                </p>

                <div class="platforms__grid">
                    <template v-for="platform in platforms" :key="platform.title">
                        <NuxtLink
                            v-if="platform.to"
                            :to="platform.to"
                            class="platforms__card"
                        >
                            <span
                                class="platforms__icon"
                                :class="[`platforms__icon--${platform.icon}`, { 'platforms__icon--wide': platform.wide }]"
                            >
                                <img
                                    :src="platform.image"
                                    :alt="platform.title"
                                    :title="platform.title"
                                    class="platforms__icon-img"
                                    :class="{ 'platforms__icon-img--wide': platform.wide }"
                                />
                            </span>
                            <h3 class="platforms__card-title">{{ platform.title }}</h3>
                            <p class="platforms__card-text">{{ platform.text }}</p>
                        </NuxtLink>
                        <article v-else class="platforms__card">
                            <span
                                class="platforms__icon"
                                :class="[`platforms__icon--${platform.icon}`, { 'platforms__icon--wide': platform.wide }]"
                            >
                                <img
                                    :src="platform.image"
                                    :alt="platform.title"
                                    :title="platform.title"
                                    class="platforms__icon-img"
                                    :class="{ 'platforms__icon-img--wide': platform.wide }"
                                />
                            </span>
                            <h3 class="platforms__card-title">{{ platform.title }}</h3>
                            <p class="platforms__card-text">{{ platform.text }}</p>
                        </article>
                    </template>
                </div>
            </div>
        </section>

        

        <!-- FAQ -->
        <section id="faq" class="faq">
            <div class="container">
                <h2 class="section-title faq__title">Ответы на вопросы</h2>
                <div class="faq__list">
                    <div
                        v-for="(item, index) in faqItems"
                        :key="index"
                        class="faq__item"
                        :class="{ 'faq__item--open': openFaq === index }"
                    >
                        <div
                            class="faq__question"
                            @click="toggleFaq(index)"
                        >
                            <span class="faq__question-text">{{ item.question }}</span>
                            <span class="faq__toggle" :class="{ 'faq__toggle--open': openFaq === index }">+</span>
                        </div>
                        <Vue3SlideUpDown
                            :model-value="openFaq === index"
                            :duration="320"
                            timing-function="cubic-bezier(0.4, 0, 0.2, 1)"
                            eager
                        >
                            <p class="faq__answer">{{ item.answer }}</p>
                        </Vue3SlideUpDown>
                    </div>
                </div>
            </div>
        </section>

        <!-- SEO -->
        <section id="about-vpn" class="seo-block">
            <div class="container">
                <div class="seo-block__inner">
                    <h2 class="section-title seo-block__title">VPN ключ для Happ и INCY от Dark Nova VPN</h2>
                    <div class="seo-block__content">
                        <p>
                            Dark Nova VPN выдаёт рабочий <strong>VPN ключ для Happ и INCY</strong> прямо в Telegram.
                            Вам не нужно искать отдельные конфиги, бесплатные ссылки на форумах или разовые
                            ключи «на день» — бот создаёт подписку под ваш аккаунт и присылает одну ссылку,
                            которая подходит сразу для обоих клиентов.
                        </p>
                        <p>
                            Если вы ищете, где взять ключ для VPN Happ или ключ для VPN INCY, схема простая:
                            откройте бота Dark Nova, получите пробный доступ на 3 дня и добавьте ссылку
                            в приложение. Дальше выбираете сервер и подключаетесь в одно касание —
                            без ручной настройки протоколов и без привязки карты на старте.
                        </p>

                        <h3 class="seo-block__subtitle">Чем удобен ключ Dark Nova для Happ и INCY</h3>
                        <p>
                            Один VPN ключ работает на нескольких устройствах после оплаты подписки —
                            до 5 одновременных подключений. Happ удобен на Android, Windows, macOS, Linux
                            и Android TV, а INCY ставится из российского App Store без смены региона.
                            Формат подписки одинаковый: вставили ссылку — пользуетесь.
                        </p>
                        <p>
                            Сервис держит около 10 VPN серверов в Европе и других локациях, протоколы
                            VLESS Reality и Hysteria2, низкий пинг и стабильную скорость. Логи посещений
                            не пишем: провайдер видит зашифрованный трафик, а не историю сайтов.
                        </p>

                        <h3 class="seo-block__subtitle">Как получить VPN ключ бесплатно на 3 дня</h3>
                        <p>
                            Пробный период позволяет проверить ключ для Happ и INCY без оплаты.
                            После теста можно оформить подписку от 130₽/мес прямо в Telegram.
                            Если сервис не подошёл — возврат в течение 14 дней через поддержку
                            @darkNovaVpn_support.
                        </p>
                        <p>
                            Dark Nova VPN — это быстрый способ получить VPN ключ для клиентов Happ и INCY
                            без сложных настроек: выдача в боте, понятные тарифы и стабильное соединение
                            для телефона, ПК и ТВ.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Blog -->
        <!-- <section id="blog" class="blog">
            <div class="container">
                <h2 class="section-title">Блог</h2>
                <div class="blog__grid">
                    <article v-for="post in blogPosts" :key="post.title" class="blog__card">
                        <img :src="post.image" :alt="post.title" :title="post.title" class="blog__image" />
                        <div class="blog__body">
                            <time class="blog__date">{{ post.date }}</time>
                            <h3 class="blog__title">{{ post.title }}</h3>
                            <p class="blog__excerpt">{{ post.excerpt }}</p>
                            <span class="blog__link">Скоро →</span>
                        </div>
                    </article>
                </div>
            </div>
        </section> -->
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { Vue3SlideUpDown } from 'vue3-slide-up-down'
import ServerFlag from '~/components/ServerFlag.vue'
import heroSchematic from '~/assets/images/hero-schematic.png'
import logoHapp from '~/assets/images/logo/happ.webp'
import logoIncy from '~/assets/images/logo/incy.png'
import devicesAltPhone from '~/assets/images/devices-alt-phone.png'
import featureSecurity from '~/assets/images/feature-security.png'
import featureApps from '~/assets/images/feature-apps.png'
import featureSpeed from '~/assets/images/feature-speed.png'
import iconAndroid from '~/assets/images/icon-android.png'
import iconApple from '~/assets/images/icon-apple.png'
import iconWindows from '~/assets/images/icon-windows.png'
import iconLinux from '~/assets/images/icon-linux.png'
import iconFinder from '~/assets/images/icon-finder.png'
import iconAndroidTv from '~/assets/images/icon-android-tv.png'
import promoReferral from '~/assets/images/promo-referral.png'
import promoRefund from '~/assets/images/promo-refund.png'
import blogImg1 from '~/assets/images/s3.jpg'
import blogImg2 from '~/assets/images/s4.jpg'
import blogImg3 from '~/assets/images/s5.jpg'


import HeroAnim from '~/components/hero-anim.vue'


definePageMeta({ layout: 'default' })

const telegramBotLink = 'https://t.me/dark_nova_vpn_bot'

const openFaq = ref(null)

function toggleFaq(index) {
    openFaq.value = openFaq.value === index ? null : index
}

const heroChart = [
    { label: 'NL', vless: '62%', hysteria: '88%', active: true },
    { label: 'DE', vless: '48%', hysteria: '70%' },
    { label: 'FI', vless: '55%', hysteria: '76%' },
    { label: 'SE', vless: '42%', hysteria: '64%' },
    { label: 'RU', vless: '36%', hysteria: '52%' },
]

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

const countries = [
    { flag: 'nl', name: 'Нидерланды Vless', city: 'VLESS | TCP | Reality', badge: 'Extra Fast', badgeType: 'fast' },
    { flag: 'nl', name: 'Нидерланды Hysteria', city: 'Hysteria | hysteria | TLS', badge: 'Extra Fast', badgeType: 'fast' },
    { flag: 'de', name: 'Германия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'de', name: 'Германия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'fi', name: 'Финляндия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'fi', name: 'Финляндия Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'se', name: 'Швеция Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'se', name: 'Швеция Hysteria', city: 'Hysteria | hysteria | TLS' },
    { flag: 'ru', name: 'Россия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'ru', name: 'Россия Hysteria', city: 'Hysteria | hysteria | TLS' },
    // { flag: 'lte', name: 'Обход белых списков', city: 'VLESS | xhttp | TLS', badge: 'LTE', badgeType: 'lte' },
    { flag: 'cz', name: 'Чехия Vless', city: 'VLESS | TCP | Reality' },
    { flag: 'globe', name: 'Ютуб без рекламы', city: 'VLESS | xhttp | TLS', badge: 'No Ads', badgeType: 'noads' },
]

const openDevice = ref(0)

function toggleDevice(index) {
    openDevice.value = openDevice.value === index ? null : index
}

const deviceBenefits = [
    {
        title: '5 устройств одновременно',
        text: 'Телефон, ноутбук, планшет и телевизор работают параллельно. Не нужно отключать одно устройство, чтобы подключить другое.',
    },
    {
        title: 'Все платформы сразу',
        text: 'Windows, macOS, Linux, Android, iPhone и Android TV. Ставите Happ или INCY — ссылка-подписка везде одна и та же, отдельные аккаунты не нужны.',
    },
    {
        title: 'Подключение в одно касание',
        text: 'Бот присылает кнопку автоматического подключения: серверы появляются в приложении сами и обновляются, когда мы добавляем новые.',
    },
    {
        title: 'Поддержка и инструкции',
        text: 'Пошаговые инструкции под каждую систему прямо в Telegram-боте, а живая поддержка отвечает круглосуточно.',
    },
]

const platforms = [
    {
        icon: 'android',
        image: iconAndroid,
        title: 'VPN для Android',
        text: 'Смартфоны и планшеты на Android. Happ и INCY есть в Google Play, оба поддерживают VLESS Reality и Hysteria2 и подключаются в одно касание.',
    },
    {
        icon: 'apple',
        image: iconApple,
        title: 'VPN для iPhone и iPad',
        text: 'INCY скачивается из российского App Store без смены региона Apple ID. Подключение стартует вместе с системой и держится на любых операторах и Wi-Fi.',
        to: '/blog/kak-nastroit-vpn-happ-na-iphone',
    },
    {
        icon: 'windows',
        image: iconWindows,
        title: 'VPN для Windows',
        text: 'Клиент для Windows 10 и 11 защищает весь трафик на компьютере и ноутбуке: браузер, игры и приложения работают через выбранный сервер.',
    },
    {
        icon: 'finder',
        image: iconFinder,
        title: 'VPN для macOS',
        text: 'Приложение для Mac на чипах Apple Silicon и Intel. Не нагружает систему и удерживает защищённое соединение в фоновом режиме.',
    },
    {
        icon: 'linux',
        image: iconLinux,
        title: 'VPN для Linux',
        text: 'Поддержка популярных дистрибутивов и гибкая настройка конфигураций для опытных пользователей, домашних и рабочих серверов.',
    },
    {
        icon: 'androidtv',
        image: iconAndroidTv,
        wide: true,
        title: 'VPN для Android TV',
        text: 'Клиент ставится на телевизор или ТВ-приставку и снимает ограничения со стримингов — без отдельной подписки и настройки роутера.',
    },
]

const howtoSteps = [
    {
        num: '01',
        title: 'Откройте бота',
        text: 'Нажмите «Подключить» и запустите Dark Nova VPN в Telegram. Регистрация и почта не нужны.',
        meta: 'Telegram',
    },
    {
        num: '02',
        title: 'Получите VPN ключ',
        text: 'Активируйте 3 дня бесплатно или сразу оплатите подписку прямо в переписке с ботом.',
        meta: 'Пробный период',
    },
    {
        num: '03',
        title: 'Установите Happ или INCY',
        text: 'Happ или INCY на телефон, компьютер или телевизор — ссылки бот пришлёт под вашу систему.',
        meta: 'Happ / INCY',
    },
    {
        num: '04',
        title: 'Подключитесь',
        text: 'Нажмите в боте кнопку автоматического подключения — ссылка добавится сама. Или вставьте её в приложение вручную и выберите сервер.',
        meta: 'Одна кнопка',
    },
]

const faqItems = [
    {
        question: 'Как получить VPN ключ для Happ и INCY?',
        answer: 'Чтобы получить VPN ключ для клиентов Happ и INCY, нажмите «Подключить» на сайте и перейдите в Telegram-бот Dark Nova. Пройдите короткую регистрацию — бот сразу выдаст пробный доступ на 3 дня и пришлёт ссылку-ключ (подписку). Эту же ссылку можно добавить в Happ или INCY: в приложении выберите добавление по ссылке, вставьте ключ из бота и подключитесь к серверу. Один ключ подходит для обоих клиентов, отдельно для Happ и INCY ничего покупать не нужно. После пробного периода продлите подписку в боте — ключ останется тем же.',
    },
    {
        question: 'В каких приложениях работает VPN ключ?',
        answer: 'Мы выдаём одну ссылку-подписку, которая подходит для Happ и INCY — оба клиента работают на ядре Xray. Happ есть в Google Play и на Windows, macOS, Linux и Android TV, а INCY скачивается из российского App Store без смены региона Apple ID.',
    },
    {
        question: 'Сколько устройств можно подключить по нашему VPN ключу?',
        answer: 'Платная подписка Dark Nova VPN работает одновременно на 5 устройствах — например, телефон, ноутбук и телевизор. В пробном периоде доступно 1 устройство.',
    },
    {
        question: 'Есть ли пробный период у нашего VPN?',
        answer: 'Да, вы можете попробовать VPN бесплатно в течение 3 дней: лимит трафика 20 GB, ограничение скорости загрузки и 1 устройство. После пробного периода подписка стоит 130₽/месяц.',
    },
    {
        question: 'Сколько стоит подписка и что выгоднее?',
        answer: 'Месячная — 130₽. На 3 месяца — 350₽ (≈117₽/мес, выгода 10%). Годовая — 1 300₽ (≈108₽/мес, выгода 17%), приоритетное обслуживание и доступ ко всем серверам.',
    },
    {
        question: 'Будет ли VPN работать при блокировках?',
        answer: 'Да. Серверы работают на VLESS с Reality и на Hysteria2 с TLS — такой трафик выглядит как обычное HTTPS-соединение и не распознаётся фильтрами. Если у оператора действует белый список сайтов, помогает отдельный сервер обхода.',
    },
    {
        question: 'Вы храните логи?',
        answer: 'Нет. Мы не ведём журнал посещённых сайтов и не передаём данные третьим лицам — провайдер тоже не увидит вашу историю, он видит только зашифрованное соединение.',
    },
    {
        question: 'Можно ли вернуть деньги?',
        answer: 'Да. Если сервис не подошёл, мы вернём оплату в течение 14 дней с момента покупки — просто напишите в поддержку.',
    },
    {
        question: 'Как работает реферальная программа?',
        answer: 'Приглашайте друзей по реферальной ссылке из бота и получайте 50% комиссии со всех их платежей на свой баланс. Лимит на вывод — 2000₽, также баланс можно тратить на оплату своего тарифа.',
    },
    {
        question: 'Как связаться с поддержкой?',
        answer: 'Напишите нам в Telegram — @darkNovaVpn_support. Мы отвечаем круглосуточно.',
    },
]

const blogPosts = [
    {
        date: '15 августа 2025',
        title: 'Как выбрать VPN: 5 главных критериев',
        excerpt: 'Разбираем, на что обращать внимание при выборе VPN-сервиса: скорость, безопасность, количество серверов и политика логов.',
        image: blogImg1,
    },
    {
        date: '3 августа 2025',
        title: 'Зачем нужен VPN в 2025 году',
        excerpt: 'VPN — это не только обход блокировок. Рассказываем о защите данных, безопасности в публичных Wi-Fi и приватности.',
        image: blogImg2,
    },
    {
        date: '20 июля 2025',
        title: 'Настройка VPN на Android за 2 минуты',
        excerpt: 'Пошаговая инструкция по подключению Dark Nova VPN на Android через Telegram-бот без сложных настроек.',
        image: blogImg3,
    },
]




const siteUrl = 'https://darknovavpn.com'
const pageTitle = 'VPN ключ для Happ и INCY — Dark Nova VPN'
const pageDescription = 'VPN ключ для клиентов Happ и INCY. Быстрая выдача в Telegram, 3 дня бесплатно, оплата от 130₽/мес. Dark Nova VPN.'
const pageKeywords = 'VPN ключ для Happ, VPN ключ для INCY, ключ для впн Happ, ключ для впн INCY, VPN Happ, VPN INCY, Dark Nova VPN, VPN ключ Telegram'
const ogImage = `${siteUrl}/dark-nova-green-eyes.png`
 
useHead({
    title: pageTitle,
    htmlAttrs: { lang: 'ru' },
    meta: [
        { name: 'description', content: pageDescription },
        { name: 'keywords', content: pageKeywords },
        { name: 'author', content: 'Dark Nova VPN' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#000000' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: 'Dark Nova VPN' },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:alt', content: 'VPN ключ для Happ и INCY — Dark Nova VPN' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:image', content: ogImage },
    ],
    link: [
        { rel: 'canonical', href: `${siteUrl}/` },
        { rel: 'alternate', hreflang: 'ru', href: `${siteUrl}/` },
        { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` },
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'WebSite',
                        '@id': `${siteUrl}/#website`,
                        url: `${siteUrl}/`,
                        name: 'Dark Nova VPN',
                        description: pageDescription,
                        inLanguage: 'ru-RU',
                        publisher: { '@id': `${siteUrl}/#organization` },
                    },
                    {
                        '@type': 'Organization',
                        '@id': `${siteUrl}/#organization`,
                        name: 'Dark Nova VPN',
                        url: `${siteUrl}/`,
                        logo: `${siteUrl}/favicon.ico`,
                        sameAs: [
                            'https://t.me/darkNovaVpn_support',
                        ],
                        contactPoint: {
                            '@type': 'ContactPoint',
                            contactType: 'customer support',
                            url: 'https://t.me/darkNovaVpn_support',
                            availableLanguage: ['Russian'],
                        },
                    },
                    {
                        '@type': 'SoftwareApplication',
                        name: 'VPN ключ для Happ и INCY — Dark Nova VPN',
                        alternateName: 'Dark Nova VPN',
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'Android, iOS, Windows, macOS, Linux, Android TV',
                        offers: [
                            {
                                '@type': 'Offer',
                                name: 'Подписка на 1 месяц',
                                price: '130',
                                priceCurrency: 'RUB',
                                url: `${siteUrl}/#pricing`,
                                description: 'VPN ключ для Happ и INCY на 1 месяц',
                            },
                            {
                                '@type': 'Offer',
                                name: 'Подписка на 3 месяца',
                                price: '350',
                                priceCurrency: 'RUB',
                                url: `${siteUrl}/#pricing`,
                                description: 'VPN ключ для Happ и INCY на 3 месяца — 350₽ (скидка 10%)',
                            },
                            {
                                '@type': 'Offer',
                                name: 'Подписка на 1 год',
                                price: '1300',
                                priceCurrency: 'RUB',
                                url: `${siteUrl}/#pricing`,
                                description: 'VPN ключ для Happ и INCY на 1 год — 1 300₽ (скидка 17%)',
                            },
                        ],
                        description: pageDescription,
                    },
                    {
                        '@type': 'FAQPage',
                        mainEntity: faqItems.map((item) => ({
                            '@type': 'Question',
                            name: item.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: item.answer,
                            },
                        })),
                    },
                ],
            }),
        },
    ],
})
</script>
