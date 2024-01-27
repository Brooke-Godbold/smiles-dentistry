<template>
  <div :class="$style.selectContainer">
    <LoadingSpinner v-if="loading" :mini="true" />
    <select
      :class="$style.select"
      :disabled="loading"
      v-model="selectModel"
      v-on:change="$emit('onSelectChanged')"
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
  loading: Boolean
})

defineEmits(['onSelectChanged'])

const selectModel = defineModel()
</script>

<style src="./BaseSelect.styles.css" module />
