<template>
  <BaseItem>
    <div :class="$style.heroContainer">
      <img
        :src="`https://firebasestorage.googleapis.com/v0/b/smiles-dentistry.appspot.com/o/hero.jpg?alt=media&token=dd69fa23-7ab0-44a5-91f1-6cca84fc10ad`"
        :class="$style.heroImage"
      />
      <div :class="$style.heroImageGradient" />
      <div :class="$style.heroInformation">
        <h2 cy-data="hero-heading">Everyone Deserves An Award Winning Smile!</h2>
        <p :class="$style.heroText">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Sed aliquam vitae nisi ut faucibus. Praesent tempor ut arcu sed ullamcorper. Nulla
          malesuada nulla nunc, vel lobortis dui mattis ut. Sed sed cursus leo. Quisque eu viverra
          velit. Duis et vehicula metus. Sed orci mi, semper ut suscipit et, accumsan quis ligula.
          Maecenas elementum nulla odio, fermentum pharetra mauris congue eget. Nulla ut odio eget
          ipsum ultrices molestie vitae at libero. Phasellus tempus fermentum metus, a euismod lorem
          tincidunt ut. Curabitur eget condimentum elit, sit amet venenatis erat. Mauris tellus
          risus, viverra porttitor ex lacinia, volutpat malesuada ipsum.
        </p>
        <p :class="$style.heroText">
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Vivamus in lorem in odio pellentesque lobortis quis in tortor. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Duis placerat libero vel metus dictum,
          vitae euismod dui tincidunt. Pellentesque luctus nibh at fringilla sagittis. Praesent nec
          tincidunt lorem, et tempus magna. Sed et fringilla massa. Donec rutrum urna nec neque
          scelerisque aliquet. Quisque dignissim tortor nibh, eget varius felis lobortis vel. Nulla
          consectetur risus a dui egestas, id consectetur justo bibendum. In laoreet mi purus, a
          eleifend velit porttitor at. Curabitur augue massa, pharetra vitae vestibulum pulvinar,
          pulvinar eu urna. Aenean vel lacus et justo tempus volutpat. Phasellus laoreet dolor quis
          libero dignissim dignissim. Fusce pulvinar elit id aliquam viverra. Fusce vitae urna eu
          ante suscipit aliquam at nec nisl. Aenean ac efficitur orci. Pellentesque interdum
          pulvinar feugiat. Nunc sem enim, sagittis auctor commodo ac, tempus a nunc. Suspendisse
          fermentum tempus condimentum.
        </p>
        <div :class="$style.heroContact">
          <BaseButton link="Appointment" :alt="true" cy-data="hero-button">
            <p>Make an Appointment Now</p>
          </BaseButton>
          <h2>OR</h2>
          <p>Call us on:</p>
          <h1 cy-data="hero-phone">01784 998 778</h1>
        </div>
      </div>
    </div>
  </BaseItem>
</template>

<script setup>
import BaseItem from '@/components/ui/base-item/BaseItem.vue'
import BaseButton from '@/components/ui/base-button/BaseButton.vue'
</script>

<style src="./HeroSection.styles.css" module />
