import { useFirebaseStore } from '@/store/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref } from 'vue'

function useFirebaseDocs() {
  const firebase = useFirebaseStore()

  const loading = ref(false)
  const error = ref(false)
  const data = ref(null)

  const storageDownloadUrl = ref(null)

  const loadingProfile = ref(false)

  const loadSingleDoc = async (collectionId, docId) => {
    loading.value = true
    error.value = false

    try {
      const docRef = doc(firebase.firebaseDatabase, collectionId, docId)
      const docSnap = await getDoc(docRef)
      data.value = docSnap.data()
    } catch (error) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const loadMultipleDocs = async (collectionId, queries) => {
    loading.value = true
    error.value = false

    try {
      const docRef = collection(firebase.db, collectionId)

      let docSnaps
      if (queries?.length > 0) {
        const queryFunctions = queries.map((query) =>
          where(query.field, query.operator, query.value)
        )
        const staffQuery = query(docRef, ...queryFunctions)
        docSnaps = await getDocs(staffQuery)
      } else {
        docSnaps = await getDocs(docRef)
      }

      data.value = docSnaps.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
    } catch (error) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const addDoc = async (collectionId, docId, data) => {
    loading.value = true
    error.value = false

    try {
      const userRef = doc(firebase.db, collectionId, docId)
      await setDoc(userRef, data, { merge: true })
    } catch (error) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const uploadToStorageBucket = async (file, filename) => {
    loading.value = true
    error.value = false

    try {
      const storageRef = firebaseRef(firebase.storage, filename)

      const snapshot = await uploadBytes(storageRef, file)
      storageDownloadUrl.value = await getDownloadURL(snapshot.ref)
    } catch (error) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const refreshUserProfile = async () => {
    const firebase = useFirebaseStore()

    loadingProfile.value = true
    error.value = false

    try {
      const docRef = doc(firebase.firebaseDatabase, 'profile', firebase.userEmail)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()

      firebase.updateUserProfile(data)
    } catch (error) {
      error.value = true
    } finally {
      loadingProfile.value = false
    }
  }

  const signup = async (username, password) => {
    const firebase = useFirebaseStore()

    loading.value = true
    error.value = false

    const auth = firebase.firebaseAuth
    try {
      await createUserWithEmailAndPassword(auth, username, password)
    } catch (error) {
      error.value = true
    } finally {
      loadingProfile.value = false
    }
  }

  const login = async (username, password) => {
    const firebase = useFirebaseStore()

    loading.value = true
    error.value = false

    const auth = firebase.firebaseAuth

    try {
      signInWithEmailAndPassword(auth, username, password)
    } catch (error) {
      error.value = true
    } finally {
      loadingProfile.value = false
    }
  }

  return {
    loading,
    loadingProfile,
    error,
    data,
    loadSingleDoc,
    loadMultipleDocs,
    addDoc,
    uploadToStorageBucket,
    storageDownloadUrl,
    refreshUserProfile,
    login,
    signup
  }
}

export const UseFirebaseDocs = {
  useFirebaseDocs
}
