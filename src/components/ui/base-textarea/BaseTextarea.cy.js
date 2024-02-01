import BaseTextarea from './BaseTextarea.vue'

describe('<BaseTextarea />', () => {
  it('renders the Base Textarea', () => {
    const textInput =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id aliquam nulla. In dolor nulla, porttitor ut bibendum nec, viverra dignissim diam. Aliquam orci elit, vehicula nec elit dapibus, facilisis euismod est.'

    cy.mount(BaseTextarea, {
      props: {
        loading: false,
        error: false,
        errorMessage: ''
      }
    })

    cy.get('[data-cy=base-textarea]').type(textInput)
    cy.get('[data-cy=base-textarea]').blur()

    cy.get('[data-cy=base-textarea]').should('have.value', textInput)

    cy.get('[data-cy=base-textarea-error]').should('not.exist')

    cy.get('[data-cy=base-textarea-container]').matchImage()
  })

  it('renders the Base Textarea Error', () => {
    const errorMessage = 'Error Message'

    cy.mount(BaseTextarea, {
      props: {
        loading: false,
        error: true,
        errorMessage: errorMessage
      }
    })

    cy.get('[data-cy=base-textarea-error]').should('have.text', errorMessage)

    cy.get('[data-cy=base-textarea-container]').matchImage()
  })

  it('renders the Base Textarea Loading Spinner', () => {
    cy.mount(BaseTextarea, {
      props: {
        loading: true,
        error: false,
        errorMessage: ''
      }
    })

    cy.get('[data-cy=base-textarea]').should('be.disabled')
    cy.get('[data-cy=base-textarea-loading-spinner]').should('exist')

    cy.get('[data-cy=base-textarea-container]').matchImage()
  })
})
