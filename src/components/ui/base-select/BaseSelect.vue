<template>
  <select :class="$style.select" v-model="selectModel">
    <option disabled value="">Please select...</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  options: Array
})

const selectModel = defineModel()
</script>

<style src="./BaseSelect.styles.css" module />
