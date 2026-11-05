<template>
    <footer class="footer">
        <div class="container footer__inner">
            <div class="footer__brand">
                <div class="footer__logo">
                    <img class="footer__logo-icon" :src="logoMark" alt="">
                    <span class="footer__logo-text">Dark Nova</span>
                </div>
                <p class="footer__copyright">{{ $t('footer.copyright') }}</p>
            </div>

            <div class="footer__col">
                <h4 class="footer__col-title">{{ $t('footer.directions') }}</h4>
                <nav class="footer__links">
                    <NuxtLink :to="$localePath('/regions')" class="footer__link">{{ $t('footer.regions') }}</NuxtLink>
                    <NuxtLink :to="$localePath('/directions/china')" class="footer__link">{{ $t('footer.china') }}</NuxtLink>
                    <NuxtLink :to="$localePath('/blog')" class="footer__link">{{ $t('footer.blog') }}</NuxtLink>
                </nav>
            </div>

            <div class="footer__col">
                <h4 class="footer__col-title">{{ $t('footer.contacts') }}</h4>
                <nav class="footer__links">
                    <!-- <NuxtLink to="/docs/license" class="footer__link">Лицензионное соглашение</NuxtLink>
                    <NuxtLink to="/docs/privacy" class="footer__link">Политика конфиденциальности</NuxtLink>
                    <NuxtLink to="/docs/cookies" class="footer__link">Информация о Cookies</NuxtLink> -->
                    <NuxtLink :to="$localePath('/docs/refund')" class="footer__link">{{ $t('footer.refund') }}</NuxtLink>
                    <NuxtLink :to="$localePath('/docs/no-logs')" class="footer__link">{{ $t('footer.noLogs') }}</NuxtLink>
                </nav>
            </div>

            <div class="footer__col">
                <h4 class="footer__col-title">{{ $t('footer.account') }}</h4>
                <nav class="footer__links">
                    <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer" class="footer__link">{{ $t('footer.telegramBot') }}</a>
                    <a href="https://t.me/darkNovaVpn_support" target="_blank" rel="noopener noreferrer" class="footer__link">{{ $t('footer.support') }}</a>
                    <a href="https://t.me/darkNovaVpn_support" target="_blank" rel="noopener noreferrer" class="footer__link">{{ $t('footer.partnership') }}</a>
                </nav>
            </div>
        </div>
    </footer>
</template>

<script setup>
import logoMark from '~/assets/images/logo.png'

const telegramBotLink = 'https://t.me/dark_nova_vpn_bot'
</script>
