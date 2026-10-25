<template>
    <section id="platforms" class="platforms">
        <div class="container">
            <h2 class="section-title platforms__title">{{ title }}</h2>
            <p class="platforms__subtitle">{{ subtitle }}</p>

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
</template>

<script setup>
import iconAndroid from '~/assets/images/icon-android.png'
import iconApple from '~/assets/images/icon-apple.png'
import iconWindows from '~/assets/images/icon-windows.png'
import iconLinux from '~/assets/images/icon-linux.png'
import iconFinder from '~/assets/images/icon-finder.png'
import iconAndroidTv from '~/assets/images/icon-android-tv.png'

defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
})

const platforms = [
    {
        icon: 'android',
        image: iconAndroid,
        title: 'VPN для Android',
        text: 'Смартфоны и планшеты на Android. Happ и INCY есть в Google Play, оба поддерживают VLESS Reality и Hysteria2 и подключаются в одно касание.',
        to: 'https://darknovavpn.com/blog/kak-podklyuchit-vpn-na-android-poshagovaya-instruktsiya',
    },
    {
        icon: 'apple',
        image: iconApple,
        title: 'VPN для iPhone и iPad',
        text: 'INCY скачивается из российского App Store без смены региона Apple ID. Подключение стартует вместе с системой и держится на любых операторах и Wi-Fi.',
        to: 'https://darknovavpn.com/blog/kak-nastroit-vpn-happ-na-iphone',
    },
    {
        icon: 'windows',
        image: iconWindows,
        title: 'VPN для Windows',
        text: 'Клиент для Windows 10 и 11 защищает весь трафик на компьютере и ноутбуке: браузер, игры и приложения работают через выбранный сервер.',
        to: 'https://darknovavpn.com/blog/kak-nastroit-vpn-happ-na-windows',
    },
    {
        icon: 'finder',
        image: iconFinder,
        title: 'VPN для macOS',
        text: 'Приложение для Mac на чипах Apple Silicon и Intel. Не нагружает систему и удерживает защищённое соединение в фоновом режиме.',
        to: 'https://darknovavpn.com/blog/kak-ustanovit-vpn-na-makbuk-nastroyka-na-macos-s-nulya',
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
        to: 'https://darknovavpn.com/blog/kak-skachat-vpn-na-smart-tv-samsung-lg-sony',
    },
]
</script>
