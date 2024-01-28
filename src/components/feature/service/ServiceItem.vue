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

import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useFirebaseDocs } from '@/hooks/useFirebaseDocs'

const props = defineProps({
  serviceId: String
})

const router = useRouter()

const title = ref('')
const content = ref([])
const src = ref('')

const { loading, data, loadSingleDoc } = useFirebaseDocs()
loadSingleDoc('service', props.serviceId)

watch(data, (newData) => {
  if (!loading.value && !newData) {
    router.push({ name: 'NotFound' })
  } else {
    content.value = newData.description
    title.value = newData.title
    src.value = newData.image
  }
})
</script>

<style src="./ServiceItem.styles.css" module />
