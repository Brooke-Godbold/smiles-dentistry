import BaseSelect from './BaseSelect.vue'

describe('<BaseSelect />', () => {
  it('renders the Base Select', () => {
    const selectOptions = [
      { name: 'Lorem', value: 1 },
      { name: 'ipsum', value: 2 },
      { name: 'dolor', value: 3 },
      { name: 'sit', value: 4 },
      { name: 'amet', value: 5 }
    ]

    cy.mount(BaseSelect, {
      props: {
        options: selectOptions,
        loading: false
      }
    })

    cy.get('[data-cy=base-select-container]').matchImage()

    cy.get('[data-cy=base-select]').find('option').should('have.length', 6)

    cy.get('[data-cy=base-select]').select('Lorem')
    cy.get('[data-cy=base-select]').should('have.value', 1)

    cy.get('[data-cy=base-select]').select('amet')
    cy.get('[data-cy=base-select]').should('have.value', 5)
  })

  it('renders the Base Select Loading Spinner', () => {
    cy.mount(BaseSelect, {
      props: {
        options: [],
        loading: true
      }
    })

    cy.get('[data-cy=base-select-container]').matchImage()

    cy.get('[data-cy=base-select]').should('be.disabled')
    cy.get('[data-cy=base-select-loading-spinner]').should('exist')
  })
})
