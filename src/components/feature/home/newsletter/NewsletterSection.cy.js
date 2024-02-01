import { UseBrevo } from '@/hooks/useBrevo'
import NewsletterSection from './NewsletterSection.vue'
import { ref } from 'vue'

describe('<NewsletterSection />', () => {
  it('renders Newsletter Signup', () => {
    cy.stub(UseBrevo, 'useBrevo').returns({
      loading: ref(false),
      error: ref(false),
      addEmailContact: () => {}
    })

    cy.mount(NewsletterSection)

    cy.get('[cy-data=newsletter-heading-primary]').should(
      'have.text',
      'Want the best Dental Advice?'
    )
    cy.get('[cy-data=newsletter-heading-secondary]').should(
      'have.text',
      'Get the best advice for free!'
    )
    cy.get('[cy-data=newsletter-heading-tertiary]').should(
      'have.text',
      'Sign up with your Email below'
    )
  })

  it('signs up an email for the Newsletter', () => {
    const brevoSpy = cy.spy().as('brevoSpy')
    cy.stub(UseBrevo, 'useBrevo').returns({
      loading: ref(false),
      error: ref(false),
      addEmailContact: brevoSpy
    })

    cy.mount(NewsletterSection)

    const email = 'john@gmail.com'

    cy.get('[cy-data=newsletter-email]').find('input').type(email)

    cy.get('[cy-data=newsletter-signup-button]').click()
    cy.get('@brevoSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]
      expect(args[0]).to.equal(email)
    })
  })
})
