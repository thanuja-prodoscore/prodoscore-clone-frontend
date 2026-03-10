import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBZtl-D3118DjgDWsE3HlY87rwbjsMcQvA",
    authDomain: "prodoscore-clone.firebaseapp.com",
    projectId: "prodoscore-clone",
    storageBucket: "prodoscore-clone.firebasestorage.app",
    messagingSenderId: "700070202283",
    appId: "1:700070202283:web:0b861390c93aec89f7a0ee"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();