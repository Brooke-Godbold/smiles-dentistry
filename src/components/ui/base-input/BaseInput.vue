<template>
  <div :class="$style.inputContainer" data-cy="base-input-container">
    <input
      :class="`${$style.input} ${error ? $style.error : ''}`"
      :type="type || 'text'"
      :value="value || inputModel"
      :disabled="loading || readOnly"
      v-model="inputModel"
      v-on:change="(e) => $emit('onFileUploaded', e)"
      data-cy="base-input"
    />
    <p v-if="error" :class="$style.errorMessage" data-cy="base-input-error">{{ errorMessage }}</p>
    <LoadingSpinner v-if="loading" :mini="true" data-cy="base-input-loading-spinner" />
  </div>
</template>

<script setup>
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'

defineEmits(['onFileUploaded'])

defineProps({
  loading: Boolean,
  type: String,
  error: Boolean,
  errorMessage: String,
  value: String,
  readOnly: Boolean
})

const inputModel = defineModel()
</script>

<style src="./BaseInput.styles.css" module />
