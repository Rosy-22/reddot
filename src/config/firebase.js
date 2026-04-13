// src/config/firebase.js
// Firebase configuration for Red Dot app
// Replace these values with your own Firebase project credentials

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyC4eS_Cr2sxlmoCTvYXHwajj-J_DXIB71g",
  authDomain: "reddot-b1e86.firebaseapp.com",
  projectId: "reddot-b1e86",
  storageBucket: "reddot-b1e86.firebasestorage.app",
  messagingSenderId: "262679307000",
  appId: "1:262679307000:web:d3e81af139b978388ed10d",
  measurementId: "G-G1HJXFQ1B6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web'
    ? browserLocalPersistence
    : getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export default app;
