<template>
  <BaseItem>
    <LoadingSpinner v-if="loading" />
    <div v-if="staffData" :class="$style.staffContainer">
      <img :src="staffData.profileImage" :class="$style.staffImage" />
      <div :class="$style.staffImageGradient" />
      <div :class="$style.staffInformation">
        <h1 :class="$style.staffName">{{ `${staffData.firstName} ${staffData.lastName}` }}</h1>
        <h2>{{ staffData.qualification }}</h2>
        <div :class="$style.servicesContainer">
          <span v-for="service in staffData.services" :key="service" :class="$style.serviceTag">
            {{ `${service.charAt(0).toUpperCase()}${service.slice(1)}s` }}
          </span>
        </div>
        <p :class="$style.staffText">{{ staffData.bio }}</p>
      </div>
    </div>
  </BaseItem>
</template>

<script setup>
import { useFirebaseStore } from '@/store/firebase'
import BaseItem from '../../ui/base-item/BaseItem.vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import { useRoute } from 'vue-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ref } from 'vue'
import getStaffId from '@/utils/staffId'

const firebase = useFirebaseStore()

const route = useRoute()

const loading = ref(false)
const staffData = ref(null)

async function getStaffData(staffId) {
  loading.value = true

  try {
    const staffRef = collection(firebase.db, 'profile')
    const staffQuery = query(staffRef, where('role', '==', 'staff'))
    const staffDocs = await getDocs(staffQuery)
    const staffDoc = staffDocs?.docs.find(
      (doc) => staffId === getStaffId(doc.data().firstName, doc.data().lastName)
    )

    staffData.value = staffDoc.data()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }

  console.log(staffData.value)
}

getStaffData(route.params.staffId)
</script>

<style src="./StaffItem.styles.css" module />
