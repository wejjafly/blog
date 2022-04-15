import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBXG78iidC_iqBQfqfCUZx6ghvfK638Z0s",
    authDomain: "blog-6fb70.firebaseapp.com",
    projectId: "blog-6fb70",
    storageBucket: "blog-6fb70.appspot.com",
    messagingSenderId: "780689262144",
    appId: "1:780689262144:web:e547929a41aeadb28801a5",
    measurementId: "G-BHDEPWZGK5"
  };
  
const firebaseApp = initializeApp(firebaseConfig);  
const db = getFirestore(firebaseApp); 
const auth = getAuth(firebaseApp);

export {db, auth};