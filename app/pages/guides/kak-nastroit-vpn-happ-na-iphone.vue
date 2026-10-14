<template>
    <div class="blog-post-page">
        <div class="blog-post-page__inner">
            <nav class="blog-breadcrumbs" aria-label="Хлебные крошки">
                <NuxtLink to="/" class="blog-breadcrumbs__link">Главная</NuxtLink>
                <span class="blog-breadcrumbs__sep">/</span>
                <span class="blog-breadcrumbs__current">{{ title }}</span>
            </nav>

            <h1 class="blog-post__title">{{ title }}</h1>

            <div class="blog-post__meta">
                <span class="blog-post__date">Обновлено: {{ updatedAt }}</span>
            </div>

            <div class="blog-post__content text-content">
                <p>
                    <strong>Happ VPN на iPhone</strong> подключается за несколько минут:
                    ставите приложение из App Store, копируете ссылку-подписку из бота Dark Nova
                    и добавляете её в Happ. Ниже — пошаговая инструкция, как настроить VPN Happ на iPhone.
                </p>

                <h2>Что понадобится</h2>
                <ul>
                    <li>iPhone с доступом в App Store</li>
                    <li>Telegram и бот <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer">@dark_nova_vpn_bot</a></li>
                    <li>Активная подписка Dark Nova (есть пробный период на 3 дня)</li>
                </ul>

                <h2>Как настроить VPN Happ на iPhone</h2>
                <p>
                    После оплаты или активации пробного периода в боте вы получаете ссылку подключения —
                    это доступ ко всем серверам Dark Nova. Дальше выполните шаги ниже.
                </p>

                <h3>Шаг 1. Установите Happ на iPhone</h3>
                <p>
                    Happ — клиент, через который работает подписка. Установите его из App Store:
                    <a href="https://apps.apple.com/app/id2024287215" target="_blank" rel="noopener noreferrer">
                        скачать Happ для iPhone
                    </a>.
                </p>
                <figure class="guide-figure">
                    <img
                        :src="imgInstall"
                        alt="Установка Happ VPN на iPhone из App Store"
                        loading="lazy"
                    >
                    <figcaption>Установите Happ из App Store на iPhone</figcaption>
                </figure>

                <h3>Шаг 2. Скопируйте ссылку подписки из бота</h3>
                <p>Откройте Telegram-бот Dark Nova и скопируйте ссылку подключения:</p>
                <ol>
                    <li>Запустите <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer">@dark_nova_vpn_bot</a></li>
                    <li>Перейдите в «Настройки VPN»</li>
                    <li>Нажмите на ссылку подключения — она скопируется в буфер обмена</li>
                </ol>
                <p>
                    Ссылка обычно выглядит так:
                    <code>https://ваш-сервер:порт/sub/xxxxxxxx</code>
                </p>
                <figure class="guide-figure">
                    <img
                        :src="imgCopyLink"
                        alt="Копирование ссылки подписки Happ VPN из Telegram-бота на iPhone"
                        loading="lazy"
                    >
                    <figcaption>Скопируйте ссылку подписки из бота</figcaption>
                </figure>

                <h3>Шаг 3. Откройте приложение Happ</h3>
                <p>
                    Запустите Happ на iPhone. Если приложение просит разрешения — подтвердите их,
                    это нужно для стабильной работы VPN.
                </p>
                <figure class="guide-figure">
                    <img
                        :src="imgOpenHapp"
                        alt="Открытие приложения Happ VPN на iPhone"
                        loading="lazy"
                    >
                    <figcaption>Откройте Happ на iPhone</figcaption>
                </figure>

                <h3>Шаг 4. Добавьте подписку из буфера обмена</h3>
                <ol>
                    <li>Нажмите «+» в приложении</li>
                    <li>Выберите «Вставить из буфера обмена» (или похожий пункт)</li>
                    <li>Подождите несколько секунд — список серверов подтянется автоматически</li>
                </ol>
                <figure class="guide-figure">
                    <img
                        :src="imgAddSubscription"
                        alt="Добавление подписки Happ VPN из буфера обмена на iPhone"
                        loading="lazy"
                    >
                    <figcaption>Добавьте подписку через «+» → «Вставить из буфера»</figcaption>
                </figure>

                <h3>Шаг 5. Выберите сервер и подключитесь</h3>
                <p>После импорта в Happ появится список локаций Dark Nova, например:</p>
                <ul>
                    <li>Нидерланды</li>
                    <li>Германия</li>
                    <li>Финляндия</li>
                    <li>Швеция</li>
                    <li>Чехия</li>
                    <li>Испания</li>
                    <li>Россия</li>
                </ul>
                <p>
                    Выберите любой сервер и нажмите кнопку подключения.
                    При первом запуске iPhone запросит разрешение на VPN-конфигурацию — нажмите «Разрешить».
                </p>
                <p><strong>Готово — Happ VPN на iPhone включён.</strong></p>

                <h2>Если Happ VPN на iPhone не подключается</h2>
                <ul>
                    <li>Проверьте, что ссылка скопирована целиком</li>
                    <li>Обновите подписку в Happ (потяните список вниз или через меню подписки)</li>
                    <li>Смените сервер — иногда помогает другая локация</li>
                    <li>Переустановите Happ и добавьте ссылку заново</li>
                </ul>
                <p>
                    Не помогло — напишите в
                    <a href="https://t.me/darkNovaVpn_support" target="_blank" rel="noopener noreferrer">поддержку Dark Nova</a>.
                </p>

                <h2>Частые вопросы</h2>
                <p><strong>Нужен ли иностранный Apple ID для Happ?</strong><br>
                    Нет. Happ скачивается из обычного App Store.</p>
                <p><strong>Одна подписка работает только на iPhone?</strong><br>
                    Нет. Тот же ключ из бота можно добавить в Happ на других устройствах в рамках лимита тарифа.</p>
                <p><strong>Чем отличается Happ VPN на iPhone от браузерного VPN?</strong><br>
                    Happ защищает весь трафик устройства: Safari, приложения, YouTube — не только вкладки браузера.</p>
            </div>

            <BlogPostCta />
        </div>
    </div>
</template>

<script setup>
import imgInstall from '~/assets/images/posts/ios/ff1.jpg'
import imgCopyLink from '~/assets/images/posts/ios/ff2.jpg'
import imgOpenHapp from '~/assets/images/posts/ios/ff3.jpg'
import imgAddSubscription from '~/assets/images/posts/ios/ff4.jpg'

const telegramBotLink = 'https://t.me/dark_nova_vpn_bot'
const title = 'Как настроить VPN Happ на iPhone'
const pageUrl = 'https://dark-nova-vpn.space/guides/kak-nastroit-vpn-happ-na-iphone'
const pageDescription = 'Как настроить VPN Happ на iPhone: установка из App Store, добавление подписки Dark Nova и подключение к серверу за несколько минут.'
const ogImage = 'https://dark-nova-vpn.space/dark-nova-green-eyes.png'
const updatedAt = '14 октября 2026'

useHead({
    title: `${title} — инструкция | Dark Nova`,
    meta: [
        { name: 'description', content: pageDescription },
        {
            name: 'keywords',
            content: 'happ vpn на iphone, как настроить vpn happ на iphone, подключить happ iphone, скачать happ vpn iphone, dark nova',
        },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: `${title} — инструкция | Dark Nova` },
        { property: 'og:description', content: pageDescription },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: pageUrl },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:alt', content: title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${title} — инструкция | Dark Nova` },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:image', content: ogImage },
    ],
    link: [
        { rel: 'canonical', href: pageUrl },
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: title,
                description: pageDescription,
                inLanguage: 'ru-RU',
                step: [
                    {
                        '@type': 'HowToStep',
                        name: 'Установите Happ на iPhone',
                        text: 'Скачайте Happ из App Store на iPhone.',
                        url: 'https://apps.apple.com/app/id2024287215',
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Скопируйте ссылку подписки',
                        text: 'Откройте Telegram-бот Dark Nova, перейдите в настройки VPN и скопируйте ссылку подключения.',
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Откройте Happ',
                        text: 'Запустите приложение Happ на iPhone.',
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Добавьте подписку из буфера',
                        text: 'Нажмите «+» и выберите «Вставить из буфера обмена».',
                    },
                    {
                        '@type': 'HowToStep',
                        name: 'Выберите сервер и подключитесь',
                        text: 'Выберите локацию и нажмите кнопку подключения. Разрешите VPN-конфигурацию в iOS.',
                    },
                ],
            }),
        },
    ],
})
</script>

<style scoped>
.guide-figure {
    margin: 0 0 24px;
}

.guide-figure img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #121214;
}

.guide-figure figcaption {
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.4;
    color: #9ca3af;
}
</style>
