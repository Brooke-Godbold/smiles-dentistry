<template>
  <section :class="$style.newAppointmentContainer">
    <div :class="$style.newAppointmentForm">
      <h2 :class="$style.newAppointmentTitle">New Appointment Payment</h2>
      <BaseButton @action="previousStep">
        <p>Previous</p>
      </BaseButton>
      <BaseButton @action="securePayment">
        <p>Secure Payment</p>
      </BaseButton>
    </div>
  </section>
</template>

<script setup>
import BaseButton from '@/components/ui/base-button/BaseButton.vue'

const emit = defineEmits(['previous'])

const previousStep = () => {
  emit('previous', 'patient', false)
}

const securePayment = () => {
  console.log('payment')
}
</script>

<style src="../NewAppointment.styles.css" module />
