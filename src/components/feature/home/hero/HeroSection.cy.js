import { useFirebaseStore } from '@/store/firebase'
import HeroSection from './HeroSection.vue'
import { createTestingPinia } from '@pinia/testing'

describe('<HeroSection />', () => {
  it('renders Hero Section for logged in users', () => {
    cy.mount(HeroSection, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()
    store.isAuthenticated = true

    cy.get('[cy-data=hero-heading]').should(
      'have.text',
      'Everyone Deserves An Award Winning Smile!'
    )
    cy.get('[cy-data=hero-button]').should('have.text', 'Make an Appointment Now')
    cy.get('[cy-data=hero-phone]').should('have.text', '01784 998 778')
  })

  it('renders Hero Section for unauthenticated users', () => {
    cy.mount(HeroSection, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()
    store.isAuthenticated = false

    cy.get('[cy-data=hero-heading]').should(
      'have.text',
      'Everyone Deserves An Award Winning Smile!'
    )
    cy.get('[cy-data=header-login-button]').should('have.text', 'Login to make an Appointment')
    cy.get('[cy-data=hero-phone]').should('have.text', '01784 998 778')
  })
})
