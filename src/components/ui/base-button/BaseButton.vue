<template>
  <router-link
    v-if="link"
    :to="{ name: link }"
    :class="`${$style.baseButton} ${alt ? $style.alt : ''}`"
  >
    <slot></slot>
  </router-link>
  <button
    v-else
    :type="type || 'button'"
    :disabled="loading"
    :class="$style.baseButton"
    @click="$emit('action')"
  >
    <LoadingSpinner v-if="loading" :mini="true" />
    <slot></slot>
  </button>
</template>

<script setup>
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'

defineProps({
  link: String,
  action: Function,
  loading: Boolean,
  type: String,
  alt: Boolean
})
</script>

<style src="./BaseButton.styles.css" module />
