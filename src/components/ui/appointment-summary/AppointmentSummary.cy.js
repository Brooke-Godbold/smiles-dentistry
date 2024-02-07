import AppointmentSummary from './AppointmentSummary.vue'

describe('<AppointmentSummary />', () => {
  it('renders the Appointment Summary', () => {
    cy.mount(AppointmentSummary, {
      props: {
        service: 'extraction',
        date: 1706572800000,
        time: 14,
        staff: 'John Smith',
        firstName: 'Jack',
        lastName: 'Doe',
        phone: '01225 966 699',
        price: 50
      }
    })

    cy.get('[data-cy=service]').should('have.text', 'Extraction')
    cy.get('[data-cy=date]').should('have.text', 'Tue Jan 30 2024 at 2pm')
    cy.get('[data-cy=clinician]').should('have.text', 'John Smith')
    cy.get('[data-cy=name]').should('have.text', 'Jack Doe')
    cy.get('[data-cy=phone]').should('have.text', '01225 966 699')
    cy.get('[data-cy=price]').should('have.text', '£50')

    cy.get('[data-cy=appointment-summary]').matchImage()
  })
})
