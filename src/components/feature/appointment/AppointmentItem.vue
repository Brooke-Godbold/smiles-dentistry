<template>
  <li :class="$style.appointmentItemListItem">
    <BaseItem>
      <div :class="$style.appointmentItem">
        <AppointmentSummary
          :service="appointment.service"
          :date="appointment.date"
          :time="appointment.time"
          :staff="appointment.staffName"
          :first-name="appointment.firstName"
          :last-name="appointment.lastName"
          :phone="appointment.phone"
          :price="appointment.price"
          :read-only="true"
        />
      </div>
    </BaseItem>
  </li>
</template>

<script setup>
import BaseItem from '@/components/ui/base-item/BaseItem.vue'
import AppointmentSummary from '@/components/ui/appointment-summary/AppointmentSummary.vue'

defineProps({
  appointment: Object
})
</script>

<style src="./AppointmentItem.style.css" module />
