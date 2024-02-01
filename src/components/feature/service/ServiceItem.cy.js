import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import ServiceItem from './ServiceItem.vue'
import { ref } from 'vue'

describe('<ServiceItem />', () => {
  it('renders the Service Item', () => {
    const title = 'Extractions'
    const description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id aliquam nulla. In dolor nulla, porttitor ut bibendum nec, viverra dignissim diam. Aliquam orci elit, vehicula nec elit dapibus, facilisis euismod est.'
    const price = 110

    const serviceDataObject = {
      image:
        'https://firebasestorage.googleapis.com/v0/b/smiles-dentistry.appspot.com/o/1706134163655_profileImage.jpg?alt=media&token=5f2bb148-5bf1-4abf-8842-3bfbe946686b',
      description: [description, description],
      title,
      price
    }

    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref(serviceDataObject),
      loadSingleDoc: () => {}
    })

    cy.mount(ServiceItem, {
      props: {
        staffId: 'johnsmith'
      }
    })

    cy.get('[data-cy=service-item-title]').should('have.text', title)
    cy.get('[data-cy=service-item-price]').should('have.text', `From £${price}`)

    cy.get('[data-cy=service-item-information]').find('p').should('have.length', 2)
    cy.get('[data-cy=service-item-information]').contains(description).should('exist')

    cy.get('[data-cy=service-item]').matchImage()
  })
})
