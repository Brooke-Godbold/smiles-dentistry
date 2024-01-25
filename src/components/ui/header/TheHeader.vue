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
import { ref } from 'vue'

import { useFirebaseStore } from '@/store/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

import HeaderNav from '../header-nav/HeaderNav.vue'
import BaseButton from '../base-button/BaseButton.vue'
import LoginModal from '../../feature/authentication/login-modal/LoginModal.vue'
import staffId from '../../../utils/staffId'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const firebase = useFirebaseStore()

const router = useRouter()

const services = ref([])
const staff = ref([])

const admin = ref([{ navRoute: 'UserManagement', name: 'User Management' }])
const profile = ref([{ navRoute: 'ProfileDetails', name: 'Profile Details' }])

async function getServices() {
  const docs = await getDocs(collection(firebase.firebaseDatabase, 'service'))
  docs.forEach((doc) =>
    services.value.push({
      navRoute: 'Service',
      name: doc.data().title,
      params: { serviceId: doc.id }
    })
  )
}

async function getStaff() {
  const staffRef = collection(firebase.db, 'profile')
  const staffQuery = query(staffRef, where('role', '==', 'staff'))
  const staffDocs = await getDocs(staffQuery)
  staffDocs.forEach((staffMember) =>
    staff.value.push({
      navRoute: 'Staff',
      name: `${staffMember.data().firstName} ${staffMember.data().lastName}`,
      params: { staffId: staffId(staffMember.data().firstName, staffMember.data().lastName) }
    })
  )
}

getServices()

getStaff()

async function logout() {
  const auth = firebase.firebaseAuth
  await signOut(auth)
  router.push({ name: 'Home' })
}
</script>

<style src="./TheHeader.styles.css" module />
