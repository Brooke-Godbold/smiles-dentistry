<template>
  <ToastNotification ref="toast" :type="toastType">
    <p>{{ toastMessage }}</p>
  </ToastNotification>
  <section :class="$style.newsletterSection">
    <BaseItem>
      <div :class="$style.newsletterSignup">
        <h2>Want the best Dental Advice?</h2>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Sed aliquam vitae nisi ut faucibus. Praesent tempor ut arcu sed ullamcorper. Nulla
          malesuada nulla nunc, vel lobortis dui mattis ut. Sed sed cursus leo. Quisque eu viverra
          velit. Duis et vehicula metus. Sed orci mi, semper ut suscipit et, accumsan quis ligula.
          Maecenas elementum nulla odio, fermentum pharetra mauris congue eget. Nulla ut odio eget
          ipsum ultrices molestie vitae at libero. Phasellus tempus fermentum metus, a euismod lorem
          tincidunt ut. Curabitur eget condimentum elit, sit amet venenatis erat. Mauris tellus
          risus, viverra porttitor ex lacinia, volutpat malesuada ipsum.
        </p>
        <h3>Get the best advice for free!</h3>
        <h2>Sign up with your Email below</h2>
        <BaseInput :loading="loading" v-model="email" />
        <BaseButton :loading="loading" @action="signup">Sign Up Now!</BaseButton>
      </div>
    </BaseItem>
  </section>
</template>

<script setup>
import BaseItem from '@/components/ui/base-item/BaseItem.vue'
import BaseInput from '@/components/ui/base-input/BaseInput.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
import ToastNotification from '@/components/ui/toast-notification/ToastNotification.vue'
import { ref, watch } from 'vue'
import { useBrevo } from '@/hooks/useBrevo'

const email = ref('')
const toast = ref(null)
const toastMessage = ref('')
const toastType = ref('')

const { loading, error, errorMessage, addEmailContact } = useBrevo()

const signup = () => {
  addEmailContact(email.value)
}

watch(loading, (isLoading) => {
  if (isLoading) return

  if (error.value) {
    toastMessage.value = errorMessage
    toastType.value = 'error'
  } else {
    toastMessage.value = 'Successfully signed up!'
    toastType.value = 'success'
    email.value = ''
  }

  toast.value.openToast()
})
</script>

<style src="./NewsletterSection.styles.css" module />
