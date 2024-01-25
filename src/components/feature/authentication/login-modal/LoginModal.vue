<template>
  <ToastNotification ref="toast" type="error">
    <p>{{ errorMessage }}</p>
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
          <BaseButton :loading="loading" @action="signup">
            <p>Sign Up</p>
          </BaseButton>
          <BaseButton :loading="loading" @action="login">
            <p>Login</p>
          </BaseButton>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '../../../ui/base-button/BaseButton.vue'
import BaseInput from '@/components/ui/base-input/BaseInput.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { useFirebaseStore } from '@/store/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const firebase = useFirebaseStore()

//test1@gmail.com
const username = ref('')
//password
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const toast = ref(null)

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

async function signup() {
  loading.value = true

  const auth = firebase.firebaseAuth
  try {
    await createUserWithEmailAndPassword(auth, username.value, password.value)
    await setDoc(doc(firebase.db, 'profile', username.value), {
      email: username.value,
      role: 'user',
      dateCreated: Date.now()
    })
  } catch (error) {
    errorMessage.value = 'Something went wrong signing in!'
    toast.value.openToast()
  } finally {
    loading.value = false
  }
}

async function login() {
  loading.value = true

  const auth = firebase.firebaseAuth
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then(() => {})
    .catch(() => {
      errorMessage.value = 'Please check your email and password!'
      toast.value.openToast()
    })
    .finally(() => {
      loading.value = false
    })
}
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
