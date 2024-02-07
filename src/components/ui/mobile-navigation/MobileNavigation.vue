<template>
  <div :class="$style.mobileNavigation">
    <BaseButton :loading="loading" @action="openMobileNav" data-cy="mobile-nav-button">
      <v-icon name="gi-hamburger-menu" />
    </BaseButton>
    <transition name="nav" mode="out-in">
      <div v-if="isOpen">
        <div :class="$style.overlay" />
        <div :class="$style.mobileNavigationMenu">
          <h2 :class="$style.mobileNavigationHeader">Navigation</h2>
          <ul v-if="mainNavOpen" :class="$style.mobileNavigationLinks">
            <li>
              <BaseButton @action="() => setOpenNavLinks(staffLinks)"> Staff </BaseButton>
            </li>
            <li>
              <BaseButton @action="() => setOpenNavLinks(serviceLinks)"> Services </BaseButton>
            </li>
            <li v-if="firebase.authenticated">
              <BaseButton @action="() => setOpenNavLinks(profileLinks)"> Profile </BaseButton>
            </li>
            <li v-if="adminAvailable" :class="$style.admin">
              <BaseButton @action="() => setOpenNavLinks(adminLinks)"> Admin </BaseButton>
            </li>
            <HeaderAuthActions
              :loading="loading"
              :class="$style.authActionsContainer"
              @button-pressed="closeMobileNav"
            />
            <li>
              <BaseButton @action="closeMobileNav"> Close </BaseButton>
            </li>
          </ul>
          <ul v-else :class="$style.mobileNavigationLinkList">
            <NavList
              :nav-links="openNavLinks"
              :class="$style.mobileNavigationSubLink"
              @set-is-active="closeMobileNav"
            />
            <div>
              <BaseButton
                @action="() => setMainNavOpen(true)"
                :class="$style.mobileNavigationSubLink"
              >
                Back
              </BaseButton>
            </div>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '../base-button/BaseButton.vue'
import NavList from '../nav-list/NavList.vue'
import HeaderAuthActions from '../header-auth-actions/HeaderAuthActions.vue'
import { useFirebaseStore } from '@/store/firebase'

const firebase = useFirebaseStore()

defineProps({
  loading: Boolean,
  serviceLinks: Array,
  staffLinks: Array,
  profileLinks: Array,
  adminLinks: Array,
  adminAvailable: Boolean
})

const isOpen = ref(false)
const openNavLinks = ref([])
const mainNavOpen = ref(true)

const openMobileNav = () => {
  isOpen.value = true
}

const closeMobileNav = () => {
  isOpen.value = false
}

const setOpenNavLinks = (links) => {
  openNavLinks.value = links
  setMainNavOpen(false)
}

const setMainNavOpen = (isOpen) => {
  mainNavOpen.value = isOpen
}
</script>

<style src="./MobileNavigation.styles.css" module />

<style scoped>
.nav-enter-from,
.nav-leave-to {
  opacity: 0;
}

.nav-enter-active {
  transition: all 0.3s ease-in;
}

.nav-leave-active {
  transition: all 0.3s ease-out;
}

.nav-enter-to,
.nav-leave-from {
  opacity: 1;
}
</style>
