import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyAv25wXvCnVi3Xk95Bf0mN3W59uwmacDEY",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "bgmi-wdct-2d5d9.firebaseapp.com",
  projectId:
    process.env.REACT_APP_FIREBASE_PROJECT_ID || "bgmi-wdct-2d5d9",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "bgmi-wdct-2d5d9.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "298637543911",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:298637543911:web:c9967169a299fcedd9d542",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-16W1FS69SX",
};

// Initialize Firebase safely avoiding duplicate app initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
