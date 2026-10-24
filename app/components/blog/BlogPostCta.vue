<template>
    <section class="blog-post-cta">
        <div class="blog-post-cta__inner">
            <h2 class="blog-post-cta__title">Подключи VPN за пару минут</h2>
            <p class="blog-post-cta__text">
                Получи ключ для Happ и INCY — 3 дня бесплатно, без карт и сложных настроек.
            </p>
            <button
                type="button"
                class="blog-post-cta__btn"
                @click="openRegistration"
            >
                Подключить бесплатно
                <svg class="blog-post-cta__btn-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
            </button>
        </div>
    </section>
</template>

<script setup>
import { useModalStore } from '~/stores/modal'

const storeModal = useModalStore()
const { trackEvent } = useGtag()

function openRegistration() {
    trackEvent('click_cta', { button_name: 'blog_post_cta' })
    storeModal.typeActiveModal('registration')
    storeModal.openCloseModal(true)
}
</script>
