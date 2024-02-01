import { createTestingPinia } from '@pinia/testing'
import NewAppointmentPayment from './NewAppointmentPayment.vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { ref } from 'vue'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import { dateToTimestamp } from '@/utils/time'

describe('<NewAppointmentPayment />', () => {
  beforeEach(() => {
    const addDocSpy = cy.spy().as('addDocSpy')
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      error: ref(true),
      addDoc: addDocSpy
    })

    const previousButtonSpy = cy.spy().as('previousButtonSpy')
    cy.mount(NewAppointmentPayment, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      },
      emits: {
        previous: previousButtonSpy
      }
    })

    var date = new Date()
    date.setDate(date.getDate() + 5)
    date.setHours(24, 0, 0, 0)

    const testData = {
      firstName: 'John',
      lastName: 'Smith',
      staff: 'jackdoe',
      date: dateToTimestamp(date),
      time: 10,
      phone: '01245 669 669',
      service: 'extraction',
      email: 'john@gmail.com',
      paid: true
    }

    cy.wrap(testData).as('testData')

    const store = useNewAppointmentStore()
    store.newAppointmentDetails = {
      date: testData.date,
      time: testData.time,
      staff: testData.staff,
      service: testData.service
    }
    store.newAppointmentPatient = {
      firstName: testData.firstName,
      lastName: testData.lastName,
      phone: testData.phone,
      email: testData.email
    }
  })

  it('renders New Appointment Payment form', () => {
    cy.get('[cy-data=appointment-payment-summary]').should('exist')
  })

  it('submits a new appointment on confirmation', function () {
    cy.get('[cy-data=previous-button]').click()
    cy.get('@previousButtonSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('patient')
      expect(args[1]).to.equal(false)
    })

    cy.get('[cy-data=confirm-button]').click()
    cy.get('@addDocSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('appointment')
      expect(args[2]).to.deep.equal(this.testData)
    })
  })
})
