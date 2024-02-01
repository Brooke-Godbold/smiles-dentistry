import axios from 'axios'
import { ref } from 'vue'

function useBrevo() {
  const loading = ref(false)
  const error = ref(false)
  const errorMessage = ref('')

  const addEmailContact = async (email) => {
    error.value = false
    loading.value = true

    try {
      await axios.post(
        'https://api.brevo.com/v3/contacts',
        {
          email,
          listIds: [2]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'api-key': import.meta.env.VITE_BREVO_API_KEY
          }
        }
      )
    } catch (error) {
      error.value = true

      if (error.code === 'duplicate_parameter') {
        errorMessage.value = 'You have already signed up!'
      } else {
        errorMessage.value = 'Unable to sign up at this time'
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, error, addEmailContact }
}

export const UseBrevo = {
  useBrevo
}
