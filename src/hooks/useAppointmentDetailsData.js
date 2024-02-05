import { ref } from 'vue'
import { UseFirebaseDocs } from './useFirebaseDocs'
import staffId from '@/utils/staffId'

function useAppointmentDetailsData() {
  const { loading, data, error, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()

  const loadingAppointmentData = ref(loading)
  const appointmentDataError = ref(error)

  const servicePriceLookup = ref([])
  const availableServices = ref([])
  const availableClinicians = ref([])

  const loadServices = async () => {
    await loadMultipleDocs('service')

    if (!error.value) {
      data.value.forEach((service) => {
        availableServices.value.push({
          name: `${service.title} - £${service.price}`,
          value: service.id
        })
        servicePriceLookup.value.push({
          service: service.id,
          price: service.price
        })
      })
    }
  }

  const loadAppointmentDetailsData = async (service, date, time, allowedAppointmentId) => {
    await loadServices()

    if (service) await getStaffForService(service)

    if (date && time) await getStaffForDate(date, time, allowedAppointmentId)
  }

  const getStaffForService = async (service) => {
    if (service === '') return

    await loadMultipleDocs('profile', [
      { field: 'role', operator: '==', value: 'staff' },
      { field: 'services', operator: 'array-contains', value: service }
    ])

    if (!error.value) {
      availableClinicians.value = []
      data.value.forEach((staffMember) =>
        availableClinicians.value.push({
          name: `${staffMember.firstName} ${staffMember.lastName}`,
          value: staffId(staffMember.firstName, staffMember.lastName)
        })
      )
    }
  }

  const getStaffForDate = async (date, time, allowedAppointmentId) => {
    if (!date || !time) return

    if (error.value) return

    const clinicians = []

    await Promise.all(
      availableClinicians.value.map(async (staff) => {
        await loadMultipleDocs('appointment', [
          { field: 'staff', operator: '==', value: staff.value },
          { field: 'date', operator: '==', value: date },
          { field: 'time', operator: '==', value: time }
        ])

        if (data.value.length === 0 || data.value[0].id === allowedAppointmentId) {
          clinicians.push({ name: staff.name, value: staff.value })
        }
      })
    )

    availableClinicians.value = clinicians
  }

  return {
    loadingAppointmentData,
    appointmentDataError,
    servicePriceLookup,
    availableServices,
    availableClinicians,
    loadAppointmentDetailsData,
    getStaffForService,
    getStaffForDate,
    loadServices
  }
}

export const UseAppointmentDetailsData = {
  useAppointmentDetailsData
}
