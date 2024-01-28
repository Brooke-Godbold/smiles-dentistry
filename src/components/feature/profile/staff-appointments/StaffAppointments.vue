<template>
  <ToastNotification ref="toast">
    <p>Something went wrong</p>
  </ToastNotification>
  <LoadingSpinner v-if="loading" />
  <section v-else :class="$style.staffAppointments">
    <h2>Upcoming Appointments</h2>
    <div :class="$style.staffAppointmentsList" v-if="data?.length > 0">
      <AppointmentItem
        v-for="appointment in data"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
    <h3 v-else>You don't have any Upcoming Appointments</h3>
  </section>
</template>

<script setup>
import AppointmentItem from '../../appointment/AppointmentItem.vue'
import { useFirebaseStore } from '@/store/firebase'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { ref, watch } from 'vue'
import staffId from '@/utils/staffId'
import { useFirebaseDocs } from '@/hooks/useFirebaseDocs'

const firebase = useFirebaseStore()

const toast = ref(null)

const { loading, error, data, loadMultipleDocs } = useFirebaseDocs()

const loadExistingAppointments = () => {
  loadMultipleDocs('appointment', [
    {
      field: 'staff',
      operator: '==',
      value: staffId(firebase.userProfile.firstName, firebase.userProfile.lastName)
    },
    { field: 'date', operator: '>=', value: Date.now() }
  ])
}

watch(error, (isError) => {
  if (isError) toast.value.openToast()
})

loadExistingAppointments()
</script>

<style src="./StaffAppointments.styles.css" module />
