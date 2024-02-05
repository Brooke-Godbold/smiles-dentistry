<template>
  <ToastNotification :type="type" ref="toast">
    {{ message }}
  </ToastNotification>
  <div :class="$style.appContainer">
    <TheHeader />
    <div :class="$style.appContent">
      <router-view v-slot="{ Component, route }">
        <transition name="route" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
      <TheFooter />
    </div>
  </div>
</template>

<script setup>
import TheHeader from './components/ui/header/TheHeader.vue'
import TheFooter from './components/ui/footer/TheFooter.vue'
import ToastNotification from './components/ui/toast-notification/ToastNotification.vue'
import { useFirebaseStore } from './store/firebase'
import { UseToast } from './hooks/useToast'

const firebase = useFirebaseStore()
firebase.connectToFirebase()

const { toast, type, message } = UseToast.useToast()
</script>

<style src="./App.styles.css" module />

<style scoped>
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active {
  transition: all 0.3s ease-in;
}

.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>
