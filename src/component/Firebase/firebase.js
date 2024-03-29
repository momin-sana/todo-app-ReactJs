import { initializeApp } from "firebase/app";
// import firebase from "firebase/app"; // * this means import everthig from firebase as "firebase"
// import { getFirestore } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAP3PeLKd-oZ9UX0K9IC2dzH7yNP6LD1Ms",
    authDomain: "todo-app-e0f05.firebaseapp.com",
    databaseURL: "https://todo-app-e0f05-default-rtdb.firebaseio.com",
    projectId: "todo-app-e0f05",
    storageBucket: "todo-app-e0f05.appspot.com",
    messagingSenderId: "661120805591",
    appId: "1:661120805591:web:9d805fbb7a16727e1c5e92",
    measurementId: "G-8H7Y7LHNNB"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };