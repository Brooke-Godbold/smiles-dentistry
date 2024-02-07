import { createTestingPinia } from '@pinia/testing'
import UserAppointments from './UserAppointments.vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { ref } from 'vue'
import { dateToTimestamp } from '@/utils/time'
import { useFirebaseStore } from '@/store/firebase'

describe('<UserAppointments />', () => {
  it('renders multiple Appointments', () => {
    const testAppointment = {
      service: 'extraction',
      date: dateToTimestamp(new Date()),
      price: 50,
      time: 14,
      staffName: 'John Smith',
      firstName: 'John',
      lastName: 'Smith',
      phone: '01245 669 669'
    }

    const loadMultipleDocsSpy = cy.spy().as('loadMultipleDocsSpy')
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref([testAppointment, testAppointment]),
      loadMultipleDocs: loadMultipleDocsSpy
    })

    cy.mount(UserAppointments, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()
    store.user = { email: 'john"gmail.com' }

    cy.get('[cy-data=no-appointments]').should('not.exist')
    cy.get('[cy-data=appointments-list]').children().should('have.length', 2)
  })

  it('renders correctly with no Appointments', () => {
    const loadMultipleDocsSpy = cy.spy().as('loadMultipleDocsSpy')
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref([]),
      loadMultipleDocs: loadMultipleDocsSpy
    })

    cy.mount(UserAppointments, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()
    store.user = { email: 'john"gmail.com' }

    cy.get('[cy-data=appointments-list]').should('not.exist')
    cy.get('[cy-data=no-appointments]').should('have.text', `You don't have any Appointments`)
  })
})
