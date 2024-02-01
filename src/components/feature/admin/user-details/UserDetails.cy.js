import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import UserDetails from './UserDetails.vue'
import { ref } from 'vue'

describe('<UserDetails />', () => {
  beforeEach(() => {
    const user = {
      email: 'john@gmail.com',
      role: 'user'
    }

    cy.wrap(user).as('user')

    const roles = [
      { name: 'User', value: 'user' },
      { name: 'Staff', value: 'staff' },
      { name: 'Admin', value: 'admin' }
    ]

    const addDocSpy = cy.spy().as('addDocSpy')
    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      addDoc: addDocSpy,
      loading: ref(false),
      error: ref(false)
    })

    cy.mount(UserDetails, {
      props: {
        roles,
        user,
        userUpdating: false
      }
    })
  })

  it('renders the User Details', function () {
    cy.get('[cy-data=user-role]').find('select').should('have.value', this.user.role)
    cy.get('[cy-data=user-email]').should('have.text', this.user.email)
  })

  it('updates the User Details', function () {
    const newRole = 'staff'
    cy.get('[cy-data=user-role]').find('select').select(newRole)

    cy.get('[cy-data=update-button]').click()
    cy.get('@addDocSpy').should((spy) => {
      const spyCalls = spy['getCalls']()
      const { args } = spyCalls[0]

      expect(args[0]).to.equal('profile')
      expect(args[1]).to.equal(this.user.email)
      expect(args[2]).to.deep.equal({ role: newRole })
    })
  })
})
