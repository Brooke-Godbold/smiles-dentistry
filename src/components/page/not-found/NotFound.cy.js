import NotFound from './NotFound.vue'

describe('<NotFound />', () => {
  it('renders', () => {
    cy.mount(NotFound)

    cy.get('[data-cy=not-found-text]').should('have.text', `This doesn't exist`)
    cy.get('[data-cy=not-found-heading]').should('have.text', '404')

    cy.get('[data-cy=not-found]').matchImage()
  })
})
