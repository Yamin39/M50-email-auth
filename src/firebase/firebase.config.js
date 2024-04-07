// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyHlcZpoZmrrqqWDVBOqsnxtQH1j9f7Ak",
  authDomain: "email-pass-auth-24ad4.firebaseapp.com",
  projectId: "email-pass-auth-24ad4",
  storageBucket: "email-pass-auth-24ad4.appspot.com",
  messagingSenderId: "551668616406",
  appId: "1:551668616406:web:b4d3b67b49d8bb923d4d77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
