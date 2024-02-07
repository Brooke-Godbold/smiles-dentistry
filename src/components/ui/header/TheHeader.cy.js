import { createTestingPinia } from '@pinia/testing'
import TheHeader from './TheHeader.vue'
import { useFirebaseStore } from '@/store/firebase'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { ref } from 'vue'

describe('<TheHeader />', () => {
  beforeEach(() => {
    const serviceData = [
      { title: 'Extractions', id: 'extraction', firstName: 'John', lastName: 'Smith' },
      { title: 'Extractions', id: 'extraction', firstName: 'John', lastName: 'Smith' }
    ]

    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref(serviceData),
      loadMultipleDocs: () => {}
    })

    cy.mount(TheHeader, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()

    cy.wrap(store).as('store')
  })

  it('renders the Header Logo and Dropdowns', function () {
    this.store.isAuthenticated = false

    cy.get('[data-cy=header-logo]').find('p').should('have.text', 'All Smiles Dentistry')

    cy.get('[data-cy=header-services-nav]')
      .find('[data-cy=header-nav-title]')
      .should('have.text', 'Services')

    cy.get('[data-cy=header-services-nav]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 2)

    cy.get('[data-cy=header-staff-nav]')
      .find('[data-cy=header-nav-title]')
      .should('have.text', 'Staff')

    cy.get('[data-cy=header-staff-nav]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 2)

    cy.get('[data-cy=header]').matchImage()
  })

  it('renders the Header for Unauthenticated users', function () {
    this.store.isAuthenticated = false

    cy.get('[data-cy=header-login-button]').should('exist')

    cy.get('[data-cy=header-logout-button]').should('not.exist')
    cy.get('[data-cy=header-appointment-button]').should('not.exist')

    cy.get('[data-cy=header-profile-nav-links]').should('not.exist')
    cy.get('[data-cy=header-admin-nav-links]').should('not.exist')
  })

  it('renders the Header for Authenticated Staff users', function () {
    this.store.isAuthenticated = true
    this.store.profile = { role: 'staff', services: ['extraction'] }

    cy.get('[data-cy=header-login-button]').should('not.exist')

    cy.get('[data-cy=header-logout-button]').should('exist')
    cy.get('[data-cy=header-appointment-button]').should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-title]')
      .should('have.text', 'Profile')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 3)

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Profile Details')
      .should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('My Appointments')
      .should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Upcoming Appointments')
      .should('exist')

    cy.get('[data-cy=header-admin-nav-links]').should('not.exist')
  })

  it('renders the Header for Authenticated Receptionists', function () {
    this.store.isAuthenticated = true
    this.store.profile = { role: 'staff', services: ['reception'] }

    cy.get('[data-cy=header-login-button]').should('not.exist')

    cy.get('[data-cy=header-logout-button]').should('exist')
    cy.get('[data-cy=header-appointment-button]').should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-title]')
      .should('have.text', 'Profile')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 3)

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Profile Details')
      .should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('My Appointments')
      .should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Upcoming Appointments')
      .should('exist')

    cy.get('[data-cy=header-admin-nav-links]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 1)

    cy.get('[data-cy=header-admin-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Appointment Management')
      .should('exist')
  })

  it('renders the Header for Authenticated Regular users', function () {
    this.store.isAuthenticated = true
    this.store.profile = { role: 'user' }

    cy.get('[data-cy=header-login-button]').should('not.exist')

    cy.get('[data-cy=header-logout-button]').should('exist')
    cy.get('[data-cy=header-appointment-button]').should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-title]')
      .should('have.text', 'Profile')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 2)

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Profile Details')
      .should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('My Appointments')
      .should('exist')

    cy.get('[data-cy=header-admin-nav-links]').should('not.exist')
  })

  it('renders the Header for Authenticated Admin users', function () {
    this.store.isAuthenticated = true
    this.store.profile = { role: 'admin' }

    cy.get('[data-cy=header-login-button]').should('not.exist')

    cy.get('[data-cy=header-logout-button]').should('exist')
    cy.get('[data-cy=header-appointment-button]').should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-title]')
      .should('have.text', 'Profile')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 2)

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Profile Details')
      .should('exist')

    cy.get('[data-cy=header-profile-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('My Appointments')
      .should('exist')

    cy.get('[data-cy=header-admin-nav-links]')
      .find('[data-cy=header-nav-title]')
      .should('have.text', 'Admin')

    cy.get('[data-cy=header-admin-nav-links]')
      .find('[data-cy=header-nav-links]')
      .find('router-link')
      .should('have.length', 2)

    cy.get('[data-cy=header-admin-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('User Management')
      .should('exist')

    cy.get('[data-cy=header-admin-nav-links]')
      .find('[data-cy=header-nav-links]')
      .contains('Appointment Management')
      .should('exist')
  })

  it('renders the Header for screen size 1280px', function () {
    this.store.isAuthenticated = true
    this.store.profile = { role: 'admin' }

    cy.viewport(1280, 1080)

    cy.get('[data-cy=header-logout-button]').should('be.visible')
    cy.get('[data-cy=header-appointment-button]').should('be.visible')

    cy.get('[data-cy=header-services-nav]').should('not.be.visible')
    cy.get('[data-cy=header-staff-nav]').should('not.be.visible')
    cy.get('[data-cy=header-profile-nav-links]').should('not.be.visible')
    cy.get('[data-cy=header-admin-nav-links]').should('not.be.visible')
  })

  it('renders the Header for screen size 960px', function () {
    this.store.isAuthenticated = true
    this.store.profile = { role: 'admin' }

    cy.viewport(960, 1080)

    cy.get('[data-cy=header-logout-button]').should('not.be.visible')
    cy.get('[data-cy=header-appointment-button]').should('not.be.visible')
    cy.get('[data-cy=header-services-nav]').should('not.be.visible')
    cy.get('[data-cy=header-staff-nav]').should('not.be.visible')
    cy.get('[data-cy=header-profile-nav-links]').should('not.be.visible')
    cy.get('[data-cy=header-admin-nav-links]').should('not.be.visible')
  })

  it('renders the Header for screen size 480px', function () {
    this.store.isAuthenticated = true
    this.store.profile = { role: 'admin' }

    cy.viewport(480, 1080)

    cy.get('[data-cy=header-logo]').find('p').should('not.be.visible')
  })
})
