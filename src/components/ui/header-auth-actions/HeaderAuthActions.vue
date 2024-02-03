<template>
  <div v-if="firebase.authenticated" v-bind="$attrs">
    <BaseButton
      link="Appointment"
      data-cy="header-appointment-button"
      @action="$emit('buttonPressed')"
    >
      <p>Make an Appointment</p>
    </BaseButton>
    <BaseButton :loading="loading" @action="logout" data-cy="header-logout-button">
      <p>Logout</p>
    </BaseButton>
  </div>
  <div v-else v-bind="$attrs">
    <LoginModal />
  </div>
</template>

<script setup>
import { signOut } from 'firebase/auth'
import { useFirebaseStore } from '@/store/firebase'
import { useRouter } from 'vue-router'
import BaseButton from '../base-button/BaseButton.vue'
import LoginModal from '../../feature/authentication/login-modal/LoginModal.vue'

const emit = defineEmits(['buttonPressed'])

defineProps({
  loading: Boolean
})

const router = useRouter()

const firebase = useFirebaseStore()

async function logout() {
  const auth = firebase.firebaseAuth
  await signOut(auth)
  router.push({ name: 'Home' })
  emit('buttonPressed')
}
</script>
