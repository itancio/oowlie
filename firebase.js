import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import {env} from '@/config'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
//   authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
//   projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
//   storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID}`,
//   appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
//   // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`,
// };

// const firebaseConfig = {
//   apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
//   appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyChZOV2H3hdKZe6OOnB7yrYr5-Q7z38K90',
  authDomain: 'headstarter-f8961.firebaseapp.com',
  projectId: 'headstarter-f8961',
  storageBucket: 'headstarter-f8961.appspot.com',
  messagingSenderId: '502456132917',
  appId: '1:502456132917:web:77a3892543a67069e0d87c',
  measurementId: 'G-6L1JK3F53L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore()

export default db