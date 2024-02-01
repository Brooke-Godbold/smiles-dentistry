import BaseButton from './BaseButton.vue'

describe('<BaseButton />', () => {
  it('renders a link', () => {
    const linkContent = 'Lorem ipsum dolor'

    cy.mount(BaseButton, {
      slots: {
        default: linkContent
      },
      props: {
        link: 'Home',
        alt: false
      }
    })

    cy.get('[data-cy=base-button-link]').should('have.text', linkContent)

    cy.get('[data-cy=base-button-link]').matchImage()
  })

  it('renders a button', () => {
    const buttonContent = 'Lorem ipsum dolor'
    const onActionSpy = cy.spy().as('onActionSpy')

    cy.mount(BaseButton, {
      slots: {
        default: buttonContent
      },
      props: {
        loading: false,
        type: 'button',
        onClick: onActionSpy
      }
    })

    cy.get('[data-cy=base-button-action]').should('have.text', buttonContent)

    cy.get('[data-cy=base-button-action]').click()
    cy.get('@onActionSpy').should('have.been.called')

    cy.get('[data-cy=base-button-action]').matchImage()
  })

  it('renders a loading state', () => {
    const buttonContent = 'Lorem ipsum dolor'
    const onActionSpy = cy.spy().as('onActionSpy')

    cy.mount(BaseButton, {
      slots: {
        default: buttonContent
      },
      props: {
        loading: true,
        type: 'button',
        onClick: onActionSpy
      }
    })

    cy.get('[data-cy=base-button-action]').should('have.text', buttonContent).should('be.disabled')
    cy.get('@onActionSpy').should('not.have.been.called')
    cy.get('[data-cy=base-button-loading-spinner]').should('exist')

    cy.get('[data-cy=base-button-action]').matchImage()
  })
})
