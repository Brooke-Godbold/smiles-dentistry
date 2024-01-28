<template>
  <main :class="$style.page">
    <div :class="$style.pageTitleSection">
      <v-icon name="ri-star-smile-fill" />
      <h1>All Smiles Dentistry</h1>
      <v-icon name="ri-star-smile-fill" />
    </div>
    <HeroSection />
    <h2 :class="$style.pageHeading">Top Quality Procedures</h2>
    <ServiceItem service-id="checkup" />
    <ServiceItem service-id="extraction" />
    <h2 :class="$style.pageHeading">How To Find Us</h2>
    <LocationSection />
    <h2 :class="$style.pageHeading">Stay Up To Date</h2>
    <NewsletterSection />
  </main>
</template>

<script setup>
import HeroSection from '@/components/feature/home/hero/HeroSection.vue'
import ServiceItem from '@/components/feature/service/ServiceItem.vue'
import LocationSection from '@/components/feature/location/LocationSection.vue'
import NewsletterSection from '@/components/feature/home/newsletter/NewsletterSection.vue'
</script>

<style src="../../../styles/Page.styles.css" module />
