import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa7lYiqfCVxxAolWxWEYOMp3NmcCmBVMk",
  authDomain: "lucas-cyber-academy.firebaseapp.com",
  projectId: "lucas-cyber-academy",
  storageBucket: "lucas-cyber-academy.firebasestorage.app",
  messagingSenderId: "806737639025",
  appId: "1:806737639025:web:8667b1eced81b6b7e48dd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
