<template>
  <footer :class="$style.footer">
    <ul :class="$style.footerLinks" cy-data="footer-links">
      <li><router-link :to="{ name: 'Home' }">Privacy Policy</router-link></li>
      <li><router-link :to="{ name: 'Home' }">Terms & Conditions</router-link></li>
      <li><router-link :to="{ name: 'Home' }">Contact</router-link></li>
      <li><router-link :to="{ name: 'Home' }">Careers</router-link></li>
    </ul>
    <ul :class="$style.socialLinks" cy-data="footer-social">
      <li>
        <a href="#"><v-icon name="bi-twitter" /></a>
      </li>
      <li>
        <a href="#"><v-icon name="bi-facebook" /></a>
      </li>
      <li>
        <a href="#"><v-icon name="bi-instagram" /></a>
      </li>
    </ul>
  </footer>
</template>

<style src="./TheFooter.styles.css" module />
