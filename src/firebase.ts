import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBweyO2SLopth9C6sESDVKcTHORhvaIn6E",
  authDomain: "degrees-of-sepration.firebaseapp.com",
  projectId: "degrees-of-sepration",
  storageBucket: "degrees-of-sepration.appspot.com",
  messagingSenderId: "861082664106",
  appId: "1:861082664106:web:f29e9e7c89aa4ec08424d3",
  measurementId: "G-Y57X6W1VBV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
