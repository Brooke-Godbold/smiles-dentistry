import HeroSection from './HeroSection.vue'

describe('<HeroSection />', () => {
  it('renders', () => {
    cy.mount(HeroSection)

    cy.get('[cy-data=hero-heading]').should(
      'have.text',
      'Everyone Deserves An Award Winning Smile!'
    )
    cy.get('[cy-data=hero-button]').should('have.text', 'Make an Appointment Now')
    cy.get('[cy-data=hero-phone]').should('have.text', '01784 998 778')
  })
})
