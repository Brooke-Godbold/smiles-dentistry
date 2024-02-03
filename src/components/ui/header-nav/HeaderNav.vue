<template>
  <div @mouseenter="setIsActive(true)" @mouseleave="setIsActive(false)">
    <p
      :class="`${$style.headerNav} ${isActive ? $style.headerNavActive : ''}`"
      data-cy="header-nav-title"
    >
      {{ navTitle }}
    </p>
    <ul
      v-if="navLinks?.length > 0"
      :class="`${$style.headerNavDropdown} ${isActive ? $style.active : $style.inactive}`"
      data-cy="header-nav-links"
    >
      <NavList :nav-links="navLinks" :class="$style.headerNavLink" @set-is-active="setIsActive" />
    </ul>
  </div>
</template>

<script setup>
import NavList from '../nav-list/NavList.vue'
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
