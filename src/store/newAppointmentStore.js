import { defineStore } from 'pinia'

export const useNewAppointmentStore = defineStore('newAppointmentStore', {
  state: () => {
    return {
      details: {
        service: ''
      },
      patient: {
        firstName: ''
      }
    }
  },
  getters: {
    newAppointmentDetails: (state) => state.details,
    newAppointmentPatient: (state) => state.patient
  },
  actions: {
    updateAppointmentDetails(service) {
      this.details = {
        service
      }
    },
    updateAppointmentPatient(firstName) {
      this.patient = {
        firstName
      }
    }
  }
})
