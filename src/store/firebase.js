import { defineStore } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { UseFirebaseDocs } from '@/hooks/useFirebaseDocs'

export const useFirebaseStore = defineStore('firebaseStore', {
  state: () => {
    return {
      db: null,
      auth: null,
      storage: null,
      isAuthenticated: false,
      isInitializing: true,
      user: null,
      profile: null
    }
  },
  getters: {
    firebaseDatabase: (state) => state.db,
    firebaseAuth: (state) => state.auth,
    authenticated: (state) => state.isAuthenticated,
    initializing: (state) => state.isInitializing,
    userEmail: (state) => state.user?.email,
    userProfile: (state) => state.profile
  },
  actions: {
    connectToFirebase() {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
      }

      const { refreshUserProfile } = UseFirebaseDocs.useFirebaseDocs()

      const app = initializeApp(firebaseConfig)

      this.db = getFirestore(app)
      this.auth = getAuth(app)
      this.storage = getStorage(app)

      onAuthStateChanged(this.auth, (user) => {
        if (this.isInitializing) this.isInitializing = false

        if (user) {
          this.isAuthenticated = true
          this.user = user
          refreshUserProfile()
        } else {
          this.isAuthenticated = false
          this.user = null
          this.profile = null
        }
      })
    },
    updateUserProfile(data) {
      this.profile = data
    },
    getCurrentUser() {
      const { refreshUserProfile } = UseFirebaseDocs.useFirebaseDocs()

      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          this.auth,
          async (user) => {
            if (user) {
              await refreshUserProfile()
            }
            unsubscribe()
            resolve(user)
          },
          reject
        )
      })
    }
  }
})
