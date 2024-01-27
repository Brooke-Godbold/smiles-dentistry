<template>
  <section :class="$style.appointmentSummary">
    <div :class="$style.appointmentFormRow">
      <label>Your Service</label>
      <p :class="$style.appointmentInfoText">
        {{ `${service.charAt(0).toUpperCase()}${service.slice(1)}` }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Your Date</label>
      <p :class="$style.appointmentInfoText">
        {{ `${timestampToDateString(date)} at ${timeAsString(time)}` }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Your Clinician</label>
      <p :class="$style.appointmentInfoText">
        {{ staff }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Name</label>
      <p :class="$style.appointmentInfoText">
        {{ `${firstName} ${lastName}` }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Contact Number</label>
      <p :class="$style.appointmentInfoText">
        {{ phone }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { timeAsString, timestampToDateString } from '@/utils/time'

defineProps({
  service: String,
  date: Number,
  time: Number,
  staff: String,
  firstName: String,
  lastName: String,
  phone: String
})
</script>

<style src="./AppointmentSummary.styles.css" module />
