import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBstXWH5nwld2EsVnqfJw7rvyti9IQzhw4",
  authDomain: "indian-roasters.firebaseapp.com",
  projectId: "indian-roasters",
  storageBucket: "indian-roasters.firebasestorage.app",
  messagingSenderId: "216658784035",
  appId: "1:216658784035:web:15acb54173688b7273a696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
