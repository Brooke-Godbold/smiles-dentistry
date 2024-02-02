<template>
  <footer :class="$style.footer">
    <div :class="$style.footerLinks" cy-data="footer-links">
      <router-link :to="{ name: 'Home' }">Privacy Policy</router-link>
      <router-link :to="{ name: 'Home' }">Terms & Conditions</router-link>
      <router-link :to="{ name: 'Home' }">Contact</router-link>
      <router-link :to="{ name: 'Home' }">Careers</router-link>
    </div>
    <div :class="$style.socialLinks" cy-data="footer-social">
      <a href="#"><v-icon name="bi-twitter" /></a>
      <a href="#"><v-icon name="bi-facebook" /></a>
      <a href="#"><v-icon name="bi-instagram" /></a>
    </div>
  </footer>
</template>

<style src="./TheFooter.styles.css" module />
