// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDxAb5oMZ0zrjOKfMF2NAHP4AHv3fb8Z4o",
//   authDomain: "react-todos-app-abf31.firebaseapp.com",
//   projectId: "react-todos-app-abf31",
//   storageBucket: "react-todos-app-abf31.appspot.com",
//   messagingSenderId: "741002195654",
//   appId: "1:741002195654:web:bb09b1d469bec35793ddc7"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAyQ0d2jya80wJJ8Tv2wfLflLn0taoeZaQ",
  authDomain: "elisha-361310.firebaseapp.com",
  projectId: "elisha-361310",
  storageBucket: "elisha-361310.appspot.com",
  messagingSenderId: "353228758235",
  appId: "1:353228758235:web:582a494dd078974a2e40fe",
  measurementId: "G-4R4767D1H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)