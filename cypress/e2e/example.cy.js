// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')

    cy.get('[data-cy=header-login-button]').click()
    cy.get('[data-cy=login-modal-username]').type('test4@gmail.com')
    cy.get('[data-cy=login-modal-password]').type('password')
    cy.get('[data-cy=login-modal-login]').click()

    cy.get('[data-cy=header-appointment-button]').click()
  })
})
