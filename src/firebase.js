// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPbzfXHAtfZ1cARGg6R21DYz03mhKkZWI",
    authDomain: "mapwithnamay.firebaseapp.com",
    projectId: "mapwithnamay",
    storageBucket: "mapwithnamay.appspot.com",
    messagingSenderId: "564410836528",
    appId: "1:564410836528:web:cedb866d50d7fc963feff5",
    measurementId: "G-WM7015G4EK"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebasedb = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);