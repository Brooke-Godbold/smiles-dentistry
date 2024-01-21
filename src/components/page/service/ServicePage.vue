<template>
  <section :class="$style.page">
    <ServiceItem />
  </section>
</template>

<script setup>
import ServiceItem from '../../feature/service/ServiceItem.vue'
</script>

<style src="./ServicePage.styles.css" module />
