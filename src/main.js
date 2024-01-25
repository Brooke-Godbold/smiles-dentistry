import './styles.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { RiStarSmileFill } from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

addIcons(RiStarSmileFill)

const store = createPinia()
const app = createApp(App)

app.use(store)
app.use(router)

app.component('v-icon', OhVueIcon)

app.mount('#app')
