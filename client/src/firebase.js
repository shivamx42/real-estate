// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-fd43f.firebaseapp.com",
  projectId: "real-estate-fd43f",
  storageBucket: "real-estate-fd43f.appspot.com",
  messagingSenderId: "158424945125",
  appId: "1:158424945125:web:30f58d1c1f1ca0b0a5df0c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);