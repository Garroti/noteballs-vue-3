import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC58mKkOi66-FggwXURZmcZEv91hwGQygg",
  authDomain: "noteballs-f8a89.firebaseapp.com",
  projectId: "noteballs-f8a89",
  storageBucket: "noteballs-f8a89.appspot.com",
  messagingSenderId: "860886797476",
  appId: "1:860886797476:web:3d97681b060dfee651aa31",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
