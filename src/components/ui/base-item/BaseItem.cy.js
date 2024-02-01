import BaseItem from './BaseItem.vue'

describe('<BaseItem />', () => {
  it('renders the Base Item wrapper', () => {
    const textContent =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id aliquam nulla. In dolor nulla, porttitor ut bibendum nec, viverra dignissim diam. Aliquam orci elit, vehicula nec elit dapibus, facilisis euismod est. Proin quis nisi quis dolor mollis tincidunt. Pellentesque nisl lorem, lobortis eu lobortis nec, convallis a enim. Nulla posuere, nisi ut scelerisque interdum, urna metus blandit augue, at mollis metus urna ut diam. Proin consectetur ligula imperdiet, ultricies ex sit amet, tempor mauris. Morbi sit amet blandit massa. Donec placerat dapibus tellus et dignissim. Nulla facilisi. Praesent volutpat lectus quis sem porta auctor. Pellentesque at eros dolor. Mauris ut nibh vel est pellentesque mollis. Quisque ac cursus dui.'

    cy.mount(BaseItem, {
      slots: {
        default: textContent
      }
    })

    cy.get('[data-cy=base-item]').should('have.text', textContent)

    cy.get('[data-cy=base-item]').matchImage()
  })
})
