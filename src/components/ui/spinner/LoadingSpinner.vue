<template>
  <div :class="$style.spinner" :style="mini ? { width: '3.2rem' } : {}" data-cy="loading-spinner" />
</template>

<script setup>
defineProps({
  mini: Boolean
})
</script>

<style src="./LoadingSpinner.styles.css" module />
