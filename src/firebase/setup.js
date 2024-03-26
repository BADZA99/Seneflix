// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth,GoogleAuthProvider} from "firebase/auth";
import {  getFirestore} from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrFPabRRlf2osExuGImyE81CvpCbbVgEU",
  authDomain: "seneflix-1b911.firebaseapp.com",
  projectId: "seneflix-1b911",
  storageBucket: "seneflix-1b911.appspot.com",
  messagingSenderId: "616531228529",
  appId: "1:616531228529:web:90a67366c6553e000928d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth=new GoogleAuthProvider();
export const database = getFirestore(app);
