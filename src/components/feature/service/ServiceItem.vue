<template>
  <BaseItem>
    <LoadingSpinner v-if="loading" />
    <div v-else :class="$style.serviceContainer">
      <img :src="src" :class="$style.serviceImage" />
      <div :class="$style.serviceImageGradient" />
      <div :class="$style.serviceInformation">
        <h2>{{ title }}</h2>
        <p v-for="text in content" :key="text" :class="$style.serviceText">{{ text }}</p>
      </div>
    </div>
  </BaseItem>
</template>

<script setup>
import LoadingSpinner from '../../ui/spinner/LoadingSpinner.vue'
import BaseItem from '../../ui/base-item/BaseItem.vue'

import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useFirebaseStore } from '@/store/firebase'
import { doc, getDoc } from 'firebase/firestore'

const firebase = useFirebaseStore()

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const title = ref('')
const content = ref([])
const src = ref('')

async function getServiceData(serviceId) {
  loading.value = true

  const docRef = doc(firebase.firebaseDatabase, 'service', serviceId)
  const docSnap = await getDoc(docRef)
  const data = docSnap?.data()

  if (!data) {
    router.push({ name: 'NotFound' })
  } else {
    content.value = data?.description
    title.value = data?.title
    src.value = data?.image

    loading.value = false
  }
}

getServiceData(route.params.serviceId)

watch(
  () => route.params.serviceId,
  (serviceId) => {
    getServiceData(serviceId)
  }
)
</script>

<style src="./ServiceItem.styles.css" module />
