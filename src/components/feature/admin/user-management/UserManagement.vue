<template>
  <div :class="$style.userManagement">
    <h2>User Management</h2>
    <LoadingSpinner v-if="loading" />
    <div v-else v-for="user in users" :key="user" :class="$style.usersList">
      <UserDetails :roles="roles" :user="user" @set-loading="setLoading" :loading="usersUpdating" />
    </div>
  </div>
</template>

<script setup>
import UserDetails from '../user-details/UserDetails.vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'
import { useFirebaseStore } from '@/store/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ref } from 'vue'

const firebase = useFirebaseStore()

const loading = ref(false)
const usersUpdating = ref(false)

const users = ref([])

const roles = ref([
  { name: 'User', value: 'user' },
  { name: 'Staff', value: 'staff' },
  { name: 'Admin', value: 'admin' }
])

async function getUsers() {
  loading.value = true
  const docs = await getDocs(collection(firebase.firebaseDatabase, 'profile'))
  docs.forEach((doc) => users.value.push({ email: doc.data().email, role: doc.data().role }))

  loading.value = false
}

const setLoading = (isLoading) => (usersUpdating.value = isLoading)

getUsers()
</script>

<style src="./UserManagement.styles.css" module />
