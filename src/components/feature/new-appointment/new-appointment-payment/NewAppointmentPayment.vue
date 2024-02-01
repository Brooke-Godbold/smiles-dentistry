<template>
  <section :class="$style.newAppointmentContainer">
    <ToastNotification ref="toast">
      <p>Looks like something went wrong</p>
    </ToastNotification>
    <div :class="$style.newAppointmentForm">
      <h2 :class="$style.newAppointmentTitle">Your Appointment</h2>
      <AppointmentSummary
        cy-data="appointment-payment-summary"
        :service="newAppointmentStore.newAppointmentDetails.service"
        :date="newAppointmentStore.newAppointmentDetails.date"
        :time="newAppointmentStore.newAppointmentDetails.time"
        :staff="newAppointmentStore.newAppointmentDetails.staff"
        :first-name="newAppointmentStore.newAppointmentPatient.firstName"
        :last-name="newAppointmentStore.newAppointmentPatient.lastName"
        :phone="newAppointmentStore.newAppointmentPatient.phone"
        :price="newAppointmentStore.newAppointmentDetails.price"
      />
      <p :class="$style.noCliniciansAvailable" cy-data="appointment-payment-notification">
        Payment will be taken at the clinic on the day of your Appointment
      </p>
      <div :class="$style.newAppointmentButtonsContainer">
        <BaseButton :loading="loading" @action="previousStep" cy-data="previous-button">
          <p>Previous</p>
        </BaseButton>
        <BaseButton :loading="loading" @action="confirm" cy-data="confirm-button">
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
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'

const emit = defineEmits(['previous'])

const newAppointmentStore = useNewAppointmentStore()

const router = useRouter()

const toast = ref(null)

const previousStep = () => {
  emit('previous', 'patient', false)
}

const { loading, error, addDoc } = UseFirebaseDocs.useFirebaseDocs()

const confirm = async () => {
  const newAppointment = {
    paid: true,
    ...newAppointmentStore.newAppointmentDetails,
    ...newAppointmentStore.newAppointmentPatient
  }

  await addDoc('appointment', Date.now().toString(), newAppointment)

  if (!error.value) {
    router.push({ name: 'UserAppointments' })
    newAppointmentStore.resetAppointmentCache()
  }
}

watch(error, (isError) => {
  if (isError) toast.value.openToast()
})
</script>

<style src="../NewAppointment.styles.css" module />
