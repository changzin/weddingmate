// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APP_KEY,
  authDomain: "weddingmate-5e6b4.firebaseapp.com",
  projectId: "weddingmate-5e6b4",
  storageBucket: "weddingmate-5e6b4.appspot.com",
  messagingSenderId: "239083146635",
  appId: "1:239083146635:web:a9651ba53d9f245bc2338e"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);