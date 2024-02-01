import { createTestingPinia } from '@pinia/testing'
import StaffAppointments from './StaffAppointments.vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { useFirebaseStore } from '@/store/firebase'
import { ref } from 'vue'
import { dateToTimestamp } from '@/utils/time'

describe('<StaffAppointments />', () => {
  it('renders multiple Appointments', () => {
    const testAppointment = {
      service: 'extraction',
      date: dateToTimestamp(new Date()),
      time: 14,
      staff: 'John Smith',
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

    cy.mount(StaffAppointments, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()
    store.userProfile = { firstName: 'John', lastName: 'Smith' }

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

    cy.mount(StaffAppointments, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()
    store.userProfile = { firstName: 'John', lastName: 'Smith' }

    cy.get('[cy-data=appointments-list]').should('not.exist')
    cy.get('[cy-data=no-appointments]').should(
      'have.text',
      `You don't have any Upcoming Appointments`
    )
  })
})
