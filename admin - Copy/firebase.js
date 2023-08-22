// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcoMTcsTQle8zh4RvaqGKUjE5h1UVFK1E",
  authDomain: "myapp-b8baf.firebaseapp.com",
  projectId: "myapp-b8baf",
  storageBucket: "myapp-b8baf.appspot.com",
  messagingSenderId: "177204929789",
  appId: "1:177204929789:web:1187d687071cf7f795ca94"
};

// Initialize Firebase

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

let app;
if(firebase.apps.length === 0){
 app= firebase.initializeApp(firebaseConfig);
}else{
app= firebase.app()
}
const db =getDatabase();
export const auth = getAuth();

//export {db};
export {firebase,db};