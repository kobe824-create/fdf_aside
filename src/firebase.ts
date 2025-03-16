import { getApp, initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDweKjzFtoCPPRP70J3mG-C1cO9I7kwbEE",
    authDomain: "fdf-project-01.firebaseapp.com",
    projectId: "fdf-project-01",
    storageBucket: "fdf-project-01.appspot.com", // ✅ Fixed storageBucket
    messagingSenderId: "321921137340",
    appId: "1:321921137340:web:4c009fdd7aaa4b6361aeb9",
    measurementId: "G-T1B4G3283D",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
console.log("Firebase initialized:", app.name); // ✅ Debugging log

const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
