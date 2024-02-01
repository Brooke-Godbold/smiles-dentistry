<template>
  <teleport to="body"
    ><transition name="toast" data-cy="toast-notification-container">
      <div
        v-if="open"
        :class="`${$style.baseToast} ${type === 'success' ? $style.success : $style.error}`"
        data-cy="toast-notification"
      >
        <slot></slot>
      </div> </transition
  ></teleport>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  type: String
})

let timer

const open = ref(false)

const openToast = () => {
  open.value = true

  clearTimeout(timer)

  timer = setTimeout(() => {
    open.value = false
  }, 5000)
}

defineExpose({
  openToast
})
</script>

<style src="./ToastNotification.styles.css" module />

<style scoped>
.toast-enter-from {
  transform: translateX(-50%) translateY(-10rem);
}

.toast-leave-to {
  opacity: 0;
}

.toast-enter-active {
  transition: all 0.3s ease-in;
}

.toast-leave-active {
  transition: all 0.3s ease-out;
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
