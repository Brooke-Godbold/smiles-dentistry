<template>
  <section :class="$style.newAppointmentContainer">
    <ToastNotification ref="toast">
      <p>Looks like something went wrong</p>
    </ToastNotification>
    <div :class="$style.newAppointmentForm">
      <h2 :class="$style.newAppointmentTitle">New Appointment Details</h2>
      <div :class="$style.newAppointmentFormRow" cy-data="appointment-details-service">
        <label>Your Service</label>
        <BaseSelect
          :loading="loading"
          :options="services"
          v-model="service"
          @on-select-changed="getStaffForService"
        />
      </div>
      <transition name="select">
        <div v-if="service !== ''" :class="$style.newAppointmentFormRow">
          <label>Your Appointment Date & Time</label>
          <div :class="$style.newAppointmentSelectContainer" cy-data="appointment-details-date">
            <BaseSelect
              :loading="loading"
              :options="dates"
              v-model="selectedDate"
              @on-select-changed="getStaffForDate"
            />
            <BaseSelect
              :loading="loading"
              :options="timeDictionary"
              v-model="selectedTime"
              @on-select-changed="getStaffForDate"
            />
          </div>
        </div>
      </transition>
      <transition name="select" mode="out-in">
        <div
          v-if="selectedDate && selectedTime && clinicians.length > 0"
          :class="$style.newAppointmentFormRow"
          cy-data="appointment-details-clinician"
        >
          <label>Available Clinicians</label>
          <BaseSelect :loading="loading" :options="clinicians" v-model="selectedClinician" />
        </div>
        <p
          v-else-if="selectedDate && selectedTime && clinicians.length === 0 && !loading"
          :class="$style.noCliniciansAvailable"
          cy-data="appointment-details-no-clinician"
        >
          There are no Clinicians available for this service at this date & time
        </p>
      </transition>
      <transition name="select">
        <BaseButton
          v-if="selectedClinician !== '' && clinicians.length > 0"
          :loading="loading"
          @action="updateAppointmentDetails"
        >
          <p>Next</p>
        </BaseButton>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseSelect from '../../../ui/base-select/BaseSelect.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { dateToString, dateToTimestamp, timeDictionary } from '../../../../utils/time.js'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import staffId from '@/utils/staffId'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'

const emit = defineEmits(['next'])

const toast = ref(null)

const dates = ref([])

const initializeDates = () => {
  const firstDay = new Date()
  firstDay.setHours(24, 0, 0, 0)

  if (firstDay.getDay() !== 0) {
    dates.value.push({
      name: dateToString(firstDay),
      value: dateToTimestamp(firstDay)
    })
  }

  for (var i = 0; i <= 90; i++) {
    var nextDay = new Date()
    nextDay.setDate(firstDay.getDate() + i)
    nextDay.setHours(24, 0, 0, 0)

    if (nextDay.getDay() !== 0) {
      dates.value.push({
        name: dateToString(nextDay),
        value: dateToTimestamp(nextDay)
      })
    }
  }
}

initializeDates()

const clinicians = ref([])

const newAppointmentStore = useNewAppointmentStore()
const newAppointmentDetails = newAppointmentStore.newAppointmentDetails

const service = ref(newAppointmentDetails.service)
const selectedDate = ref(newAppointmentDetails.date)
const selectedTime = ref(newAppointmentDetails.time)
const selectedClinician = ref(newAppointmentDetails.staff)

const { loading, error, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()

const services = ref([])
const priceLookup = []

const loadServices = async () => {
  await loadMultipleDocs('service')

  if (!error.value) {
    data.value.forEach((service) => {
      services.value.push({
        name: `${service.title} - £${service.price}`,
        value: service.id
      })
      priceLookup.push({
        service: service.id,
        price: service.price
      })
    })
  }
}

loadServices()

const updateAppointmentDetails = () => {
  newAppointmentStore.updateAppointmentDetails(
    service.value,
    selectedDate.value,
    selectedTime.value,
    selectedClinician.value,
    priceLookup.find((obj) => obj.service === service.value).price
  )

  emit('next', 'patient', true)
}

const getStaffForService = async () => {
  if (service.value === '') return

  await loadMultipleDocs('profile', [
    { field: 'role', operator: '==', value: 'staff' },
    { field: 'services', operator: 'array-contains', value: service.value }
  ])

  if (!error.value) {
    clinicians.value = []
    data.value.forEach((staffMember) =>
      clinicians.value.push({
        name: `${staffMember.firstName} ${staffMember.lastName}`,
        value: staffId(staffMember.firstName, staffMember.lastName)
      })
    )
  }
}

const getStaffForDate = async () => {
  if (!selectedDate.value || !selectedTime.value) return

  await getStaffForService()

  if (error.value) return

  const availableClinicians = []

  await Promise.all(
    clinicians.value.map(async (staff) => {
      await loadMultipleDocs('appointment', [
        { field: 'staff', operator: '==', value: staff.value },
        { field: 'date', operator: '==', value: selectedDate.value },
        { field: 'time', operator: '==', value: selectedTime.value }
      ])

      if (data.value.length === 0) {
        availableClinicians.push({ name: staff.name, value: staff.value })
      }
    })
  )

  clinicians.value = availableClinicians

  if (clinicians.value.length === 0) {
    selectedClinician.value = ''
  }
}

watch(error, (isError) => {
  if (isError) toast.value.openToast()
})

getStaffForService()
getStaffForDate()
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
