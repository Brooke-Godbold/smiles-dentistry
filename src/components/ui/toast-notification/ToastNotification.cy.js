import ToastNotification from './ToastNotification.vue'

describe('<ToastNotification />', () => {
  it('renders the Toast Notification', () => {
    cy.clock()
    const toastText = 'Lorem ipsum dolor sit amet'

    cy.mount(ToastNotification, {
      slots: {
        default: toastText
      },
      props: {
        type: 'success'
      }
    }).then((comp) => {
      const { wrapper } = comp
      wrapper.componentVM.openToast()
    })

    cy.get('[data-cy=toast-notification]').should('have.text', toastText)

    cy.get('[data-cy=toast-notification]').matchImage()

    cy.tick(4500)
    cy.get('[data-cy=toast-notification]').should('exist')

    cy.tick(500)
    cy.get('[data-cy=toast-notification]').should('not.exist')
  })
})
