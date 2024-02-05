<template>
  <LoadingSpinner v-if="loading" />
  <section v-else :class="$style.staffAppointments">
    <h2>Upcoming Appointments</h2>
    <div cy-data="appointments-list" :class="$style.staffAppointmentsList" v-if="data?.length > 0">
      <AppointmentItem
        v-for="appointment in data"
        :key="appointment.id"
        :appointment="appointment"
      />
    </div>
    <h3 v-else cy-data="no-appointments">You don't have any Upcoming Appointments</h3>
  </section>
</template>

<script setup>
import AppointmentItem from '../../appointment/AppointmentItem.vue'
import { useFirebaseStore } from '@/store/firebase'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import { watch } from 'vue'
import staffId from '@/utils/staffId'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { UseToast } from '@/hooks/useToast'

const { open } = UseToast.useToast()

const firebase = useFirebaseStore()

const { loading, error, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()

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
  if (isError) open('error', 'Something went wrong')
})

loadExistingAppointments()
</script>

<style src="./StaffAppointments.styles.css" module />
