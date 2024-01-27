import { defineStore } from 'pinia'

export const useNewAppointmentStore = defineStore('newAppointmentStore', {
  state: () => {
    return {
      details: {
        service: '',
        date: null,
        time: null,
        staff: ''
      },
      patient: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    }
  },
  getters: {
    newAppointmentDetails: (state) => state.details,
    newAppointmentPatient: (state) => state.patient
  },
  actions: {
    updateAppointmentDetails(service, date, time, staff) {
      this.details = {
        service,
        date,
        time,
        staff
      }
    },
    updateAppointmentPatient(firstName, lastName, email, phone) {
      this.patient = {
        firstName,
        lastName,
        email,
        phone
      }
    },
    resetAppointmentCache() {
      this.details = {
        service: '',
        date: null,
        time: null,
        staff: ''
      }
      this.patient = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    }
  }
})
