import BaseInput from './BaseInput.vue'

describe('<BaseInput />', () => {
  it('renders the Base Input', () => {
    const textInput = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    cy.mount(BaseInput, {
      props: {
        loading: false,
        error: false,
        errorMessage: ''
      }
    })

    cy.get('[data-cy=base-input]').type(textInput)
    cy.get('[data-cy=base-input]').blur()

    cy.get('[data-cy=base-input]').should('have.value', textInput)

    cy.get('[data-cy=base-input-error]').should('not.exist')

    cy.get('[data-cy=base-input-container]').matchImage()
  })

  it('renders the Base Input Error', () => {
    const errorMessage = 'Error Message'

    cy.mount(BaseInput, {
      props: {
        loading: false,
        error: true,
        errorMessage: errorMessage
      }
    })

    cy.get('[data-cy=base-input-error]').should('have.text', errorMessage)

    cy.get('[data-cy=base-input-container]').matchImage()
  })

  it('renders the Base Input Loading Spinner', () => {
    cy.mount(BaseInput, {
      props: {
        loading: true,
        error: false,
        errorMessage: ''
      }
    })

    cy.get('[data-cy=base-input]').should('be.disabled')
    cy.get('[data-cy=base-input-loading-spinner]').should('exist')

    cy.get('[data-cy=base-input-container]').matchImage()
  })
})
