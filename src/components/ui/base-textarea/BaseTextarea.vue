<template>
  <div :class="$style.textareaContainer" data-cy="base-textarea-container">
    <textarea
      :class="`${$style.textarea} ${error ? $style.error : ''}`"
      :disabled="loading"
      v-model="textareaModel"
      data-cy="base-textarea"
    />
    <p v-if="error" :class="$style.errorMessage" data-cy="base-textarea-error">
      {{ errorMessage }}
    </p>
    <LoadingSpinner v-if="loading" :mini="true" data-cy="base-textarea-loading-spinner" />
  </div>
</template>

<script setup>
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'

defineProps({
  loading: Boolean,
  error: Boolean,
  errorMessage: String
})

const textareaModel = defineModel()
</script>

<style src="./BaseTextarea.styles.css" module />
