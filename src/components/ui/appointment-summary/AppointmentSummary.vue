<template>
  <section :class="$style.appointmentSummary" data-cy="appointment-summary">
    <div :class="$style.appointmentFormRow">
      <label>Your Service</label>
      <p :class="$style.appointmentInfoText" data-cy="service">
        {{ `${service.charAt(0).toUpperCase()}${service.slice(1)}` }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Your Price</label>
      <p :class="$style.appointmentInfoText" data-cy="price">
        {{ `£${price}` }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Your Date</label>
      <p :class="$style.appointmentInfoText" data-cy="date">
        {{ `${timestampToDateString(date)} at ${timeAsString(time)}` }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Your Clinician</label>
      <p :class="$style.appointmentInfoText" data-cy="clinician">
        {{ staff }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Your Name</label>
      <p :class="$style.appointmentInfoText" data-cy="name">
        {{ `${firstName} ${lastName}` }}
      </p>
    </div>
    <div :class="$style.appointmentFormRow">
      <label>Your Contact Number</label>
      <p :class="$style.appointmentInfoText" data-cy="phone">
        {{ phone }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { timeAsString, timestampToDateString } from '@/utils/time'

defineProps({
  service: String,
  price: Number,
  date: Number,
  time: Number,
  staff: String,
  firstName: String,
  lastName: String,
  phone: String,
  readOnly: Boolean
})
</script>

<style src="./AppointmentSummary.styles.css" module />
