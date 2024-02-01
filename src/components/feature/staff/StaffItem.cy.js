import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import StaffItem from './StaffItem.vue'
import { ref } from 'vue'

describe('<StaffItem />', () => {
  it('renders the Staff Item', () => {
    const firstName = 'John'
    const lastName = 'Smith'
    const qualification = 'Lorem University'
    const services = ['extraction', 'checkup']
    const bio =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id aliquam nulla. In dolor nulla, porttitor ut bibendum nec, viverra dignissim diam. Aliquam orci elit, vehicula nec elit dapibus, facilisis euismod est.'

    const staffDataObject = {
      profileImage:
        'https://firebasestorage.googleapis.com/v0/b/smiles-dentistry.appspot.com/o/1706134163655_profileImage.jpg?alt=media&token=5f2bb148-5bf1-4abf-8842-3bfbe946686b',
      firstName,
      lastName,
      qualification,
      services,
      bio
    }

    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref([staffDataObject]),
      loadMultipleDocs: () => {}
    })

    cy.mount(StaffItem, {
      props: {
        staffId: 'johnsmith'
      }
    })

    cy.get('[data-cy=staff-item-name]').should('have.text', `${firstName} ${lastName}`)
    cy.get('[data-cy=staff-item-qualification]').should('have.text', qualification)
    cy.get('[data-cy=staff-item-bio]').should('have.text', bio)

    cy.get('[data-cy=staff-item-services]').children().should('have.length', 2)
    cy.get('[data-cy=staff-item-services]').contains('Extractions').should('exist')
    cy.get('[data-cy=staff-item-services]').contains('Checkups').should('exist')

    cy.get('[data-cy=staff-item]').matchImage()
  })
})
