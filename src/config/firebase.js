import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBe5C6sck22FmaD8_Kea_a3fD-eJpU-ZP0",
  authDomain: "books-app-821a9.firebaseapp.com",
  projectId: "books-app-821a9",
  storageBucket: "books-app-821a9.appspot.com",
  messagingSenderId: "135860180882",
  appId: "1:135860180882:web:87db0d553260ca7b79534b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();