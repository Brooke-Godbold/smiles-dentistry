<template>
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
import { watch } from 'vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import AppointmentItem from '../../appointment/AppointmentItem.vue'
import { UseToast } from '@/hooks/useToast'

const { open } = UseToast.useToast()

const firebase = useFirebaseStore()

const { loading, error, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()

const loadExistingAppointments = () => {
  loadMultipleDocs('appointment', [{ field: 'email', operator: '==', value: firebase.userEmail }])
}

watch(error, (isError) => {
  if (isError) open('error', 'Something went wrong')
})

loadExistingAppointments()
</script>

<style src="./UserAppointments.styles.css" module />
