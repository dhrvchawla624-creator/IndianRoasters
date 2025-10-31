import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// Replace this with the config object you copied from the Firebase console
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
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();