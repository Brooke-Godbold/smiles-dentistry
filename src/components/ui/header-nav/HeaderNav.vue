<template>
  <div @mouseenter="setIsActive(true)" @mouseleave="setIsActive(false)">
    <p :class="`${$style.headerNav} ${isActive ? $style.headerNavActive : ''}`">{{ navTitle }}</p>
    <ul
      v-if="navLinks?.length > 0"
      :class="`${$style.headerNavDropdown} ${isActive ? $style.active : $style.inactive}`"
    >
      <router-link
        v-for="navLink in navLinks"
        :class="$style.headerNavLink"
        :key="navLink.params"
        :to="{ name: navLink.navRoute, params: navLink.params }"
        @click="setIsActive(false)"
        >{{ navLink.name }}</router-link
      >
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  navLinks: Array,
  navTitle: String
})

const isActive = ref(false)

const setIsActive = (active) => {
  isActive.value = active
}
</script>

<style src="./HeaderNav.styles.css" module />
