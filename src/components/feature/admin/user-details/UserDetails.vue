<template>
  <li :class="$style.userDetailsListItem">
    <form :class="$style.userDetails" @submit.prevent="updateUser">
      <p :class="$style.userEmail" cy-data="user-email">{{ user.email }}</p>
      <BaseSelect
        :loading="usersUpdating"
        :options="roles"
        v-model="userRole"
        cy-data="user-role"
      />
      <BaseButtonVue type="submit" :loading="usersUpdating" cy-data="update-button">
        <p>Save</p>
      </BaseButtonVue>
    </form>
  </li>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseSelect from '@/components/ui/base-select/BaseSelect.vue'
import BaseButtonVue from '@/components/ui/base-button/BaseButton.vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { UseToast } from '@/hooks/useToast'

const { open } = UseToast.useToast()

const props = defineProps({
  roles: Array,
  user: Object,
  usersUpdating: Boolean
})

const emit = defineEmits(['setLoading'])

const userRole = ref(props.user.role)

const { loading, error, addDoc } = UseFirebaseDocs.useFirebaseDocs()

const updateUser = async () => {
  emit('setLoading', loading.value)

  await addDoc('profile', props.user.email, { role: userRole.value })

  emit('setLoading', loading.value)
}

watch(loading, (isLoading) => {
  if (isLoading) return

  if (error.value) {
    open('error', 'Something went wrong updating user')
  } else {
    open('success', `Successfully updated User ${props.user.email}`)
  }
})
</script>

<style src="./UserDetails.styles.css" module />
