<template>
    <div class="modal">
        <button class="modal__close" type="button" aria-label="Закрыть" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        </button>

        <div class="modal__header">
            <p class="modal__eyebrow">Dark Nova</p>
            <h2 class="modal__title">Код подтверждения</h2>
            <p class="modal__subtitle">Введите 6-значный код, который мы отправили на ваш email</p>
        </div>

        <div class="modal__form">
            <div class="modal__code" role="group" aria-label="Код восстановления">
                <input
                    v-for="(_, index) in codeDigits"
                    :key="index"
                    :ref="(el) => setInputRef(el, index)"
                    class="modal__code-input"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    autocomplete="one-time-code"
                    :value="codeDigits[index]"
                    @input="onDigitInput($event, index)"
                    @keydown="onDigitKeydown($event, index)"
                    @paste="onCodePaste"
                >
            </div>

            <button class="modal__submit" type="button" @click="showErrorNotification">Подтвердить код</button>
        </div>

        <p class="modal__footer">
            Не пришёл код?
            <button class="modal__link" type="button" @click="openRestorePass">
                Изменить email
            </button>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useModalStore } from '~/stores/modal'
import { useNotificationStore } from '~/stores/notification'

const storeModal = useModalStore()
const storeNotification = useNotificationStore()

const codeDigits = ref(['', '', '', '', '', ''])
const inputRefs = ref([])

function closeModal() {
    storeModal.openCloseModal(false)
}

function openRestorePass() {
    storeModal.typeActiveModal('restorePass')
    storeModal.openCloseModal(true)
}

function showErrorNotification() {
    storeNotification.setNotification({
        type: 'error',
        text: 'Неверный код подтверждения. Попробуйте ещё раз',
    })
}

function setInputRef(el, index) {
    if (el) inputRefs.value[index] = el
}

function focusInput(index) {
    const input = inputRefs.value[index]
    if (input) input.focus()
}

function onDigitInput(event, index) {
    const digit = event.target.value.replace(/\D/g, '').slice(-1)
    codeDigits.value[index] = digit
    event.target.value = digit
    if (digit && index < 5) focusInput(index + 1)
}

function onDigitKeydown(event, index) {
    if (event.key === 'Backspace' && !codeDigits.value[index] && index > 0) {
        focusInput(index - 1)
    }
}

function onCodePaste(event) {
    event.preventDefault()
    const pasted = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return

    for (let i = 0; i < 6; i++) {
        codeDigits.value[i] = pasted[i] || ''
    }

    focusInput(Math.min(pasted.length, 5))
}
</script>
