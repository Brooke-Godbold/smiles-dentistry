<template>
  <ToastNotification ref="toast">
    <p>Something went wrong</p>
  </ToastNotification>
  <LoadingSpinner v-if="loading" />
  <section v-else :class="$style.userAppointments">
    <h2>My Appointments</h2>
    <div cy-data="appointments-list" :class="$style.userAppointmentsList" v-if="data?.length > 0">
      <AppointmentItem
        v-for="appointment in data"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
    <h3 v-else cy-data="no-appointments">You don't have any Appointments</h3>
  </section>
</template>

<script setup>
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { useFirebaseStore } from '@/store/firebase'
import { ref, watch } from 'vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import AppointmentItem from '../../appointment/AppointmentItem.vue'

const firebase = useFirebaseStore()

const toast = ref(null)

const { loading, error, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()

const loadExistingAppointments = () => {
  loadMultipleDocs('appointment', [{ field: 'email', operator: '==', value: firebase.userEmail }])
}

watch(error, (isError) => {
  if (isError) toast.value.openToast()
})

loadExistingAppointments()
</script>

<style src="./UserAppointments.styles.css" module />
