<template>
  <header :class="$style.header" data-cy="header">
    <router-link :class="$style.headerHome" :to="{ name: 'Home' }" data-cy="header-logo">
      <v-icon name="ri-star-smile-fill" />
      <p>All Smiles Dentistry</p>
    </router-link>
    <div :class="`${$style.navLinksContainer} ${$style.mobileHiddenLinks}`">
      <HeaderNav :nav-links="services" nav-title="Services" data-cy="header-services-nav" />
      <HeaderNav :nav-links="staff" nav-title="Staff" data-cy="header-staff-nav" />
    </div>
    <div
      v-if="firebase.authenticated"
      :class="`${$style.navLinksContainer} ${$style.mobileHiddenLinks}`"
    >
      <HeaderNav :nav-links="profile" nav-title="Profile" data-cy="header-profile-nav-links" />
      <HeaderNav
        v-if="firebase.userProfile?.role === 'admin'"
        :nav-links="admin"
        nav-title="Admin"
        data-cy="header-admin-nav-links"
      />
    </div>
    <HeaderAuthActions :loading="loading" :class="$style.navLinksContainer" />
    <MobileNavigation
      :loading="loading"
      :profile-links="profile"
      :service-links="services"
      :staff-links="staff"
      :admin-links="admin"
    />
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useFirebaseStore } from '@/store/firebase'

import HeaderNav from '../header-nav/HeaderNav.vue'
import MobileNavigation from '../mobile-navigation/MobileNavigation.vue'
import HeaderAuthActions from '../header-auth-actions/HeaderAuthActions.vue'
import staffId from '../../../utils/staffId'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'

const firebase = useFirebaseStore()

const services = ref([])
const staff = ref([])

const admin = ref([{ navRoute: 'UserManagement', name: 'User Management' }])
const profile = ref([])

watch(
  () => firebase.userProfile,
  (newProfile) => {
    if (!newProfile) return

    populateUserProfileNav()
  }
)

const populateUserProfileNav = () => {
  if (!firebase.userProfile) return

  profile.value = [
    { navRoute: 'ProfileDetails', name: 'Profile Details' },
    { navRoute: 'UserAppointments', name: 'My Appointments' },
    ...(firebase.userProfile.role === 'staff'
      ? [{ navRoute: 'StaffAppointments', name: 'Upcoming Appointments' }]
      : [])
  ]
}

populateUserProfileNav()

const { loading, loadMultipleDocs, data } = UseFirebaseDocs.useFirebaseDocs()

async function populateHeader() {
  await loadMultipleDocs('service')
  data.value.forEach((doc) =>
    services.value.push({
      navRoute: 'Service',
      name: doc.title,
      params: { serviceId: doc.id }
    })
  )

  await loadMultipleDocs('profile', [{ field: 'role', operator: '==', value: 'staff' }])
  data.value.forEach((staffMember) =>
    staff.value.push({
      navRoute: 'Staff',
      name: `${staffMember.firstName} ${staffMember.lastName}`,
      params: { staffId: staffId(staffMember.firstName, staffMember.lastName) }
    })
  )
}

populateHeader()
</script>

<style src="./TheHeader.styles.css" module />
