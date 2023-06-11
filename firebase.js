// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

//Below the import code
const db = getFirestore(app);
export default db;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_KEY,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: "rakht-daan-plus",
  storageBucket: "rakht-daan-plus.appspot.com",
  messagingSenderId: "734943543994",
  appId: "1:734943543994:web:adabd6ce7f82eb1c147883",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
