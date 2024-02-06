<template>
  <li v-for="navLink in navLinks">
    <router-link
      v-bind="$attrs"
      :key="navLink.params"
      :to="{ name: navLink.navRoute, params: navLink.params }"
      @click="$emit('setIsActive', false)"
      >{{ navLink.name }}</router-link
    >
  </li>
</template>

<script setup>
defineEmits(['setIsActive'])

defineProps({
  navLinks: Array
})
</script>
