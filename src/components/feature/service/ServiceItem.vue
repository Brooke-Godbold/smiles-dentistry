<template>
  <BaseItem>
    <LoadingSpinner v-if="loading" />
    <div v-else :class="$style.serviceContainer" data-cy="service-item">
      <img :src="serviceData.src" :class="$style.serviceImage" />
      <div :class="$style.serviceImageGradient" />
      <div :class="$style.serviceInformation" data-cy="service-item-information">
        <h2 data-cy="service-item-title">{{ serviceData.title }}</h2>
        <p v-for="text in serviceData.content" :key="text" :class="$style.serviceText">
          {{ text }}
        </p>
      </div>
    </div>
  </BaseItem>
</template>

<script setup>
import LoadingSpinner from '../../ui/spinner/LoadingSpinner.vue'
import BaseItem from '../../ui/base-item/BaseItem.vue'

import { useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'

const props = defineProps({
  serviceId: String
})

const router = useRouter()

const serviceData = computed(() => {
  if (!data) return null

  return {
    content: data.value.description,
    title: data.value.title,
    src: data.value.image
  }
})

const { loading, data, loadSingleDoc } = UseFirebaseDocs.useFirebaseDocs()
loadSingleDoc('service', props.serviceId)

watch(data, (newData) => {
  if (!loading.value && !newData) {
    router.push({ name: 'NotFound' })
  }
})
</script>

<style src="./ServiceItem.styles.css" module />
