<template>
  <BaseItem>
    <LoadingSpinner v-if="loading" />
    <section v-if="staffData" :class="$style.staffContainer" data-cy="staff-item">
      <img :src="staffData.profileImage" :class="$style.staffImage" />
      <div :class="$style.staffImageGradient" />
      <div :class="$style.staffInformation">
        <h1 :class="$style.staffName" data-cy="staff-item-name">
          {{ `${staffData.firstName} ${staffData.lastName}` }}
        </h1>
        <h2 data-cy="staff-item-qualification">{{ staffData.qualification }}</h2>
        <ul :class="$style.servicesContainer" data-cy="staff-item-services">
          <li v-for="service in staffData.services" :key="service">
            <span :class="$style.serviceTag">
              {{ `${service.charAt(0).toUpperCase()}${service.slice(1)}s` }}
            </span>
          </li>
        </ul>
        <p :class="$style.staffText" data-cy="staff-item-bio">{{ staffData.bio }}</p>
      </div>
    </section>
  </BaseItem>
</template>

<script setup>
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import getStaffId from '@/utils/staffId'

import BaseItem from '../../ui/base-item/BaseItem.vue'
import LoadingSpinner from '@/components/ui/spinner/LoadingSpinner.vue'

const props = defineProps({
  staffId: String
})

const router = useRouter()

const staffData = computed(() => {
  if (!data.value) return null

  const staffDoc = data.value.find(
    (doc) => props.staffId === getStaffId(doc.firstName, doc.lastName)
  )

  return staffDoc
})

const { loading, data, loadMultipleDocs } = UseFirebaseDocs.useFirebaseDocs()
loadMultipleDocs('profile', [{ field: 'role', operator: '==', value: 'staff' }])

watch(data, (newData) => {
  if (!loading.value && !newData) {
    router.push({ name: 'NotFound' })
  }
})
</script>

<style src="./StaffItem.styles.css" module />
