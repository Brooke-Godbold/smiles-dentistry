import { createTestingPinia } from '@pinia/testing'
import ProfileDetails from './ProfileDetails.vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { ref } from 'vue'
import { useFirebaseStore } from '@/store/firebase'

describe('<ProfileDetails />', () => {
  beforeEach(() => {
    const addDocSpy = cy.spy()

    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      error: ref(false),
      addDoc: addDocSpy,
      refreshUserProfile: () => {}
    })

    cy.wrap(addDocSpy).as('addDocSpy')

    cy.mount(ProfileDetails, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const userProfile = {
      role: '',
      firstName: 'John',
      lastName: 'Smith',
      qualification: 'Lorem University',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id aliquam nulla. In dolor nulla, porttitor ut bibendum nec, viverra dignissim diam. Aliquam orci elit, vehicula nec elit dapibus, facilisis euismod est.',
      services: ['extraction', 'checkup']
    }

    const store = useFirebaseStore()

    store.profile = userProfile
    store.user = { email: 'johnsmith@gmail.com' }

    cy.wrap(store).as('store')
  })

  it('renders the Profile Details for Staff', function () {
    this.store.profile.role = 'staff'

    cy.get('[data-cy=profile-details-email]').find('p').should('have.text', this.store.user.email)
    cy.get('[data-cy=profile-details-role]').find('p').should('have.text', 'Staff')

    cy.get('[data-cy=profile-details-firstname]')
      .find('input')
      .should('have.value', this.store.profile.firstName)

    cy.get('[data-cy=profile-details-lastname]')
      .find('input')
      .should('have.value', this.store.profile.lastName)

    cy.get('[data-cy=profile-details-qualification]')
      .find('input')
      .should('have.value', this.store.profile.qualification)

    cy.get('[data-cy=profile-details-bio]')
      .find('textarea')
      .should('have.value', this.store.profile.bio)

    cy.get('[data-cy=profile-details-services]')
      .find('input')
      .filter((i, el) => el.value === 'extraction')
      .first()
      .should('be.checked')

    cy.get('[data-cy=profile-details-services]')
      .find('input')
      .filter((i, el) => el.value === 'checkup')
      .first()
      .should('be.checked')

    cy.get('[data-cy=profile-details-services]')
      .find('input')
      .filter((i, el) => el.value === 'reception')
      .first()
      .should('not.be.checked')
  })

  it('updates the Profile Details for Staff', function () {
    this.store.profile.role = 'staff'

    const testData = {
      firstName: 'Jack',
      lastName: 'Doe',
      qualification: 'Ipsum College',
      bio: 'New bio content for testing purposes. New bio content for testing purposes. New bio content for testing purposes.',
      services: ['extraction', 'checkup']
    }

    cy.get('[data-cy=profile-details-firstname]').find('input').clear().type(testData.firstName)

    cy.get('[data-cy=profile-details-lastname]').find('input').clear().type(testData.lastName)

    cy.get('[data-cy=profile-details-qualification]')
      .find('input')
      .clear()
      .type(testData.qualification)

    cy.get('[data-cy=profile-details-bio]').find('textarea').clear().type(testData.bio)

    cy.get('[data-cy=base-button-action]').click()
    cy.get('@addDocSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('profile')
      expect(args[1]).to.equal(this.store.user.email)
      expect(args[2]).to.deep.equal(testData)
    })
  })

  it(`renders the Profile Details for User`, function () {
    this.store.profile.role = 'user'

    cy.get('[data-cy=profile-details-email]').find('p').should('have.text', this.store.user.email)

    cy.get('[data-cy=profile-details-firstname]')
      .find('input')
      .should('have.value', this.store.profile.firstName)

    cy.get('[data-cy=profile-details-lastname]')
      .find('input')
      .should('have.value', this.store.profile.lastName)

    cy.get('[data-cy=profile-details-role]').should('not.exist')
    cy.get('[data-cy=profile-details-qualification]').should('not.exist')
    cy.get('[data-cy=profile-details-bio]').should('not.exist')
    cy.get('[data-cy=profile-details-services]').should('not.exist')
  })

  it(`renders the Profile Details for Admin`, function () {
    this.store.profile.role = 'admin'

    cy.get('[data-cy=profile-details-email]').find('p').should('have.text', this.store.user.email)
    cy.get('[data-cy=profile-details-role]').find('p').should('have.text', 'Admin')

    cy.get('[data-cy=profile-details-firstname]')
      .find('input')
      .should('have.value', this.store.profile.firstName)

    cy.get('[data-cy=profile-details-lastname]')
      .find('input')
      .should('have.value', this.store.profile.lastName)

    cy.get('[data-cy=profile-details-qualification]').should('not.exist')
    cy.get('[data-cy=profile-details-bio]').should('not.exist')
    cy.get('[data-cy=profile-details-services]').should('not.exist')
  })
  ;['user', 'admin'].forEach((role) => {
    it(`updates the Profile Details for ${role}`, function () {
      this.store.profile.role = role

      const testData = {
        firstName: 'Jack',
        lastName: 'Doe'
      }

      cy.get('[data-cy=profile-details-firstname]').find('input').clear().type(testData.firstName)

      cy.get('[data-cy=profile-details-lastname]').find('input').clear().type(testData.lastName)

      cy.get('[data-cy=base-button-action]').click()
      cy.get('@addDocSpy').should((spy) => {
        const spyCalls = spy['getCalls']()
        const { args } = spyCalls[0]

        expect(args[0]).to.equal('profile')
        expect(args[1]).to.equal(this.store.user.email)
        expect(args[2]).to.deep.contain(testData)
      })
    })
  })
})
