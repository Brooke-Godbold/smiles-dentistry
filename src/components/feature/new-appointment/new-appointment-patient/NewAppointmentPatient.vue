<template>
  <section :class="$style.newAppointmentContainer">
    <form :class="$style.newAppointmentForm" @submit.prevent>
      <h2 :class="$style.newAppointmentTitle">Patient Details</h2>
      <div
        v-if="
          firebase.userProfile.role === 'staff' &&
          firebase.userProfile.services.includes('reception')
        "
        :class="$style.newAppointmentFormRow"
        cy-data="appointment-patient-email"
      >
        <label>Email</label>
        <BaseInput v-model="email" />
      </div>
      <div :class="$style.newAppointmentFormRow" cy-data="appointment-patient-firstname">
        <label>First Name</label>
        <BaseInput v-model="firstName" />
      </div>
      <div :class="$style.newAppointmentFormRow" cy-data="appointment-patient-lastname">
        <label>Last Name</label>
        <BaseInput v-model="lastName" />
      </div>
      <div :class="$style.newAppointmentFormRow" cy-data="appointment-patient-phone">
        <label>Contact Number</label>
        <BaseInput v-model="phone" />
      </div>
      <div :class="$style.newAppointmentButtonsContainer">
        <BaseButton @action="previousStep" cy-data="previous-button">
          <p>Previous</p>
        </BaseButton>
        <transition>
          <BaseButton
            v-if="firstName !== '' && lastName !== '' && phone !== ''"
            @action="updatePatientDetails"
            cy-data="next-button"
          >
            <p>Next</p>
          </BaseButton>
        </transition>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '../../../ui/base-input/BaseInput.vue'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import { useFirebaseStore } from '@/store/firebase'

const emit = defineEmits(['previous', 'next'])

const firebase = useFirebaseStore()

const newAppointmentStore = useNewAppointmentStore()
const newAppointmentPatient = newAppointmentStore.newAppointmentPatient

const email = ref(
  newAppointmentPatient.email ||
    (firebase.userProfile.role === 'staff' && firebase.userProfile.services.includes('reception')
      ? ''
      : firebase.userProfile.email)
)
const firstName = ref(newAppointmentPatient.firstName || firebase.userProfile.firstName)
const lastName = ref(newAppointmentPatient.lastName || firebase.userProfile.lastName)
const phone = ref(newAppointmentPatient.phone)

const updatePatientDetails = () => {
  newAppointmentStore.updateAppointmentPatient(
    firstName.value,
    lastName.value,
    email.value,
    phone.value
  )

  emit('next', 'payment', true)
}

const previousStep = () => {
  emit('previous', 'details', false)
}
</script>

<style src="../NewAppointment.styles.css" module />

<style scoped>
.button-enter-from,
.button-leave-to {
  opacity: 0;
}

.button-enter-active {
  transition: all 0.3s ease-in;
}

.button-leave-active {
  transition: all 0.3s ease-out;
}

.button-enter-to,
.button-leave-from {
  opacity: 1;
}
</style>
