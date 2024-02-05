<template>
  <BaseItem>
    <li :class="$style.appointmentManagementItem">
      <div :class="$style.itemCell">
        <label>Date</label>
        <BaseInput :read-only="true" v-model="getDate" />
      </div>
      <div :class="$style.itemCell">
        <label>Patient</label>
        <BaseInput :read-only="true" v-model="getPatient" />
      </div>
      <div :class="$style.itemCell">
        <label>Clinician</label>
        <BaseInput :read-only="true" v-model="getClinician" />
      </div>
      <BaseButton link="AppointmentDetail" :router-params="appointmentId">Details</BaseButton>
    </li>
  </BaseItem>
</template>

<script setup>
import BaseInput from '@/components/ui/base-input/BaseInput.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import BaseItem from '@/components/ui/base-item/BaseItem.vue'
import { computed } from 'vue'

const props = defineProps({
  clinician: String,
  date: String,
  patient: String,
  id: String
})

const getClinician = computed(() => props.clinician)
const getDate = computed(() => props.date)
const getPatient = computed(() => props.patient)

const appointmentId = computed(() => {
  return { appointmentId: props.id }
})
</script>

<style src="./AppointmentManagementItem.styles.css" module />
