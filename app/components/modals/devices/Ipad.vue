<template>
    <div class="device-guide">
        <div class="device-guide__head">
            <button class="device-guide__back" type="button" @click="emit('back')">{{ $t('cabinet.guide.back') }}</button>
            <h2 id="device-guide-title" class="device-guide__title">{{ $t('cabinet.guide.install', { device: 'iPad' }) }}</h2>
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
            <p class="device-guide__apps-intro">{{ $t('cabinet.guide.storeIntro') }}</p>

            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoHapp" :alt="$t('cabinet.guide.logo', { name: 'Happ' })">
                    <p class="device-guide__app-name">Happ</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://apps.apple.com/kz/app/happ-proxy-utility/id6504287215" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ $t('cabinet.guide.storeDownload') }}
                    </a>
                </div>
            </article>
            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoIncy" :alt="$t('cabinet.guide.logo', { name: 'INCY' })">
                    <p class="device-guide__app-name">INCY</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://apps.apple.com/kz/app/incy/id6756943388" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ $t('cabinet.guide.storeDownload') }}
                    </a>
                </div>
            </article>
            <article class="device-guide__app">
                <div class="device-guide__app-head">
                    <img class="device-guide__logo" :src="logoKaring" :alt="$t('cabinet.guide.logo', { name: 'Karing' })">
                    <p class="device-guide__app-name">Karing</p>
                </div>
                <div class="device-guide__app-actions">
                    <a class="device-guide__download" href="https://apps.apple.com/kz/app/karing/id6472431552" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 15V3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ $t('cabinet.guide.storeDownload') }}
                    </a>
                </div>
            </article>

            <p class="device-guide__apps-note">{{ $t('cabinet.guide.storeNote') }}</p>
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
