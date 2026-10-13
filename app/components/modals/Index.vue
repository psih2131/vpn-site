<template>
    <Transition name="modal-overlay">
        <div
            v-if="storeModal.modalActive"
            class="modal-wrapper"
            @click.self="closeModal"
        >
            <Transition name="modal-panel" mode="out-in">
                <Registration v-if="storeModal.modalType === 'registration'" key="registration" />
                <Authorization v-else-if="storeModal.modalType === 'authorization'" key="authorization" />
                <RestorePass v-else-if="storeModal.modalType === 'restorePass'" key="restorePass" />
                <RestorePassCode v-else-if="storeModal.modalType === 'restorePassCode'" key="restorePassCode" />
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
import Registration from '~/components/modals/Registration.vue'
import Authorization from '~/components/modals/Authorization.vue'
import RestorePass from '~/components/modals/RestorePass.vue'
import RestorePassCode from '~/components/modals/RestorePassCode.vue'
import { useModalStore } from '~/stores/modal'

const storeModal = useModalStore()

function closeModal() {
    storeModal.openCloseModal(false)
}
</script>
