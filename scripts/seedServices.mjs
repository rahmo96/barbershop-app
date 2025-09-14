// scripts/seedServices.mjs

import {
    collection,
    doc,
    writeBatch,
    serverTimestamp,
    getFirestore
} from "firebase/firestore";
import {getApps, initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: 'barbershop-app-d8e62.firebaseapp.com',
    projectId: 'barbershop-app-d8e62',
    storageBucket: 'barbershop-app-d8e62.appspot.com',
    messagingSenderId: '450349008334',
    appId: '1:450349008334:web:dc06b48b3a55a19f8ed79f',
    measurementId: 'G-LKWPDEFJNP',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);



const services = [
    {
        id: "1",
        name: "Regular Haircut",
        description: "Classic haircut with clippers and scissors",
        image: "URL_TO_IMAGE",
        variants: [
            { id: "1-1", name: "Basic", price: 60, duration: 30 },
            { id: "1-2", name: "Premium", price: 80, duration: 45 },
        ],
        addOns: [
            { id: "a-1", name: "Styling", price: 20, duration: 10 },
            { id: "a-2", name: "Hair Wash", price: 15, duration: 10 },
        ],
    },
    {
        id: "2",
        name: "Beard Trim",
        description: "Trim your beard with precision",
        image: "URL_TO_IMAGE",
        variants: [
            { id: "2-1", name: "Basic", price: 40, duration: 20 },
            { id: "2-2", name: "Premium", price: 60, duration: 30 },
        ],
        addOns: [
            { id: "a-1", name: "Styling", price: 20, duration: 10 },
            { id: "a-2", name: "Color", price: 15, duration: 10 },
        ],
    },
    {
        id: "3",
        name: "Hair Dye",
        description: "Dye your hair with precision",
        image: "URL_TO_IMAGE",
        variants: [
            { id: "3-1", name: "Basic", price: 120, duration: 60 },
            { id: "3-2", name: "Premium", price: 160, duration: 80 },
        ],
        addOns: [
            { id: "a-1", name: "Styling", price: 20, duration: 10 },
            { id: "a-2", name: "Beard Color", price: 35, duration: 15 },
        ],
    },
];

async function seedServices() {
    const batch = writeBatch(db);

    for (const service of services) {
        const ref = doc(collection(db, "services"), service.id);
        batch.set(ref, {
            ...service,
            createdAt: serverTimestamp(),
        });
        console.log(`Prepared service: ${service.name}`);
    }

    await batch.commit();
    console.log("✅ Database seeding completed!");
}

seedServices().catch((err) => {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
});
