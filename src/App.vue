<template>
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
import { useFirebaseStore } from './store/firebase'

const firebase = useFirebaseStore()

firebase.connectToFirebase()
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
