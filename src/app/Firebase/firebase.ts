import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBq3mRfwuCLjHc6KF3lVveCTdHSGMM7iAU",
    authDomain: "saving-app-ea659.firebaseapp.com",
    projectId: "saving-app-ea659",
    storageBucket: "saving-app-ea659.firebasestorage.app",
    messagingSenderId: "504868264701",
    appId: "1:504868264701:web:f3f5a61c58d6120d3dfc94"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);