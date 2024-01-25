<template>
  <div :class="$style.inputContainer">
    <input
      :class="`${$style.input} ${error ? $style.error : ''}`"
      :type="type || 'text'"
      :disabled="loading"
      :value="value || inputModel"
      v-model="inputModel"
      v-on:change="(e) => $emit('onFileUploaded', e)"
    />
    <p v-if="error" :class="$style.errorMessage">{{ errorMessage }}</p>
    <LoadingSpinner v-if="loading" :mini="true" />
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
  value: String
})

const inputModel = defineModel()
</script>

<style src="./BaseInput.styles.css" module />
