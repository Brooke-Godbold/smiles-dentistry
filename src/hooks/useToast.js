import { ref } from 'vue'

const type = ref('')
const message = ref('')
const toast = ref(null)

function useToast() {
  const open = (toastType, toastMessage) => {
    type.value = toastType
    message.value = toastMessage

    toast.value.openToast()
  }

  return { toast, type, message, open }
}

export const UseToast = {
  useToast
}
