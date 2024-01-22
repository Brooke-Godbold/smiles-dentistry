import { createRouter, createWebHistory } from 'vue-router'

const ServicePage = () => import('../components/page/service/ServicePage.vue')
const NotFound = () => import('../components/page/not-found/NotFound.vue')
const Home = () => import('../components/page/home/HomePage.vue')
const NewAppointment = () => import('../components/page/appointment/NewAppointmentPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/service/:serviceId', name: 'Service', component: ServicePage },
    { path: '/appointment/new', name: 'Appointment', component: NewAppointment },
    { path: '/:notFound(.*)*', name: 'NotFound', component: NotFound }
  ]
})

export default router
