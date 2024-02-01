import LocationSection from './LocationSection.vue'

describe('<LocationSection />', () => {
  it('renders', () => {
    cy.mount(LocationSection)

    cy.get('[cy-data=location-street]').should('have.text', '123 Smile Street')
    cy.get('[cy-data=location-city]').should('have.text', 'London')
    cy.get('[cy-data=location-postcode]').should('have.text', 'SE16 7HH')
  })
})
