import './styles.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { RiStarSmileFill } from 'oh-vue-icons/icons'
import { BiTwitter } from 'oh-vue-icons/icons'
import { BiFacebook } from 'oh-vue-icons/icons'
import { BiInstagram } from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

import VueGoogleMaps from 'vue-google-maps-community-fork'

addIcons(RiStarSmileFill)
addIcons(BiTwitter)
addIcons(BiFacebook)
addIcons(BiInstagram)

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
