<template>
  <ToastNotification ref="toast">
    <p>Something went wrong</p>
  </ToastNotification>
  <LoadingSpinner v-if="loading" />
  <section v-else :class="$style.userAppointments">
    <h2>My Appointments</h2>
    <div :class="$style.userAppointmentsList" v-if="existingAppointments.length > 0">
      <AppointmentItem
        v-for="appointment in existingAppointments"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
    <h3 v-else>You don't have any Appointments</h3>
  </section>
</template>

<script setup>
import { collection, getDocs, query, where } from 'firebase/firestore'
import AppointmentItem from '../../appointment/AppointmentItem.vue'
import { useFirebaseStore } from '@/store/firebase'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { ref } from 'vue'

const firebase = useFirebaseStore()

const toast = ref(null)
const loading = ref(false)

const existingAppointments = ref([])

const loadExistingAppointments = async () => {
  loading.value = true

  try {
    const appointmentRef = collection(firebase.firebaseDatabase, 'appointment')
    const appointmentQuery = query(appointmentRef, where('email', '==', firebase.userEmail))
    const appointmentDocs = await getDocs(appointmentQuery)

    appointmentDocs.docs.forEach((doc) => existingAppointments.value.push(doc.data()))
  } catch (error) {
    toast.value.openToast()
  } finally {
    loading.value = false
  }
}

loadExistingAppointments()
</script>

<style src="./UserAppointments.styles.css" module />
