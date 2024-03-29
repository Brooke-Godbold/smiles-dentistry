<template>
  <section :class="$style.newAppointmentContainer">
    <LoadingSpinner v-if="loading" />
    <div v-else-if="data && data.length > 0" :class="$style.upcomingAppointment">
      <h2>Your Upcoming Appointment</h2>
      <AppointmentItem :appointment="data[0]" />
      <p :class="$style.noCliniciansAvailable" cy-data="amend-appointment-text">
        If you wish to amend this, please call us on 07665 669669
      </p>
    </div>
    <form v-else :class="$style.newAppointmentForm" @submit.prevent>
      <h2 :class="$style.newAppointmentTitle">New Appointment Details</h2>
      <div :class="$style.newAppointmentFormRow" cy-data="appointment-details-service">
        <label>Your Service</label>
        <BaseSelect
          :loading="loadingAppointmentData"
          :options="availableServices"
          v-model="service"
          @on-select-changed="refreshStaffForService()"
        />
      </div>
      <transition name="select">
        <div v-if="service !== ''" :class="$style.newAppointmentFormRow">
          <label>Your Appointment Date & Time</label>
          <div :class="$style.newAppointmentSelectContainer" cy-data="appointment-details-date">
            <BaseSelect
              :loading="loadingAppointmentData"
              :options="availableDatesList()"
              v-model="selectedDate"
              @on-select-changed="refreshStaffForDate()"
            />
            <BaseSelect
              :loading="loadingAppointmentData"
              :options="timeDictionary"
              v-model="selectedTime"
              @on-select-changed="refreshStaffForDate()"
            />
          </div>
        </div>
      </transition>
      <transition name="select" mode="out-in">
        <div
          v-if="selectedDate && selectedTime && availableClinicians.length > 0"
          :class="$style.newAppointmentFormRow"
          cy-data="appointment-details-clinician"
        >
          <label>Available Clinicians</label>
          <BaseSelect
            :loading="loadingAppointmentData"
            :options="availableClinicians"
            v-model="selectedClinician"
          />
        </div>
        <p
          v-else-if="
            selectedDate &&
            selectedTime &&
            availableClinicians.length === 0 &&
            !loadingAppointmentData
          "
          :class="$style.noCliniciansAvailable"
          cy-data="appointment-details-no-clinician"
        >
          There are no Clinicians available for this service at this date & time
        </p>
      </transition>
      <transition name="select">
        <BaseButton
          v-if="selectedClinician !== '' && availableClinicians.length > 0"
          :loading="loadingAppointmentData"
          @action="updateAppointmentDetails"
          cy-data="next-button"
        >
          <p>Next</p>
        </BaseButton>
      </transition>
    </form>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseSelect from '../../../ui/base-select/BaseSelect.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import AppointmentItem from '../../appointment/AppointmentItem.vue'
import { availableDatesList, timeDictionary } from '../../../../utils/time.js'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import { UseAppointmentDetailsData } from '@/hooks/useAppointmentDetailsData'
import { UseToast } from '@/hooks/useToast'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { useFirebaseStore } from '@/store/firebase'

const { open } = UseToast.useToast()

const emit = defineEmits(['next'])

const newAppointmentStore = useNewAppointmentStore()
const newAppointmentDetails = newAppointmentStore.newAppointmentDetails

const service = ref(newAppointmentDetails.service)
const selectedDate = ref(newAppointmentDetails.date)
const selectedTime = ref(newAppointmentDetails.time)
const selectedClinician = ref(newAppointmentDetails.staff)

const firebase = useFirebaseStore()

const { loading, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()

const {
  loadingAppointmentData,
  appointmentDataError,
  loadServices,
  getStaffForService,
  getStaffForDate,
  availableServices,
  servicePriceLookup,
  availableClinicians
} = UseAppointmentDetailsData.useAppointmentDetailsData()

const refreshStaffForService = async () => {
  await getStaffForService(service.value)
}

const refreshStaffForDate = async () => {
  await refreshStaffForService()
  await getStaffForDate(selectedDate.value, selectedTime.value)
}

const updateAppointmentDetails = () => {
  newAppointmentStore.updateAppointmentDetails(
    service.value,
    selectedDate.value,
    selectedTime.value,
    selectedClinician.value,
    servicePriceLookup.value.find((obj) => obj.service === service.value).price,
    availableClinicians.value.find((obj) => obj.value === selectedClinician.value).name
  )

  emit('next', 'patient', true)
}

watch(appointmentDataError, (isError) => {
  if (isError) open('error', 'Looks like something went wrong')
})

watch(data, (newData) => {
  if (!newData || newData.length === 0) {
    loadServices()
    refreshStaffForService()
    refreshStaffForDate()
  }
})

loadMultipleDocs('appointment', [
  { field: 'email', operator: '==', value: firebase.userEmail },
  { field: 'date', operator: '>=', value: Date.now() }
])
</script>

<style src="../NewAppointment.styles.css" module />

<style scoped>
.select-enter-from,
.select-leave-to {
  opacity: 0;
}

.select-enter-active {
  transition: all 0.3s ease-in;
}

.select-leave-active {
  transition: all 0.3s ease-out;
}

.select-enter-to,
.select-leave-from {
  opacity: 1;
}
</style>
