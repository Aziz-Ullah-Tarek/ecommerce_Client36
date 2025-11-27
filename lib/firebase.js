// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm2oAn0DiALyjnXCzZEllWojgSUSOXHYk",
  authDomain: "shophub-542da.firebaseapp.com",
  projectId: "shophub-542da",
  storageBucket: "shophub-542da.firebasestorage.app",
  messagingSenderId: "1068605131182",
  appId: "1:1068605131182:web:1a9b0f74ddadcb1a1fa03f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
