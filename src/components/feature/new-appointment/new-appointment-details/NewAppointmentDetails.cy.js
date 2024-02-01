import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import NewAppointmentDetails from './NewAppointmentDetails.vue'
import { createTestingPinia } from '@pinia/testing'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import { ref } from 'vue'
import { dateToTimestamp } from '@/utils/time'

describe('<NewAppointmentDetails />', () => {
  beforeEach(() => {
    const stubbedResponse = {
      loading: ref(false),
      error: ref(false),
      data: ref([]),
      loadMultipleDocs: () => {}
    }

    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns(stubbedResponse)
  })

  it('renders New Appointment Details with empty data', () => {
    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useNewAppointmentStore()

    store.newAppointmentDetails = {
      service: '',
      date: null,
      time: null
    }

    cy.get('[cy-data=appointment-details-service]').find('select').should('have.value', null)
    cy.get('[cy-data=appointment-details-date]').should('not.exist')
    cy.get('[cy-data=appointment-details-clinician]').should('not.exist')
    cy.get('[cy-data=appointment-details-no-clinician]').should('not.exist')
  })

  it('renders New Appointment Details with pre-filled data', () => {
    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useNewAppointmentStore()

    var nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 5)
    nextDay.setHours(24, 0, 0, 0)

    const service = 'extraction'
    const date = dateToTimestamp(nextDay)
    const time = 10

    store.newAppointmentDetails = {
      service,
      date,
      time
    }

    cy.get('[cy-data=appointment-details-service]').find('select').should('have.value', service)
    cy.get('[cy-data=appointment-details-date]').find('select').eq(0).should('have.value', date)
    cy.get('[cy-data=appointment-details-date]').find('select').eq(1).should('have.value', time)
    cy.get('[cy-data=appointment-details-clinician]').should('not.exist')
    cy.get('[cy-data=appointment-details-no-clinician]').should(
      'contain.text',
      'There are no Clinicians available for this service at this date & time'
    )
  })

  it('selects New Appointment Details', () => {
    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useNewAppointmentStore()

    var nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 5)
    nextDay.setHours(24, 0, 0, 0)

    store.newAppointmentDetails = {
      service: '',
      date: null,
      time: null
    }

    cy.get('[cy-data=appointment-details-service]').find('select').select('Extraction')

    cy.get('[cy-data=appointment-details-date]').find('select').eq(0).select(1)
    cy.get('[cy-data=appointment-details-date]').find('select').eq(1).select(1)

    cy.get('[cy-data=appointment-details-clinician]').should('not.exist')
    cy.get('[cy-data=appointment-details-no-clinician]').should(
      'contain.text',
      'There are no Clinicians available for this service at this date & time'
    )
  })
})
