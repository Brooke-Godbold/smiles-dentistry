<template>
  <section :class="$style.appointmentManagementSection">
    <h2>Appointment Management</h2>
    <loading-spinner v-if="loading" />
    <ul v-else :class="$style.appointmentManagement">
      <appointment-management-item
        v-for="item in data"
        :key="item.id"
        :patient="patientName(item)"
        :clinician="item.staffName"
        :date="dateString(item)"
        :id="item.id"
      />
    </ul>
  </section>
</template>

<script setup>
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import AppointmentManagementItem from '../appointment-management-item/AppointmentManagementItem.vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import { timeDictionary, timestampToDateString } from '@/utils/time'

const { loading, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()
loadMultipleDocs('appointment')

const patientName = (item) => `${item.firstName} ${item.lastName}`
const dateString = (item) =>
  `${timestampToDateString(item.date)}, ${timeDictionary.find((t) => t.value === item.time).name}`
</script>

<style src="./AppointmentManagement.styles.css" module />
