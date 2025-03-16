import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjeP98WAbUijqlwiFT9AYp6DjvpSJRgrs",
    authDomain: "testtopic-2e1a8.firebaseapp.com",
    projectId: "testtopic-2e1a8",
    storageBucket: "testtopic-2e1a8.firebasestorage.app",
    messagingSenderId: "757064210447",
    appId: "1:757064210447:web:96b97f4cf7bcd388e4ab7a"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
