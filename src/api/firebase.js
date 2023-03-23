
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    // apiKey: "AIzaSyAnfDiTlhfPJwZMXL5ZzkfYWc2snugeEDo",
    // authDomain: "project-2a9b5.firebaseapp.com",
    // projectId: "project-2a9b5",
    // storageBucket: "project-2a9b5.appspot.com",
    // messagingSenderId: "907288234927",
    // appId: "1:907288234927:web:2ec813fc2c0d85fbe8fd5a",
    // measurementId: "G-LH7900K2Z6"
    apiKey: "AIzaSyDuOq1z1ZIqXJys1rbXZ8mIpm0q3giCWcs",
    authDomain: "prison-dc882.firebaseapp.com",
    projectId: "prison-dc882",
    storageBucket: "prison-dc882.appspot.com",
    messagingSenderId: "742203756893",
    appId: "1:742203756893:web:1b6e5901c85109d2c058b4",
    measurementId: "G-F4ME7X041M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

