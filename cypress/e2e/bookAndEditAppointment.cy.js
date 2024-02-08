import { dateToTimestamp } from '../../src/utils/time.js'

describe('My First Test', () => {
  before(() => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    date.setHours(24, 0, 0, 0)

    const testData = {
      service: 'extraction',
      date: dateToTimestamp(date),
      time: 10
    }

    cy.wrap(testData).as('testData')
  })

  it('visits the app root url', function () {
    cy.visit('/')

    cy.get('[data-cy=header-login-button]').click()
    cy.get('[data-cy=login-modal-username]').type('test4@gmail.com')
    cy.get('[data-cy=login-modal-password]').type('password')
    cy.get('[data-cy=login-modal-login]').click()

    cy.get('[data-cy=header-appointment-button]').click()

    cy.get('[data-cy=appointment-details-service]')
      .find('select')
      .select(this.testData.service.toString())
    cy.get('[cy-data=appointment-details-date]')
      .find('select')
      .eq(0)
      .select(this.testData.date.toString())
    cy.get('[cy-data=appointment-details-date]')
      .find('select')
      .eq(1)
      .select(this.testData.time.toString())

    cy.get('[cy-data=appointment-details-clinician]').find('select').select(1)
  })
})
