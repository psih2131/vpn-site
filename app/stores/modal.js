import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
    const modalActive = ref(false)
    const modalType = ref(null)

    function openCloseModal(value) {
        modalActive.value = value
        if (!value) {
            modalType.value = null
        }
    }

    function typeActiveModal(value) {
        modalType.value = value
    }

    return {
        modalActive,
        modalType,
        openCloseModal,
        typeActiveModal,
    }
})
