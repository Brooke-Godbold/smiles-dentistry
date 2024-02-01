import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import UserManagement from './UserManagement.vue'
import { ref } from 'vue'

describe('<UserManagement />', () => {
  it('renders', () => {
    const user = {
      email: 'test@gmail.com',
      role: 'user'
    }

    cy.stub(UseFirebaseDocs, 'useFirebaseDocs').returns({
      loading: ref(false),
      data: ref([user, user, user]),
      error: ref(false),
      loadMultipleDocs: () => {}
    })

    cy.mount(UserManagement)

    cy.get('[cy-data=user-list]').children().should('have.length', 3)
  })
})
