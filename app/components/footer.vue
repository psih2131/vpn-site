<template>
    <footer class="footer">
        <div class="container footer__inner">
            <div class="footer__brand">
                <div class="footer__logo">
                    <svg class="footer__logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 2L32 8V18C32 26 26 32 18 34C10 32 4 26 4 18V8L18 2Z" fill="#00D981"/>
                        <path d="M18 10L24 13V18C24 22 21 25 18 26C15 25 12 22 12 18V13L18 10Z" fill="#000"/>
                    </svg>
                    <span class="footer__logo-text">Dark Nova</span>
                </div>
                <p class="footer__copyright">© 2026 Dark Nova VPN. Все права защищены.</p>
            </div>

            <div class="footer__col">
                <h4 class="footer__col-title">Контакты</h4>
                <nav class="footer__links">
                    <!-- <NuxtLink to="/docs/license" class="footer__link">Лицензионное соглашение</NuxtLink>
                    <NuxtLink to="/docs/privacy" class="footer__link">Политика конфиденциальности</NuxtLink>
                    <NuxtLink to="/docs/cookies" class="footer__link">Информация о Cookies</NuxtLink> -->
                    <NuxtLink to="/blog" class="footer__link">Блог</NuxtLink>
                    <NuxtLink to="/docs/refund" class="footer__link">Политика возвратов</NuxtLink>
                    <NuxtLink to="/docs/no-logs" class="footer__link">Политика No-Logs</NuxtLink>
                </nav>
            </div>

            <div class="footer__col">
                <h4 class="footer__col-title">Личный кабинет</h4>
                <nav class="footer__links">
                    <a :href="telegramBotLink" target="_blank" rel="noopener noreferrer" class="footer__link">Telegram-бот</a>
                    <a href="https://t.me/darkNovaVpn_support" target="_blank" rel="noopener noreferrer" class="footer__link">Техподдержка</a>
                    <a href="https://t.me/darkNovaVpn_support" target="_blank" rel="noopener noreferrer" class="footer__link">По вопросам сотрудничества</a>
                </nav>
            </div>
        </div>
    </footer>
</template>

<script setup>
const telegramBotLink = 'https://26j8gl.s.gy/4YXGdp'
</script>
