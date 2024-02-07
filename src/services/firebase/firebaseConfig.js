import { initializeApp } from "firebase/app"
import { getFirestore, setLogLevel } from 'firebase/firestore'

const firebaseConfig = {

    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
  }

  const app = initializeApp(firebaseConfig)

  setLogLevel('debug')


  export const db = getFirestore(app)