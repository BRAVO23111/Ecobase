// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADNBseee9d1zZuonKvARQoUbE_egLqZnk",
  authDomain: "community-e60e1.firebaseapp.com",
  projectId: "community-e60e1",
  storageBucket: "community-e60e1.appspot.com",
  messagingSenderId: "960869582819",
  appId: "1:960869582819:web:b5cadae538cdf022f202d6",
  measurementId: "G-EMZZZ3VKVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };

