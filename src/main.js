import './styles.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  RiStarSmileFill,
  BiTwitter,
  BiFacebook,
  BiInstagram,
  GiHamburgerMenu
} from 'oh-vue-icons/icons'

import VueGoogleMaps from 'vue-google-maps-community-fork'

addIcons(RiStarSmileFill)
addIcons(BiTwitter)
addIcons(BiFacebook)
addIcons(BiInstagram)
addIcons(GiHamburgerMenu)

const store = createPinia()
const app = createApp(App)

app.use(store)
app.use(router)

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_API_KEY
  }
})

app.component('v-icon', OhVueIcon)

app.mount('#app')
