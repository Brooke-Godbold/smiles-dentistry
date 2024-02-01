<template>
  <ToastNotification ref="toast" :type="toastType">
    <p>{{ toastMessage }}</p>
  </ToastNotification>
  <div :class="$style.userDetails">
    <p :class="$style.userEmail" cy-data="user-email">{{ user.email }}</p>
    <BaseSelect :loading="usersUpdating" :options="roles" v-model="userRole" cy-data="user-role" />
    <BaseButtonVue :loading="usersUpdating" @action="updateUser" cy-data="update-button">
      <p>Save</p>
    </BaseButtonVue>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseSelect from '@/components/ui/base-select/BaseSelect.vue'
import BaseButtonVue from '@/components/ui/base-button/BaseButton.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'

const props = defineProps({
  roles: Array,
  user: Object,
  usersUpdating: Boolean
})

const emit = defineEmits(['setLoading'])

const toast = ref(null)
const toastMessage = ref('')
const toastType = ref('')
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
    toastMessage.value = 'Something went wrong updating user'
    toastType.value = 'error'
  } else {
    toastMessage.value = `Successfully updated User ${props.user.email}`
    toastType.value = 'success'
  }

  toast.value.openToast()
})
</script>

<style src="./UserDetails.styles.css" module />
