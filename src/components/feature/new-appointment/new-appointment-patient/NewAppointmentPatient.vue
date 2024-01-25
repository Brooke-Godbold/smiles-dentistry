<template>
  <section :class="$style.newAppointmentContainer">
    <div :class="$style.newAppointmentForm">
      <h2 :class="$style.newAppointmentTitle">Patient Details</h2>
      <div :class="$style.newAppointmentFormRow">
        <label>First Name</label>
        <BaseInput v-model="firstName" />
      </div>
      <BaseButton @action="updatePatientDetails">
        <p>Next</p>
      </BaseButton>
      <BaseButton @action="previousStep">
        <p>Previous</p>
      </BaseButton>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '../../../ui/base-input/BaseInput.vue'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'

const emit = defineEmits(['previous', 'next'])

const newAppointmentStore = useNewAppointmentStore()
const newAppointmentPatient = newAppointmentStore.newAppointmentPatient

const firstName = ref(newAppointmentPatient.firstName)

const updatePatientDetails = () => {
  console.log('updated: ', firstName.value)

  newAppointmentStore.updateAppointmentPatient(firstName.value)

  emit('next', 'payment', true)
}

const previousStep = () => {
  emit('previous', 'details', false)
}
</script>

<style src="../NewAppointment.styles.css" module />
