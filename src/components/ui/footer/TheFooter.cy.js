import TheFooter from './TheFooter.vue'

describe('<TheFooter />', () => {
  it('renders the Footer', () => {
    cy.mount(TheFooter)

    cy.get('[cy-data=footer-links]').contains('Privacy Policy').should('exist')
    cy.get('[cy-data=footer-links]').contains('Terms & Conditions').should('exist')
    cy.get('[cy-data=footer-links]').contains('Contact').should('exist')
    cy.get('[cy-data=footer-links]').contains('Careers').should('exist')
  })
})
