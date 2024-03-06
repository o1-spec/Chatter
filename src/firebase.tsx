import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH4NwWGtheajMyPUY7Wp4gx8je0nk7Z4E",
  authDomain: "chatter-71271.firebaseapp.com",
  projectId: "chatter-71271",
  storageBucket: "chatter-71271.appspot.com",
  messagingSenderId: "32733750572",
  appId: "1:32733750572:web:d3e4d2451f144bc4b4b889",
  measurementId: "G-ZR4BK0GJ7M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };