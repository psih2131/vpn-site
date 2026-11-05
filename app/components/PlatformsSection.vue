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

const { t } = useI18n()

const platforms = computed(() => [
    {
        icon: 'android',
        image: iconAndroid,
        title: t('platforms.androidTitle'),
        text: t('platforms.androidText'),
        to: 'https://darknovavpn.com/blog/kak-podklyuchit-vpn-na-android-poshagovaya-instruktsiya',
    },
    {
        icon: 'apple',
        image: iconApple,
        title: t('platforms.appleTitle'),
        text: t('platforms.appleText'),
        to: 'https://darknovavpn.com/blog/kak-nastroit-vpn-happ-na-iphone',
    },
    {
        icon: 'windows',
        image: iconWindows,
        title: t('platforms.windowsTitle'),
        text: t('platforms.windowsText'),
        to: 'https://darknovavpn.com/blog/kak-nastroit-vpn-happ-na-windows',
    },
    {
        icon: 'finder',
        image: iconFinder,
        title: t('platforms.macTitle'),
        text: t('platforms.macText'),
        to: 'https://darknovavpn.com/blog/kak-ustanovit-vpn-na-makbuk-nastroyka-na-macos-s-nulya',
    },
    {
        icon: 'linux',
        image: iconLinux,
        title: t('platforms.linuxTitle'),
        text: t('platforms.linuxText'),
    },
    {
        icon: 'androidtv',
        image: iconAndroidTv,
        wide: true,
        title: t('platforms.tvTitle'),
        text: t('platforms.tvText'),
        to: 'https://darknovavpn.com/blog/kak-skachat-vpn-na-smart-tv-samsung-lg-sony',
    },
])
</script>
