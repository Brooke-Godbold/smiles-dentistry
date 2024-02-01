import { createTestingPinia } from '@pinia/testing'
import LoginModal from './LoginModal.vue'
import { useFirebaseStore } from '@/store/firebase'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { ref } from 'vue'

describe('<LoginModal />', () => {
  beforeEach(() => {
    const loginModalSpy = cy.spy().as('loginModalSpy')
    const addDocSpy = cy.spy().as('addDocSpy')

    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      error: ref(false),
      signup: loginModalSpy,
      login: loginModalSpy,
      addDoc: addDocSpy
    })

    cy.mount(LoginModal, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => cy.spy() })]
      }
    })

    const store = useFirebaseStore()

    store.initializing = false

    cy.get('[data-cy=header-login-button]').click()
  })

  it('logs in User', () => {
    const username = 'john@gmail.com'
    cy.get('[data-cy=login-modal-username]').find('input').type(username)

    const password = 'password'
    cy.get('[data-cy=login-modal-password]').find('input').type(password)

    cy.get('[data-cy=login-modal-login]').click()

    cy.get('@loginModalSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal(username)
      expect(args[1]).to.equal(password)
    })

    cy.get('@addDocSpy').should('not.have.been.called')
  })

  it('signs up User', () => {
    const username = 'john@gmail.com'
    cy.get('[data-cy=login-modal-username]').find('input').type(username)

    const password = 'password'
    cy.get('[data-cy=login-modal-password]').find('input').type(password)

    const expectedProfile = {
      email: username,
      role: 'user'
    }
    cy.get('[data-cy=login-modal-signup]').click()

    cy.get('@loginModalSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal(username)
      expect(args[1]).to.equal(password)
    })

    cy.get('@addDocSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('profile')
      expect(args[1]).to.equal(username)
      expect(args[2]).to.deep.contain(expectedProfile)
    })
  })

  it('closes the Login Modal', () => {
    cy.get('[data-cy=login-modal-close]').click()

    cy.get('[data-cy=login-modal]').should('not.exist')
  })
})
