<template>
  <main :class="`${$style.page} ${$style.center}`">
    <BaseItem>
      <transition
        :enter-from-class="forward ? 'appointment-left' : 'appointment-right'"
        :leave-to-class="forward ? 'appointment-right' : 'appointment-left'"
        name="appointment"
        mode="out-in"
      >
        <NewAppointmentDetails v-if="currentStep === 'details'" @next="nextStep" />
        <NewAppointmentPatient
          v-else-if="currentStep === 'patient'"
          @previous="nextStep"
          @next="nextStep"
        />
        <NewAppointmentPayment v-else @previous="nextStep" />
      </transition>
    </BaseItem>
  </main>
</template>

<script setup>
import BaseItem from '@/components/ui/base-item/BaseItem.vue'
import NewAppointmentDetails from '../../feature/new-appointment/new-appointment-details/NewAppointmentDetails.vue'
import NewAppointmentPatient from '../../feature/new-appointment/new-appointment-patient/NewAppointmentPatient.vue'
import NewAppointmentPayment from '../../feature/new-appointment/new-appointment-payment/NewAppointmentPayment.vue'
import { ref } from 'vue'

const currentStep = ref('details')
const forward = ref(true)

const nextStep = (stepName, goForward) => {
  forward.value = goForward
  currentStep.value = stepName
}
</script>

<style src="../../../styles/Page.styles.css" module />

<style scoped>
.appointment-left {
  opacity: 0;
  transform: translateX(-25rem);
}

.appointment-right {
  opacity: 0;
  transform: translateX(25rem);
}

.appointment-enter-active {
  transition: all 0.3s ease-in;
}

.appointment-leave-active {
  transition: all 0.3s ease-out;
}

.appointment-enter-to,
.appointment-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
