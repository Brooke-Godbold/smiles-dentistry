<template>
  <section :class="$style.newAppointmentContainer">
    <ToastNotification ref="toast">
      <p>Looks like something went wrong</p>
    </ToastNotification>
    <div :class="$style.newAppointmentForm">
      <h2 :class="$style.newAppointmentTitle">New Appointment Details</h2>
      <div :class="$style.newAppointmentFormRow">
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
          <div :class="$style.newAppointmentSelectContainer">
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
      <transition name="select">
        <div
          v-if="selectedDate && selectedTime && clinicians.length > 0"
          :class="$style.newAppointmentFormRow"
        >
          <label>Available Clinicians</label>
          <BaseSelect :loading="loading" :options="clinicians" v-model="selectedClinician" />
        </div>
        <p
          v-else-if="selectedDate && selectedTime && clinicians.length === 0 && !loading"
          :class="$style.noCliniciansAvailable"
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
import { ref } from 'vue'
import BaseSelect from '../../../ui/base-select/BaseSelect.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { dateToString, dateToTimestamp, timeDictionary } from '../../../../utils/time.js'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import { useFirebaseStore } from '@/store/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import staffId from '@/utils/staffId'

const firebase = useFirebaseStore()

const emit = defineEmits(['next'])

const toast = ref(null)
const loading = ref(false)

const services = ref([
  { name: 'Check Up', value: 'checkup' },
  { name: 'Extraction', value: 'extraction' }
])

const dates = ref([])

const initializeDates = () => {
  const firstDay = new Date()
  firstDay.setHours(24, 0, 0, 0)
  dates.value.push({
    name: dateToString(firstDay),
    value: dateToTimestamp(firstDay)
  })

  for (var i = 0; i <= 90; i++) {
    var nextDay = new Date()
    nextDay.setDate(firstDay.getDate() + i)
    nextDay.setHours(24, 0, 0, 0)
    dates.value.push({
      name: dateToString(nextDay),
      value: dateToTimestamp(nextDay)
    })
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

const updateAppointmentDetails = () => {
  newAppointmentStore.updateAppointmentDetails(
    service.value,
    selectedDate.value,
    selectedTime.value,
    selectedClinician.value
  )

  emit('next', 'patient', true)
}

const getStaffForService = async () => {
  if (service.value === '') return

  loading.value = true

  try {
    clinicians.value = []

    const staffRef = collection(firebase.firebaseDatabase, 'profile')
    const staffQuery = query(
      staffRef,
      where('role', '==', 'staff'),
      where('services', 'array-contains', service.value)
    )
    const staffDocs = await getDocs(staffQuery)
    staffDocs.forEach((staffMember) =>
      clinicians.value.push({
        name: `${staffMember.data().firstName} ${staffMember.data().lastName}`,
        value: staffId(staffMember.data().firstName, staffMember.data().lastName)
      })
    )
  } catch (error) {
    toast.value.openToast()
  } finally {
    loading.value = false
  }
}

const getStaffForDate = async () => {
  if (!selectedDate.value || !selectedTime.value) return

  loading.value = true

  try {
    await getStaffForService()

    const availableClinicians = []

    await Promise.all(
      clinicians.value.map(async (staff) => {
        const appointmentRef = collection(firebase.firebaseDatabase, 'appointment')
        const appointmentQuery = query(
          appointmentRef,
          where('staff', '==', staff.value),
          where('date', '==', selectedDate.value),
          where('time', '==', selectedTime.value)
        )
        const existingAppointment = await getDocs(appointmentQuery)

        if (!existingAppointment.size) {
          availableClinicians.push({ name: staff.name, value: staff.value })
        }
      })
    )

    clinicians.value = availableClinicians

    if (clinicians.value.length === 0) {
      selectedClinician.value = ''
    }
  } catch (error) {
    toast.value.openToast()
  } finally {
    loading.value = false
  }
}

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
