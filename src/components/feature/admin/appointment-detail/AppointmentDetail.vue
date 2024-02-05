<template>
  <section :class="$style.appointmentDetail">
    <LoadingSpinner v-if="loading" />
    <div v-if="!loading && data" :class="$style.appointmentDetail">
      <h2>{{ `Appointment #${route.params.appointmentId}` }}</h2>
      <BaseItem>
        <div :class="$style.appointmentDetailContainer">
          <div :class="$style.appointmentDetailTable">
            <div :class="$style.appointmentDetailRow">
              <label>Email</label>
              <BaseInput
                v-model="email"
                :loading="loadingAppointmentData || loading"
                :read-only="!canEdit"
              />
            </div>
            <div :class="$style.appointmentDetailRow">
              <label>First Name</label>
              <BaseInput
                v-model="firstName"
                :loading="loadingAppointmentData || loading"
                :read-only="!canEdit"
              />
            </div>
            <div :class="$style.appointmentDetailRow">
              <label>Last Name</label>
              <BaseInput
                v-model="lastName"
                :loading="loadingAppointmentData || loading"
                :read-only="!canEdit"
              />
            </div>
            <div :class="$style.appointmentDetailRow">
              <label>Contact Number</label>
              <BaseInput
                v-model="phone"
                :loading="loadingAppointmentData || loading"
                :read-only="!canEdit"
              />
            </div>
            <div :class="$style.appointmentDetailRow">
              <label>Service</label>
              <BaseSelect
                v-if="canEdit"
                :options="availableServices"
                v-model="service"
                @on-select-changed="refreshStaffForService()"
                :loading="loadingAppointmentData || loading"
              />
              <BaseInput v-else v-model="service" :read-only="true" />
            </div>
            <div :class="$style.appointmentDetailRow">
              <label>Date</label>
              <BaseSelect
                v-if="canEdit"
                :options="availableDatesList()"
                v-model="date"
                @on-select-changed="refreshStaffForDate()"
                :loading="loadingAppointmentData || loading"
              />
              <BaseInput v-else v-model="readonlyDate" :read-only="true" />
            </div>
            <div :class="$style.appointmentDetailRow">
              <label>Time</label>
              <BaseSelect
                v-if="canEdit"
                :options="timeDictionary"
                v-model="time"
                @on-select-changed="refreshStaffForDate()"
                :loading="loadingAppointmentData || loading"
              />
              <BaseInput v-else v-model="readonlyTime" :read-only="true" />
            </div>
            <div :class="$style.appointmentDetailRow">
              <label>Clinician</label>
              <BaseSelect
                v-if="canEdit"
                :options="availableClinicians"
                v-model="staff"
                :loading="loadingAppointmentData || loading"
              />
              <BaseInput v-else v-model="staff" :read-only="true" />
            </div>
          </div>
          <div v-if="canEdit" :class="$style.paidCheckbox">
            <label>Paid</label>
            <BaseInput type="checkbox" v-model="paid" />
          </div>
          <BaseButton
            v-if="canEdit"
            @action="updateAppointment"
            :loading="loadingAppointmentData || loading"
            >Update Appointment</BaseButton
          >
        </div>
      </BaseItem>
    </div>
  </section>
</template>

<script setup>
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import BaseInput from '@/components/ui/base-input/BaseInput.vue'
import BaseSelect from '@/components/ui/base-select/BaseSelect.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import BaseItem from '@/components/ui/base-item/BaseItem.vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import {
  availableDatesList,
  timeAsString,
  timeDictionary,
  timestampToDateString
} from '@/utils/time'
import { UseAppointmentDetailsData } from '@/hooks/useAppointmentDetailsData'
import { UseToast } from '@/hooks/useToast'

const { open } = UseToast.useToast()

const route = useRoute()
const router = useRouter()

const { loading, data, loadSingleDoc, addDoc, error } = UseFirebaseDocs.useFirebaseDocs()
const {
  loadingAppointmentData,
  loadAppointmentDetailsData,
  servicePriceLookup,
  availableServices,
  availableClinicians,
  getStaffForService,
  getStaffForDate
} = UseAppointmentDetailsData.useAppointmentDetailsData()

watch(data, (newData) => {
  if (!loading.value && !newData) {
    router.push({ name: 'NotFound' })
  } else if (newData) {
    loadAppointmentDetailsData(
      newData.service,
      newData.date,
      newData.time,
      route.params.appointmentId
    )

    email.value = newData.email
    firstName.value = newData.firstName
    lastName.value = newData.lastName
    phone.value = newData.phone

    service.value = newData.service
    date.value = newData.date
    time.value = newData.time
    staff.value = newData.staff

    paid.value = newData.paid
  }
})

watch(availableClinicians, (newClinicians) => {
  if (newClinicians.length === 0) {
    staff.value = ''
  }
})

loadSingleDoc('appointment', route.params.appointmentId)

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const phone = ref('')

const service = ref('')
const date = ref(null)
const time = ref(null)
const staff = ref('')

const paid = ref(null)

const canEdit = computed(() => {
  return date.value >= Date.now()
})

const readonlyDate = computed(() => timestampToDateString(date.value))
const readonlyTime = computed(() => timeAsString(time.value))

const refreshStaffForService = () => {
  getStaffForService(service.value)
}

const refreshStaffForDate = () => {
  getStaffForDate(date.value, time.value, route.params.appointmentId)
}

const updateAppointment = async () => {
  const updatedAppointment = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    service: service.value,
    date: date.value,
    time: time.value,
    staff: staff.value,
    paid: paid.value,
    price: servicePriceLookup.value.find((item) => item.service === service.value).price
  }

  await addDoc('appointment', route.params.appointmentId, updatedAppointment)

  if (!error.value)
    open('success', `Successfully Updated Appointment #${route.params.appointmentId}`)
}
</script>

<style src="./AppointmentDetail.styles.css" module />
