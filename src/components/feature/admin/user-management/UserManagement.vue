<template>
  <section :class="$style.userManagement">
    <h2>User Management</h2>
    <LoadingSpinner v-if="loading" />
    <ul v-else :class="$style.usersList" cy-data="user-list">
      <UserDetails
        v-for="user in users"
        :key="user"
        :roles="roles"
        :user="user"
        @set-loading="setLoading"
        :usersUpdating="usersUpdating"
      />
    </ul>
  </section>
</template>

<script setup>
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import UserDetails from '../user-details/UserDetails.vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import { ref } from 'vue'

const usersUpdating = ref(false)

const users = ref([])

const roles = ref([
  { name: 'User', value: 'user' },
  { name: 'Staff', value: 'staff' },
  { name: 'Admin', value: 'admin' }
])

const { loading, error, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()

async function getUsers() {
  await loadMultipleDocs('profile')

  if (error.value) return
  data.value.forEach((doc) => users.value.push({ email: doc.email, role: doc.role }))
}

const setLoading = (isLoading) => (usersUpdating.value = isLoading)

getUsers()
</script>

<style src="./UserManagement.styles.css" module />
