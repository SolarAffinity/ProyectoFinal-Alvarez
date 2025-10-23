// Completa las variables en .env antes de usar este archivo
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const requiredEnv = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
]

// Aviso en desarrollo si falta alguna variable
if (import.meta.env?.DEV) {
  const missing = requiredEnv.filter(k => !import.meta.env[k])
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn(
      '[Firebase Config] Faltan variables en .env:',
      missing.join(', ')
    )
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
