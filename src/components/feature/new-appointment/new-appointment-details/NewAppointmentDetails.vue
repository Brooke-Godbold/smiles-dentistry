<template>
  <section :class="$style.newAppointmentContainer">
    <div :class="$style.newAppointmentForm">
      <h2 :class="$style.newAppointmentTitle">New Appointment Details</h2>
      <div :class="$style.newAppointmentFormRow">
        <label>Your Service</label>
        <BaseSelect :options="services" v-model="service" />
      </div>
      <BaseButton @action="updateAppointmentDetails">
        <p>Next</p>
      </BaseButton>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseSelect from '../../../ui/base-select/BaseSelect.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'

const emit = defineEmits(['next'])

const newAppointmentStore = useNewAppointmentStore()
const newAppointmentDetails = newAppointmentStore.newAppointmentDetails

const services = ref([
  { name: 'Check Up', value: 'checkup' },
  { name: 'Extraction', value: 'extraction' }
])

const service = ref(newAppointmentDetails.service)

const updateAppointmentDetails = () => {
  console.log('updated: ', service.value)

  newAppointmentStore.updateAppointmentDetails(service.value)

  emit('next', 'patient', true)
}
</script>

<style src="../NewAppointment.styles.css" module />
