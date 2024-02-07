import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import NewAppointmentPatient from './NewAppointmentPatient.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFirebaseStore } from '@/store/firebase'

describe('<NewAppointmentPatient />', () => {
  it('renders New Appointment Patient form with default values', () => {
    cy.mount(NewAppointmentPatient, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const firebaseStore = useFirebaseStore()
    const firstName = 'John'
    const lastName = 'Smith'
    firebaseStore.userProfile = {
      firstName,
      lastName,
      role: 'user'
    }

    const appointmentStore = useNewAppointmentStore()
    appointmentStore.newAppointmentPatient = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }

    cy.get('[cy-data=appointment-patient-email]').should('not.exist')
    cy.get('[cy-data=appointment-patient-firstname]').find('input').should('have.value', firstName)
    cy.get('[cy-data=appointment-patient-lastname]').find('input').should('have.value', lastName)
    cy.get('[cy-data=appointment-patient-phone]').find('input').should('have.value', '')
    cy.get('[cy-data=previous-button]').should('exist')
    cy.get('[cy-data=next-button]').should('not.exist')
  })

  it('renders New Appointment Patient form with saved values', () => {
    cy.mount(NewAppointmentPatient, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const firebaseStore = useFirebaseStore()
    firebaseStore.userProfile = { role: 'user' }

    const appointmentStore = useNewAppointmentStore()
    const firstName = 'Jane'
    const lastName = 'Doe'
    const phone = '01245 669 669'
    appointmentStore.newAppointmentPatient = {
      firstName,
      lastName,
      email: '',
      phone
    }

    cy.get('[cy-data=appointment-patient-email]').should('not.exist')
    cy.get('[cy-data=appointment-patient-firstname]').find('input').should('have.value', firstName)
    cy.get('[cy-data=appointment-patient-lastname]').find('input').should('have.value', lastName)
    cy.get('[cy-data=appointment-patient-phone]').find('input').should('have.value', phone)
    cy.get('[cy-data=previous-button]').should('exist')
    cy.get('[cy-data=next-button]').should('exist')
  })

  it('renders New Appointment Patient for Reception Staff members', () => {
    cy.mount(NewAppointmentPatient, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const firebaseStore = useFirebaseStore()
    firebaseStore.userProfile = { role: 'staff', services: ['reception'] }
    firebaseStore.user = { email: 'jane@gmail.com' }

    cy.get('[cy-data=appointment-patient-email]').find('input').should('have.value', '')
  })

  it('responds to button clicks correctly', () => {
    const previousButtonSpy = cy.spy().as('previousButtonSpy')
    const nextButtonSpy = cy.spy().as('nextButtonSpy')

    cy.mount(NewAppointmentPatient, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      },
      emits: {
        next: nextButtonSpy,
        previous: previousButtonSpy
      }
    })

    const testData = {
      email: 'jane@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '01245 669 669'
    }

    const firebaseStore = useFirebaseStore()
    firebaseStore.userProfile = {}
    firebaseStore.user = { email: testData.email }

    const appointmentStore = useNewAppointmentStore()
    appointmentStore.newAppointmentPatient = {}

    cy.get('[cy-data=appointment-patient-firstname]').find('input').type(testData.firstName)
    cy.get('[cy-data=appointment-patient-lastname]').find('input').type(testData.lastName)
    cy.get('[cy-data=appointment-patient-phone]').find('input').type(testData.phone)

    cy.get('[cy-data=previous-button]').click()
    cy.get('@previousButtonSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('details')
      expect(args[1]).to.equal(false)
    })

    cy.get('[cy-data=next-button]').click()
    cy.get('@nextButtonSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('payment')
      expect(args[1]).to.equal(true)
    })
  })
})
