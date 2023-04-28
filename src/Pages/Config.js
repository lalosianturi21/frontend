// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider}  from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAjQKG32smHZEZLMj8KruNCmGKQyOt9uqM",
  authDomain: "bookstore-90f25.firebaseapp.com",
  projectId: "bookstore-90f25",
  storageBucket: "bookstore-90f25.appspot.com",
  messagingSenderId: "987625987957",
  appId: "1:987625987957:web:a2eece2d6a8499cd4d7d3c",
  measurementId: "G-3VYK6WPF4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };