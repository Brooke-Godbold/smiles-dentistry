<template>
  <ToastNotification ref="toast" :type="toastType">
    <p>{{ toastMessage }}</p>
  </ToastNotification>
  <form @submit.prevent="updateProfile" :class="$style.profileDetails">
    <h2>Profile Details</h2>
    <div :class="$style.profileDetailsRow">
      <label>User</label>
      <p :class="$style.profileDetailsUser">{{ firebase.userEmail }}</p>
    </div>
    <div v-if="firebase.userProfile.role !== 'user'" :class="$style.profileDetailsRow">
      <label>My Job Role</label>
      <p :class="$style.profileDetailsUser">
        {{
          `${firebase.userProfile.role.charAt(0).toUpperCase()}${firebase.userProfile.role.slice(1)}`
        }}
      </p>
    </div>
    <div :class="$style.profileDetailsRow">
      <label>First Name</label>
      <BaseInput
        :loading="loading"
        v-model.trim="firstName"
        :error="firstNameError"
        errorMessage="First Name must be supplied"
      />
    </div>
    <div :class="$style.profileDetailsRow">
      <label>Last Name</label>
      <BaseInput
        :loading="loading"
        v-model.trim="lastName"
        :error="lastNameError"
        errorMessage="Last Name must be supplied"
      />
    </div>
    <div v-if="firebase.userProfile.role === 'staff'" :class="$style.profileDetailsRow">
      <label>Qualification</label>
      <BaseInput
        :loading="loading"
        v-model.trim="qualification"
        :error="qualificationError"
        errorMessage="Qualification must be supplied"
      />
    </div>
    <div v-if="firebase.userProfile.role === 'staff'" :class="$style.profileDetailsRow">
      <label>Biography</label>
      <BaseTextarea
        :loading="loading"
        v-model.trim="biography"
        :error="biographyError"
        errorMessage="Biography must be at least 50 characters"
      />
    </div>
    <div v-if="firebase.userProfile.role === 'staff'" :class="$style.profileDetailsRow">
      <label>Services Offered</label>
      <div :class="$style.servicesSection">
        <div :class="$style.serviceSelection">
          <label>Check-Ups</label>
          <BaseInput type="checkbox" value="checkups" v-model="services" />
        </div>
        <div :class="$style.serviceSelection">
          <label>Extractions</label>
          <BaseInput type="checkbox" value="extractions" v-model="services" />
        </div>
        <div :class="$style.serviceSelection">
          <label>Receptionist</label>
          <BaseInput type="checkbox" value="reception" v-model="services" />
        </div>
      </div>
    </div>
    <div v-if="firebase.userProfile.role === 'staff'" :class="$style.profileDetailsRow">
      <label>Profile Image</label>
      <BaseInput type="file" :loading="loading" @on-file-uploaded="onFileChange" />
    </div>
    <BaseButton :loading="loading" type="submit">
      <p>Update Profile</p>
    </BaseButton>
  </form>
</template>

<script setup>
import BaseInput from '@/components/ui/base-input/BaseInput.vue'
import BaseTextarea from '@/components/ui/base-textarea/BaseTextarea.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { useFirebaseStore } from '@/store/firebase'
import { ref } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebase = useFirebaseStore()

const firstName = ref(firebase.userProfile?.firstName || '')
const firstNameError = ref(false)

const lastName = ref(firebase.userProfile?.lastName || '')
const lastNameError = ref(false)

const qualification = ref(firebase.userProfile?.qualification || '')
const qualificationError = ref(false)

const biography = ref(firebase.userProfile?.bio || '')
const biographyError = ref(false)

const services = ref(firebase.userProfile?.services || [])

const loading = ref(false)

const toast = ref(null)
const toastMessage = ref('')
const toastType = ref('')

const onFileChange = async (e) => {
  const file = e.target.files[0]

  if (!file) return

  loading.value = true

  try {
    const storageRef = firebaseRef(
      firebase.storage,
      `${firebase.userProfile.dateCreated}_profileImage.jpg`
    )

    const snapshot = await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(snapshot.ref)

    const userRef = doc(firebase.db, 'profile', firebase.userEmail)
    await setDoc(userRef, { profileImage: downloadUrl }, { merge: true })

    toastMessage.value = 'Successfully updated Profile Image!'
    toastType.value = 'success'
  } catch (error) {
    toastMessage.value = 'Unable to upload Profile Image at this time'
    toastType.value = 'error'
  } finally {
    toast.value.openToast()
    loading.value = false
  }
}

const refreshProfile = async () => {
  loading.value = true
  await firebase.refreshUserProfile()
  loading.value = false
}

const updateProfile = async () => {
  if (!validate()) return

  loading.value = true

  try {
    const userRef = doc(firebase.db, 'profile', firebase.userEmail)
    await setDoc(
      userRef,
      {
        firstName: firstName.value,
        lastName: lastName.value,
        bio: biography.value,
        services: services.value,
        qualification: qualification.value
      },
      { merge: true }
    )
    await refreshProfile()

    toastMessage.value = 'Successfully updated Profile!'
    toastType.value = 'success'
  } catch (error) {
    toastMessage.value = 'Unable to update Profile at this time'
    toastType.value = 'error'
  } finally {
    toast.value.openToast()
    loading.value = false
  }
}

const validate = () => {
  let isError = false

  firstNameError.value = false
  if (firstName.value === '' || !firstName.value) {
    firstNameError.value = true
    isError = true
  }

  lastNameError.value = false
  if (lastName.value === '' || !lastName.value) {
    lastNameError.value = true
    isError = true
  }

  qualificationError.value = false
  if (qualification.value === '' || !qualification.value) {
    qualificationError.value = true
    isError = true
  }

  biographyError.value = false
  if (!biography.value || biography.value?.length < 50) {
    biographyError.value = true
    isError = true
  }

  if (isError) {
    toastMessage.value = 'Invalid input supplied!'
    toastType.value = 'error'
    toast.value.openToast()
    return false
  }

  return true
}

refreshProfile()
</script>

<style src="./ProfileDetails.styles.css" module />