
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "social-media-app-8f707.firebaseapp.com",
    projectId: "social-media-app-8f707",
    storageBucket: "social-media-app-8f707.appspot.com",
    messagingSenderId: "1058085597148",
    appId: "1:1058085597148:web:80af9c5b654f228fb52919"
  };


const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db= getFirestore(app);
export const storage= getStorage(app);
export default app;