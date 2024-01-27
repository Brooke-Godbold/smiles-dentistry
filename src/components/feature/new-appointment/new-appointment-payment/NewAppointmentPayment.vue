<template>
  <section :class="$style.newAppointmentContainer">
    <ToastNotification ref="toast">
      <p>Looks like something went wrong</p>
    </ToastNotification>
    <div :class="$style.newAppointmentForm">
      <h2 :class="$style.newAppointmentTitle">Your Appointment</h2>
      <AppointmentSummary
        :service="newAppointmentStore.newAppointmentDetails.service"
        :date="newAppointmentStore.newAppointmentDetails.date"
        :time="newAppointmentStore.newAppointmentDetails.time"
        :staff="newAppointmentStore.newAppointmentDetails.staff"
        :first-name="newAppointmentStore.newAppointmentPatient.firstName"
        :last-name="newAppointmentStore.newAppointmentPatient.lastName"
        :phone="newAppointmentStore.newAppointmentPatient.phone"
      />
      <div :class="$style.newAppointmentButtonsContainer">
        <BaseButton :loading="loading" @action="previousStep">
          <p>Previous</p>
        </BaseButton>
        <BaseButton :loading="loading" @action="confirm">
          <p>Confirm Appointment</p>
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import AppointmentSummary from '@/components/ui/appointment-summary/AppointmentSummary.vue'
import { useFirebaseStore } from '@/store/firebase'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import { doc, setDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['previous'])

const firebase = useFirebaseStore()
const newAppointmentStore = useNewAppointmentStore()

const router = useRouter()

const toast = ref(null)
const loading = ref(false)

const previousStep = () => {
  emit('previous', 'patient', false)
}

const confirm = async () => {
  loading.value = true

  try {
    const appointmentRef = doc(firebase.db, 'appointment', Date.now().toString())
    await setDoc(appointmentRef, {
      paid: true,
      ...newAppointmentStore.newAppointmentDetails,
      ...newAppointmentStore.newAppointmentPatient
    })
    loading.value = false
    router.push({ name: 'UserAppointments' })
    newAppointmentStore.resetAppointmentCache()
  } catch (error) {
    loading.value = false
    toast.value.openToast()
  }
}
</script>

<style src="../NewAppointment.styles.css" module />
