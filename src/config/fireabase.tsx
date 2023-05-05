// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF_bSjEGEZlTZonpHLh8ruUlWr4YddDSg",
  authDomain: "emicatronic-3dcdf.firebaseapp.com",
  projectId: "emicatronic-3dcdf",
  storageBucket: "emicatronic-3dcdf.appspot.com",
  messagingSenderId: "519910345986",
  appId: "1:519910345986:web:51f66dd4753221ba85c61b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage}