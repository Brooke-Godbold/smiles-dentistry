import HeaderNav from './HeaderNav.vue'

describe('<HeaderNav />', () => {
  it('renders', () => {
    const navTitle = 'Lorem ipsum'
    const navLinkTitle = 'Dolor'
    const navLinks = [
      { name: navLinkTitle, navRoute: 'Service', params: { serviceId: 'amet' } },
      { name: navLinkTitle, navRoute: 'Service', params: { serviceId: 'amet' } }
    ]

    cy.mount(HeaderNav, {
      props: {
        navLinks: navLinks,
        navTitle: navTitle
      }
    })

    cy.get('[data-cy=header-nav-title]').should('have.text', navTitle)

    cy.get('[data-cy=header-nav-links]').find('router-link').should('have.length', 2)
    cy.get('[data-cy=header-nav-links]')
      .find('router-link')
      .first()
      .should('have.text', navLinkTitle)
  })
})
