<template>
  <ToastNotification ref="toast" type="error">
    <p>Something went wrong signing in!</p>
  </ToastNotification>
  <BaseButton button-text="Login" :loading="firebase.initializing" @action="open">
    <p>Login</p>
  </BaseButton>
  <teleport to="body">
    <div v-if="isOpen" :class="$style.overlay" />
    <transition name="modal">
      <div v-if="isOpen" :class="$style.modal">
        <h3 :class="$style.loginTitle">Login</h3>
        <div :class="$style.loginModalRow">
          <label>Username</label>
          <BaseInput type="email" v-model="username" />
        </div>
        <div :class="$style.loginModalRow">
          <label>Password</label>
          <BaseInput type="password" v-model="password" />
        </div>
        <div :class="$style.buttonContainer">
          <BaseButton :loading="loading" @action="close">
            <p>Close</p>
          </BaseButton>
          <BaseButton :loading="loading" @action="signupUser">
            <p>Sign Up</p>
          </BaseButton>
          <BaseButton :loading="loading" @action="loginUser">
            <p>Login</p>
          </BaseButton>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseButton from '../../../ui/base-button/BaseButton.vue'
import BaseInput from '@/components/ui/base-input/BaseInput.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { useFirebaseStore } from '@/store/firebase'
import { useFirebaseDocs } from '@/hooks/useFirebaseDocs'

const firebase = useFirebaseStore()

//test1@gmail.com
const username = ref('')
//password
const password = ref('')

const toast = ref(null)

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const { loading, error, login, signup, addDoc } = useFirebaseDocs()

async function signupUser() {
  await signup(username.value, password.value)

  if (error.value) return

  const profile = {
    email: username.value,
    role: 'user',
    dateCreated: Date.now()
  }
  addDoc('profile', username.value, profile)
}

async function loginUser() {
  login(username.value, password.value)
}

watch(error, (isError) => {
  if (isError) toast.value.openToast()
})
</script>

<style src="./LoginModal.styles.css" module />

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(75%);
}

.modal-enter-active {
  transition: all 0.3s ease-in;
}

.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateX(-50%) scale(100%);
}
</style>
