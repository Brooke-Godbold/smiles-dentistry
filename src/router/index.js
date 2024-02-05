import { useFirebaseStore } from '@/store/firebase'
import { createRouter, createWebHistory } from 'vue-router'

const ServicePage = () => import('../components/page/service/ServicePage.vue')
const StaffPage = () => import('../components/page/staff/StaffPage.vue')
const NotFound = () => import('../components/page/not-found/NotFound.vue')
const Home = () => import('../components/page/home/HomePage.vue')
const NewAppointment = () => import('../components/page/appointment/NewAppointmentPage.vue')

const Profile = () => import('../components/page/profile/ProfilePage.vue')
const ProfileDetails = () =>
  import('../components/feature/profile/profile-details/ProfileDetails.vue')
const UserAppointments = () =>
  import('../components/feature/profile/user-appointments/UserAppointments.vue')
const StaffAppointments = () =>
  import('../components/feature/profile/staff-appointments/StaffAppointments.vue')

const Admin = () => import('../components/page/admin/AdminPage.vue')
const UserManagement = () =>
  import('../components/feature/admin/user-management/UserManagement.vue')
const AppointmentManagement = () =>
  import('../components/feature/admin/appointment-management/AppointmentManagement.vue')
const AppointmentDetail = () =>
  import('../components/feature/admin/appointment-detail/AppointmentDetail.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/service/:serviceId', name: 'Service', component: ServicePage },
    { path: '/staff/:staffId', name: 'Staff', component: StaffPage },
    {
      path: '/appointment/new',
      name: 'Appointment',
      component: NewAppointment,
      meta: { userAccess: true }
    },
    {
      path: '/profile',
      component: Profile,
      meta: { userAccess: true },
      children: [
        { path: '', redirect: { name: 'ProfileDetails' } },
        { path: 'details', name: 'ProfileDetails', component: ProfileDetails },
        { path: 'appointments', name: 'UserAppointments', component: UserAppointments },
        {
          path: 'upcoming-appointments',
          name: 'StaffAppointments',
          component: StaffAppointments,
          meta: { staffAccess: true }
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        { path: '', redirect: { name: 'UserManagement' } },
        {
          path: 'users',
          name: 'UserManagement',
          component: UserManagement,
          meta: { adminAccess: true }
        },
        {
          path: 'appointments',
          name: 'AppointmentManagement',
          component: AppointmentManagement,
          meta: { receptionAccess: true }
        },
        {
          path: 'appointments/:appointmentId',
          name: 'AppointmentDetail',
          component: AppointmentDetail,
          meta: { receptionAccess: true }
        }
      ]
    },
    { path: '/:notFound(.*)*', name: 'NotFound', component: NotFound }
  ]
})

router.beforeEach(async (to, from, next) => {
  const firebase = useFirebaseStore()

  if (to.matched.some((route) => route.meta.adminAccess)) {
    if (!(await firebase.getCurrentUser())) {
      next({ name: 'NotFound' })
    } else {
      if (firebase.userProfile?.role !== 'admin') {
        next({ name: 'NotFound' })
      } else {
        next()
      }
    }
  } else if (to.matched.some((route) => route.meta.staffAccess)) {
    if (!(await firebase.getCurrentUser())) {
      next({ name: 'NotFound' })
    } else {
      if (
        firebase.userProfile?.role !== 'staff' ||
        firebase.userProfile?.services.includes('reception')
      ) {
        next({ name: 'NotFound' })
      } else {
        next()
      }
    }
  } else if (to.matched.some((route) => route.meta.receptionAccess)) {
    if (!(await firebase.getCurrentUser())) {
      next({ name: 'NotFound' })
    } else {
      if (
        firebase.userProfile?.role === 'admin' ||
        (firebase.userProfile?.role === 'staff' &&
          firebase.userProfile?.services.includes('reception'))
      ) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  } else if (to.matched.some((route) => route.meta.userAccess)) {
    if (!(await firebase.getCurrentUser())) next({ name: 'Home' })
    else next()
  } else {
    next()
  }
})

export default router
