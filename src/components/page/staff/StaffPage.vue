<template>
  <section :class="$style.page">
    <StaffItem v-if="staffId" :staff-id="staffId" />
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import StaffItem from '../../feature/staff/StaffItem.vue'
import { ref } from 'vue'

const route = useRoute()

const staffId = ref(route.params.staffId)
</script>

<style src="../../../styles/Page.styles.css" module />
