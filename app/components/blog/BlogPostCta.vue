<template>
    <section class="blog-post-cta">
        <div class="blog-post-cta__inner">
            <h2 class="blog-post-cta__title">Подключи VPN за пару минут</h2>
            <p class="blog-post-cta__text">
                Получи ключ для Happ и INCY в Telegram — 3 дня бесплатно, без карт и сложных настроек.
            </p>
            <a
                :href="telegramBotLink"
                target="_blank"
                rel="noopener noreferrer"
                class="blog-post-cta__btn"
            >
                Подключить бесплатно
                <svg class="blog-post-cta__btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
            </a>
        </div>
    </section>
</template>

<script setup>
const telegramBotLink = 'https://26j8gl.s.gy/4YXGdp'
</script>
