<template>
  <div :class="$style.textareaContainer">
    <textarea
      :class="`${$style.textarea} ${error ? $style.error : ''}`"
      :disabled="loading"
      v-model="textareaModel"
    />
    <p v-if="error" :class="$style.errorMessage">{{ errorMessage }}</p>
    <LoadingSpinner v-if="loading" :mini="true" />
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
