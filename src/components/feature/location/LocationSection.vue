<template>
  <section :class="$style.locationSection">
    <BaseItem>
      <div :class="$style.locationContainer">
        <GMapMap
          :class="$style.mapsContainer"
          :center="center"
          :zoom="17"
          map-type-id="terrain"
          style="width: 100%; height: 60rem"
          :options="options"
        >
          <GMapMarker v-for="marker in markers" :key="marker.id" :position="marker.position" />
        </GMapMap>
        <div :class="$style.locationGradient" />
        <div :class="$style.locationInformation">
          <h2>Our Location</h2>
          <div :class="$style.addressSection">
            <p>123 Smile Street</p>
            <p>London</p>
            <p>SE16 7HH</p>
          </div>
          <p :class="$style.locationText">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Sed aliquam vitae nisi ut faucibus. Praesent tempor ut arcu sed ullamcorper. Nulla
            malesuada nulla nunc, vel lobortis dui mattis ut. Sed sed cursus leo. Quisque eu viverra
            velit. Duis et vehicula metus. Sed orci mi, semper ut suscipit et, accumsan quis ligula.
            Maecenas elementum nulla odio, fermentum pharetra mauris congue eget. Nulla ut odio eget
            ipsum ultrices molestie vitae at libero. Phasellus tempus fermentum metus, a euismod
            lorem tincidunt ut. Curabitur eget condimentum elit, sit amet venenatis erat. Mauris
            tellus risus, viverra porttitor ex lacinia, volutpat malesuada ipsum.
          </p>
        </div>
      </div>
    </BaseItem>
  </section>
</template>

<script setup>
import BaseItem from '@/components/ui/base-item/BaseItem.vue'
import { ref } from 'vue'

const center = ref({ lat: 51.5002267, lng: -0.0371318 })

const markers = [{ id: 'location', position: { lat: 51.5002267, lng: -0.0371318 } }]

const options = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  disableDefaultUi: true,
  clickableIcons: false
}
</script>

<style src="./LocationSection.styles.css" module />
