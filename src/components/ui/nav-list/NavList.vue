<template>
  <router-link
    v-for="navLink in navLinks"
    v-bind="$attrs"
    :key="navLink.params"
    :to="{ name: navLink.navRoute, params: navLink.params }"
    @click="$emit('setIsActive', false)"
    >{{ navLink.name }}</router-link
  >
</template>

<script setup>
defineEmits('setIsActive')

defineProps({
  navLinks: Array
})
</script>
