import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxQqRLZKSf9ePqJqhT-AKrWdW2z2OWWoo",
    authDomain: "barbershop-app-d8e62.firebaseapp.com",
    projectId: "barbershop-app-d8e62",
    storageBucket: "barbershop-app-d8e62.firebasestorage.app",
    messagingSenderId: "450349008334",
    appId: "1:450349008334:web:dc06b48b3a55a19f8ed79f",
    measurementId: "G-LKWPDEFJNP",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultTimes = [
    "10:00","10:30","11:00","11:30","12:00","12:30",
    "13:00","13:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30","18:00"
];

async function seedTimeSlot(date) {
    const slotId = `${date}`;
    const slots = defaultTimes.map(time => ({
        time,
        available: true,
        appointmentId: null,
    }));

    await setDoc(doc(db, "timeSlots", slotId), {
        date,
        slots,
    });

    console.log(`Created time slots for ${date}`);
}

// טווח תאריכים
function generateDates(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]); // YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

async function seedTimeSlots(barberIds, startDate, endDate) {
    const dates = generateDates(startDate, endDate);
    console.log(`Seeding ${dates.length} days × ${barberIds.length} barbers...`);

    for (const barberId of barberIds) {
        for (const date of dates) {
            try {
                await seedTimeSlot(date, barberId);
            } catch (error) {
                console.error(`Error seeding ${date} - ${barberId}:`, error);
            }
        }
    }

    console.log("Time slot seeding completed!");
}

const barberIds = ["barber123", "barber456"];
const startDate = new Date();
const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 1);

seedTimeSlots(barberIds, startDate, endDate)
    .then(() => console.log("✅ Seeding finished successfully"))
    .catch((err) => console.error("❌ Seeding failed:", err));
