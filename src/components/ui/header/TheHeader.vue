<template>
  <header :class="$style.header">
    <router-link :class="$style.headerHome" :to="{ name: 'Home' }">
      <v-icon name="ri-star-smile-fill" />
      <p>All Smiles Dentistry</p>
    </router-link>
    <div :class="$style.navLinksContainer">
      <HeaderNav :nav-links="services" nav-title="Services" nav-route="Service" />
      <HeaderNav :nav-links="staff" nav-title="Staff" nav-route="Staff" />
    </div>
    <AppointmentButton />
  </header>
</template>

<script setup>
import { ref } from 'vue'

import { useFirebaseStore } from '@/store/firebase'
import { collection, getDocs } from 'firebase/firestore'

import HeaderNav from '../header-nav/HeaderNav.vue'
import AppointmentButton from '../appointment-button/AppointmentButton.vue'

const firebase = useFirebaseStore()

const services = ref([])
const staff = ref([])

async function getServices() {
  const docs = await getDocs(collection(firebase.firebaseDatabase, 'service'))
  docs.forEach((doc) => services.value.push({ route: doc.id, name: doc.data().title }))
}

getServices()
</script>

<style src="./TheHeader.styles.css" module />
