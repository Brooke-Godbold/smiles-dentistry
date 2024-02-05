<template>
  <div :class="$style.selectContainer" data-cy="base-select-container">
    <LoadingSpinner v-if="loading" :mini="true" data-cy="base-select-loading-spinner" />
    <select
      :class="$style.select"
      :disabled="loading || readOnly"
      v-model="selectModel"
      v-on:change="$emit('onSelectChanged')"
      data-cy="base-select"
    >
      <option disabled value="">Please select...</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import LoadingSpinner from '../spinner/LoadingSpinner.vue'

defineProps({
  options: Array,
  loading: Boolean,
  readOnly: Boolean
})

defineEmits(['onSelectChanged'])

const selectModel = defineModel()
</script>

<style src="./BaseSelect.styles.css" module />
