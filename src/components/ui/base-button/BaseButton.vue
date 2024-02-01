<template>
  <router-link
    v-if="link"
    :to="{ name: link }"
    :class="`${$style.baseButton} ${alt ? $style.alt : ''}`"
    data-cy="base-button-link"
  >
    <slot></slot>
  </router-link>
  <button
    v-else
    :type="type || 'button'"
    :disabled="loading"
    :class="$style.baseButton"
    @click="$emit('action')"
    data-cy="base-button-action"
  >
    <LoadingSpinner v-if="loading" :mini="true" data-cy="base-button-loading-spinner" />
    <slot></slot>
  </button>
</template>

<script setup>
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'

defineEmits(['action'])

defineProps({
  link: String,
  loading: Boolean,
  type: String,
  alt: Boolean
})
</script>

<style src="./BaseButton.styles.css" module />
