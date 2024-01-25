import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDyvo5kFAFJI7Q0HzZ1R0RJ_K5rj0BfmnY",
    authDomain: "nonadelma-coder.firebaseapp.com",
    projectId: "nonadelma-coder",
    storageBucket: "nonadelma-coder.appspot.com",
    messagingSenderId: "124490811025",
    appId: "1:124490811025:web:9eb148e7950aad3e41a130"
  }

  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app)