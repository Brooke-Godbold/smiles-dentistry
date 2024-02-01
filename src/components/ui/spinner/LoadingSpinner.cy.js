import LoadingSpinner from './LoadingSpinner.vue'

describe('<LoadingSpinner />', () => {
  it('renders the Loading Spinner', () => {
    cy.mount(LoadingSpinner)

    cy.get('[data-cy=loading-spinner]').should('exist')

    cy.get('[data-cy=loading-spinner]').matchImage()
  })

  it('renders the Mini Loading Spinner', () => {
    cy.mount(LoadingSpinner, {
      props: {
        mini: true
      }
    })

    cy.get('[data-cy=loading-spinner]').should('exist')

    cy.get('[data-cy=loading-spinner]').matchImage()
  })
})
