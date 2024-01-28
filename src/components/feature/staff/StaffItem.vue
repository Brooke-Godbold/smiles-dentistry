<template>
  <BaseItem>
    <LoadingSpinner v-if="loading" />
    <div v-if="staffData" :class="$style.staffContainer">
      <img :src="staffData.profileImage" :class="$style.staffImage" />
      <div :class="$style.staffImageGradient" />
      <div :class="$style.staffInformation">
        <h1 :class="$style.staffName">{{ `${staffData.firstName} ${staffData.lastName}` }}</h1>
        <h2>{{ staffData.qualification }}</h2>
        <div :class="$style.servicesContainer">
          <span v-for="service in staffData.services" :key="service" :class="$style.serviceTag">
            {{ `${service.charAt(0).toUpperCase()}${service.slice(1)}s` }}
          </span>
        </div>
        <p :class="$style.staffText">{{ staffData.bio }}</p>
      </div>
    </div>
  </BaseItem>
</template>

<script setup>
import { useFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getStaffId from '@/utils/staffId'

import BaseItem from '../../ui/base-item/BaseItem.vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'

const router = useRouter()
const route = useRoute()

const staffData = ref(null)

const { loading, data, loadMultipleDocs } = useFirebaseDocs()
loadMultipleDocs('profile', [{ field: 'role', operator: '==', value: 'staff' }])

watch(data, (newData) => {
  if (!loading.value && !newData) {
    router.push({ name: 'NotFound' })
  } else {
    const staffDoc = newData.find(
      (doc) => route.params.staffId === getStaffId(doc.firstName, doc.lastName)
    )

    staffData.value = staffDoc
  }
})
</script>

<style src="./StaffItem.styles.css" module />
