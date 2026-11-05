<template>
    <div class="device-guide">
        <div class="device-guide__head">
            <button class="device-guide__back" type="button" @click="emit('back')">{{ $t('cabinet.guide.back') }}</button>
            <h2 id="device-guide-title" class="device-guide__title">{{ $t('cabinet.guide.install', { device: 'Windows' }) }}</h2>
            <p class="device-guide__clients">{{ $t('cabinet.guide.clients') }} <span>Happ, INCY, Karing</span></p>
        </div>

        <ol class="device-guide__steps">
            <li class="device-guide__step">
                <span class="device-guide__num">1</span>
                <div>
                    <p class="device-guide__step-title">{{ $t('cabinet.guide.downloadClient') }}</p>
                    <p class="device-guide__step-text">{{ $t('cabinet.guide.downloadClientText') }}</p>
                </div>
            </li>
            <li class="device-guide__step">
                <span class="device-guide__num">2</span>
                <div>
                    <p class="device-guide__step-title">{{ $t('cabinet.guide.copyKey') }}</p>
                    <p class="device-guide__step-text">{{ $t('cabinet.guide.copyKeyText') }}</p>
                </div>
            </li>
            <li class="device-guide__step">
                <span class="device-guide__num">3</span>
                <div>
                    <p class="device-guide__step-title">{{ $t('cabinet.guide.add') }}</p>
                    <p class="device-guide__step-text">{{ $t('cabinet.guide.addText') }}</p>
                </div>
            </li>
            <li class="device-guide__step">
                <span class="device-guide__num">4</span>
                <div>
                    <p class="device-guide__step-title">{{ $t('cabinet.guide.connect') }}</p>
                    <p class="device-guide__step-text">{{ $t('cabinet.guide.connectText') }}</p>
                </div>
            </li>
        </ol>

        <div class="device-guide__apps">
            <p class="device-guide__apps-label">{{ $t('cabinet.guide.apps') }}</p>
            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoHapp" :alt="$t('cabinet.guide.logo', { name: 'Happ' })">
                    <p class="device-guide__app-name">Happ</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://www.happ.su/main/ru" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        .exe
                    </a>
                    <a class="device-guide__site" href="https://www.happ.su/main/ru" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M2 12h20" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                        {{ $t('cabinet.guide.openSite') }}
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M7 7h10v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 17 17 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            </article>
            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoIncy" :alt="$t('cabinet.guide.logo', { name: 'INCY' })">
                    <p class="device-guide__app-name">INCY</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://incy.cc" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        .exe
                    </a>
                    <a class="device-guide__site" href="https://incy.cc" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M2 12h20" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                        {{ $t('cabinet.guide.openSite') }}
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M7 7h10v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 17 17 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            </article>
            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoKaring" :alt="$t('cabinet.guide.logo', { name: 'Karing' })">
                    <p class="device-guide__app-name">Karing</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://karing.app/download" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        .exe
                    </a>
                    <a class="device-guide__site" href="https://karing.app" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M2 12h20" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                        {{ $t('cabinet.guide.openSite') }}
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M7 7h10v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 17 17 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            </article>
        </div>

        <div class="device-guide__footer">
            <button class="device-guide__copy" type="button" @click="copyKey">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                {{ $t('cabinet.key.copy') }}
            </button>
            <button class="device-guide__dismiss" type="button" @click="closeModal">{{ $t('cabinet.nav.close') }}</button>
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
