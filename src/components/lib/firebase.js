// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

console.log(process.env.API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyBiBeKAirol6j3edSMiiWJqvU6aVANEbHc",
  authDomain: "reactquickchat.firebaseapp.com",
  projectId: "reactquickchat",
  storageBucket: "reactquickchat.appspot.com",
  messagingSenderId: "793841684500",
  appId: "1:793841684500:web:46523b85627d7ac1a85701"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);