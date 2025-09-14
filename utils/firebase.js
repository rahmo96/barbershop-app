// utils/firebase.ts
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps } from "firebase/app";
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: "barbershop-app-d8e62.firebaseapp.com",
    projectId: "barbershop-app-d8e62",
    storageBucket: "barbershop-app-d8e62.firebasestorage.app",
    messagingSenderId: "450349008334",
    appId: "1:450349008334:web:dc06b48b3a55a19f8ed79f",
    measurementId: "G-LKWPDEFJNP",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const db = getFirestore(app);

let auth;
if (Platform.OS === "web") {
    auth = getAuth(app);
} else {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}

export { app, db, auth };
