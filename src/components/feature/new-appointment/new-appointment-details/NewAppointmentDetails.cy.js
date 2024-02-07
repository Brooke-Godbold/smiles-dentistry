import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import NewAppointmentDetails from './NewAppointmentDetails.vue'
import { createTestingPinia } from '@pinia/testing'
import { useNewAppointmentStore } from '@/store/newAppointmentStore'
import { ref } from 'vue'
import { dateToTimestamp } from '@/utils/time'
import { useFirebaseStore } from '@/store/firebase'
import { UseAppointmentDetailsData } from '@/hooks/useAppointmentDetailsData'

const useAppointmentDetailsStubData = {
  loadingAppointmentData: ref(false),
  loadServices: () => {},
  getStaffForService: () => {},
  getStaffForDate: () => {},
  availableServices: ref([
    { name: 'Check Up - £100', value: 'checkup' },
    { name: 'Extraction - £100', value: 'extraction' }
  ]),
  servicePriceLookup: ref([{ service: 'extraction', price: 100 }])
}

describe('<NewAppointmentDetails />', () => {
  it('renders Appointment Summary when existing appointment found', () => {
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref([
        {
          service: 'extraction',
          date: 1707317165000,
          time: 10,
          staffName: 'John Smith',
          firstName: 'Jack',
          lastname: 'Doe',
          phone: '01245 669669',
          price: 100,
          readOnly: true
        }
      ]),
      loadMultipleDocs: () => {}
    })

    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const firebaseStore = useFirebaseStore()
    firebaseStore.user = { email: 'john@gmail.com' }

    cy.get('[cy-data=appointment-item]').should('exist')
    cy.get('[cy-data=amend-appointment-text]').should(
      'contain.text',
      'If you wish to amend this, please call us on 07665 669669'
    )
  })

  it('renders New Appointment Details with empty data', () => {
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref(null),
      loadMultipleDocs: () => {}
    })

    cy.stub(UseAppointmentDetailsData, 'useAppointmentDetailsData').returns({
      ...useAppointmentDetailsStubData,
      availableClinicians: ref([{ name: 'John Smith', value: 'johnsmith' }])
    })

    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const firebaseStore = useFirebaseStore()
    firebaseStore.user = { email: 'john@gmail.com' }

    const store = useNewAppointmentStore()
    store.newAppointmentDetails = {
      service: '',
      date: null,
      time: null,
      staff: null
    }

    cy.get('[cy-data=appointment-details-service]').find('select').should('have.value', null)
    cy.get('[cy-data=appointment-details-date]').should('not.exist')
    cy.get('[cy-data=appointment-details-clinician]').should('not.exist')
    cy.get('[cy-data=appointment-details-no-clinician]').should('not.exist')
  })

  it('renders New Appointment Details with pre-filled data', () => {
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref(null),
      loadMultipleDocs: () => {}
    })

    cy.stub(UseAppointmentDetailsData, 'useAppointmentDetailsData').returns({
      ...useAppointmentDetailsStubData,
      availableClinicians: ref([{ name: 'John Smith', value: 'johnsmith' }])
    })

    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const firebaseStore = useFirebaseStore()
    firebaseStore.user = { email: 'john@gmail.com' }

    const store = useNewAppointmentStore()

    var nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 5)
    nextDay.setHours(24, 0, 0, 0)

    const service = 'extraction'
    const date = dateToTimestamp(nextDay)
    const time = 10
    const staff = 'johnsmith'

    store.newAppointmentDetails = {
      service,
      date,
      time,
      staff
    }

    cy.get('[cy-data=appointment-details-service]').find('select').should('have.value', service)
    cy.get('[cy-data=appointment-details-date]').find('select').eq(0).should('have.value', date)
    cy.get('[cy-data=appointment-details-date]').find('select').eq(1).should('have.value', time)
    cy.get('[cy-data=appointment-details-no-clinician]').should('not.exist')
    cy.get('[cy-data=appointment-details-clinician]').find('select').should('have.value', staff)
  })

  it('selects New Appointment Details with clinicians found', () => {
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref(null),
      loadMultipleDocs: () => {}
    })

    const nextButtonSpy = cy.spy().as('nextButtonSpy')

    cy.stub(UseAppointmentDetailsData, 'useAppointmentDetailsData').returns({
      ...useAppointmentDetailsStubData,
      availableClinicians: ref([{ name: 'John Smith', value: 'johnsmith' }])
    })

    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      },
      emits: {
        next: nextButtonSpy
      }
    })

    const firebaseStore = useFirebaseStore()
    firebaseStore.user = { email: 'john@gmail.com' }

    const store = useNewAppointmentStore()

    var nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 5)
    nextDay.setHours(24, 0, 0, 0)

    store.newAppointmentDetails = {
      service: '',
      date: null,
      time: null,
      staff: null
    }

    cy.get('[cy-data=appointment-details-service]').find('select').select('extraction')

    cy.get('[cy-data=appointment-details-date]').find('select').eq(0).select(1)
    cy.get('[cy-data=appointment-details-date]').find('select').eq(1).select(1)

    cy.get('[cy-data=appointment-details-no-clinician]').should('not.exist')
    cy.get('[cy-data=appointment-details-clinician]').find('select').select(1)

    cy.get('[cy-data=next-button]').click()
    cy.get('@nextButtonSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('patient')
      expect(args[1]).to.equal(true)
    })
  })

  it('selects New Appointment Details with no clinicians found', () => {
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref(null),
      loadMultipleDocs: () => {}
    })

    cy.stub(UseAppointmentDetailsData, 'useAppointmentDetailsData').returns({
      ...useAppointmentDetailsStubData,
      availableClinicians: ref([])
    })

    cy.mount(NewAppointmentDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const firebaseStore = useFirebaseStore()
    firebaseStore.user = { email: 'john@gmail.com' }

    const store = useNewAppointmentStore()

    var nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 5)
    nextDay.setHours(24, 0, 0, 0)

    store.newAppointmentDetails = {
      service: '',
      date: null,
      time: null,
      staff: null
    }

    cy.get('[cy-data=appointment-details-service]').find('select').select('extraction')

    cy.get('[cy-data=appointment-details-date]').find('select').eq(0).select(1)
    cy.get('[cy-data=appointment-details-date]').find('select').eq(1).select(1)

    cy.get('[cy-data=appointment-details-clinician]').should('not.exist')
    cy.get('[cy-data=appointment-details-no-clinician]').should(
      'contain.text',
      'There are no Clinicians available for this service at this date & time'
    )
  })
})
