<template>
    <div class="device-guide">
        <div class="device-guide__head">
            <button class="device-guide__back" type="button" @click="emit('back')">← К устройствам</button>
            <h2 id="device-guide-title" class="device-guide__title">Установка на iPhone</h2>
            <p class="device-guide__clients">Поддерживаемые клиенты: <span>Happ, INCY, Karing</span></p>
        </div>

        <ol class="device-guide__steps">
            <li class="device-guide__step">
                <span class="device-guide__num">1</span>
                <div>
                    <p class="device-guide__step-title">Скачайте клиент</p>
                    <p class="device-guide__step-text">Установите одно из рекомендованных приложений ниже — Happ, INCY или Karing</p>
                </div>
            </li>
            <li class="device-guide__step">
                <span class="device-guide__num">2</span>
                <div>
                    <p class="device-guide__step-title">Скопируйте ключ</p>
                    <p class="device-guide__step-text">Нажмите «Скопировать ключ» ниже или вернитесь на страницу VPN</p>
                </div>
            </li>
            <li class="device-guide__step">
                <span class="device-guide__num">3</span>
                <div>
                    <p class="device-guide__step-title">Добавьте подключение</p>
                    <p class="device-guide__step-text">В клиенте: «+» → «Импорт из буфера обмена» → вставьте ключ</p>
                </div>
            </li>
            <li class="device-guide__step">
                <span class="device-guide__num">4</span>
                <div>
                    <p class="device-guide__step-title">Подключитесь</p>
                    <p class="device-guide__step-text">В списке серверов проверьте пинг, выберите локацию с минимальной задержкой и нажмите кнопку подключения</p>
                </div>
            </li>
        </ol>

        <div class="device-guide__apps">
            <p class="device-guide__apps-label">Скачать приложение</p>
            <p class="device-guide__apps-intro">Можете найти приложение в App Store через поиск или воспользоваться ссылками ниже.</p>

            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoHapp" alt="Логотип Happ">
                    <p class="device-guide__app-name">Happ</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://apps.apple.com/kz/app/happ-proxy-utility/id6504287215" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Скачать из App Store
                    </a>
                </div>
            </article>
            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoIncy" alt="Логотип INCY">
                    <p class="device-guide__app-name">INCY</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://apps.apple.com/kz/app/incy/id6756943388" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Скачать из App Store
                    </a>
                </div>
            </article>
            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoKaring" alt="Логотип Karing">
                    <p class="device-guide__app-name">Karing</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://apps.apple.com/kz/app/karing/id6472431552" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Скачать из App Store
                    </a>
                </div>
            </article>

            <p class="device-guide__apps-note">На территории РФ эти приложения заблокированы. Чтобы найти их в поиске и скачать — смените регион в настройках App Store на Казахстан, после чего приложения станут доступны.</p>
        </div>

        <div class="device-guide__footer">
            <button class="device-guide__copy" type="button" @click="copyKey">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                Скопировать ключ
            </button>
            <button class="device-guide__dismiss" type="button" @click="closeModal">Закрыть</button>
        </div>
    </div>
</template>

<script setup>
import { useConnectKey } from '~/composables/useConnectKey'
import logoHapp from '~/assets/images/logo/happ.webp'
import logoIncy from '~/assets/images/logo/incy.png'
import logoKaring from '~/assets/images/logo/karing.jpg'

const emit = defineEmits(['back'])
const { copyKey, closeModal, loadKey } = useConnectKey()

await loadKey()
</script>
