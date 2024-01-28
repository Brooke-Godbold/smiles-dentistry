<template>
  <section :class="$style.page">
    <ServiceItem v-if="serviceId" :service-id="serviceId" />
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import ServiceItem from '../../feature/service/ServiceItem.vue'
import { ref } from 'vue'

const route = useRoute()

const serviceId = ref(route.params.serviceId)
</script>

<style src="../../../styles/Page.styles.css" module />
