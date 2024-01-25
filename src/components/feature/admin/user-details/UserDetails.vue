<template>
  <ToastNotification ref="toast" :type="toastType">
    <p>{{ toastMessage }}</p>
  </ToastNotification>
  <div :class="$style.userDetails">
    <p :class="$style.userEmail">{{ user.email }}</p>
    <BaseSelect :options="roles" v-model="userRole" />
    <BaseButtonVue :loading="loading" @action="updateUser">
      <p>Save</p>
    </BaseButtonVue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseSelect from '@/components/ui/base-select/BaseSelect.vue'
import BaseButtonVue from '@/components/ui/base-button/BaseButton.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { doc, setDoc } from 'firebase/firestore'
import { useFirebaseStore } from '@/store/firebase'

const props = defineProps({
  roles: Array,
  user: Object,
  loading: Boolean
})

const emit = defineEmits(['setLoading'])

const firebase = useFirebaseStore()

const toast = ref(null)
const toastMessage = ref('')
const toastType = ref('')
const userRole = ref(props.user.role)

const updateUser = async () => {
  emit('setLoading', true)

  try {
    const userRef = doc(firebase.db, 'profile', props.user.email)
    await setDoc(userRef, { role: userRole.value }, { merge: true })
    toastMessage.value = `Successfully updated User ${props.user.email}`
    toastType.value = 'success'
  } catch (error) {
    toastMessage.value = 'Something went wrong updating user'
    toastType.value = 'error'
  } finally {
    emit('setLoading', false)
    toast.value.openToast()
  }
}
</script>

<style src="./UserDetails.styles.css" module />
