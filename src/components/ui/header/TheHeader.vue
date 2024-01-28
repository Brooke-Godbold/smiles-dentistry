<template>
  <header :class="$style.header">
    <router-link :class="$style.headerHome" :to="{ name: 'Home' }">
      <v-icon name="ri-star-smile-fill" />
      <p>All Smiles Dentistry</p>
    </router-link>
    <div :class="$style.navLinksContainer">
      <HeaderNav :nav-links="services" nav-title="Services" />
      <HeaderNav :nav-links="staff" nav-title="Staff" />
    </div>
    <div v-if="firebase.authenticated" :class="$style.navLinksContainer">
      <HeaderNav :nav-links="profile" nav-title="Profile" />
      <HeaderNav
        v-if="firebase.userProfile?.role === 'admin'"
        :nav-links="admin"
        nav-title="Admin"
      />
      <BaseButton link="Appointment">
        <p>Make an Appointment</p>
      </BaseButton>
      <BaseButton @action="logout">
        <p>Logout</p>
      </BaseButton>
    </div>
    <div v-else>
      <LoginModal />
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useFirebaseStore } from '@/store/firebase'

import HeaderNav from '../header-nav/HeaderNav.vue'
import BaseButton from '../base-button/BaseButton.vue'
import LoginModal from '../../feature/authentication/login-modal/LoginModal.vue'
import staffId from '../../../utils/staffId'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useFirebaseDocs } from '@/hooks/useFirebaseDocs'

const firebase = useFirebaseStore()

const router = useRouter()

const services = ref([])
const staff = ref([])

const admin = ref([{ navRoute: 'UserManagement', name: 'User Management' }])
const profile = ref([])

watch(
  () => firebase.userProfile,
  (newProfile) => {
    if (!newProfile) return

    profile.value = [
      { navRoute: 'ProfileDetails', name: 'Profile Details' },
      { navRoute: 'UserAppointments', name: 'My Appointments' },
      firebase.userProfile.role === 'staff'
        ? { navRoute: 'StaffAppointments', name: 'Upcoming Appointments' }
        : []
    ]
  }
)

const { loadMultipleDocs, data } = useFirebaseDocs()

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

async function logout() {
  const auth = firebase.firebaseAuth
  await signOut(auth)
  router.push({ name: 'Home' })
}
</script>

<style src="./TheHeader.styles.css" module />
