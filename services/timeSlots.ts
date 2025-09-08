// services/timeSlots.ts
import { db } from "@/utils/firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function getTimeSlots(date: string) {
    try {
        // Reference to the slots document for this barber and date
        const slotsRef = doc(db, "timeSlots", `${date}`);
        const slotsDoc = await getDoc(slotsRef);

        // Check if slots exist for this date and barber
        if (slotsDoc.exists()) {
            return slotsDoc.data().slots || [];
        } else {
            // Create default slots if none exist
            const defaultSlots = generateDefaultTimeSlots();

            // Save the default slots to Firestore
            await setDoc(slotsRef, {
                date,
                slots: defaultSlots
            });

            return defaultSlots;
        }
    } catch (error) {
        console.error("Error fetching time slots:", error);
        throw error;
    }
}

// Helper function to generate default time slots
function generateDefaultTimeSlots() {
    // Create slots from 9:00 to 19:00 with 30-minute intervals
    const slots = [];
    const startHour = 9;
    const endHour = 19;

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute of [0, 30]) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            slots.push({
                time: timeString,
                available: true
            });
        }
    }

    return slots;
}

// Function to update slot availability after booking
export async function updateSlotAvailability(date: string, time: string, available: boolean = false) {
    try {
        const slotsRef = doc(db, "timeSlots", `${date}`);
        const slotsDoc = await getDoc(slotsRef);

        if (slotsDoc.exists()) {
            const slots = slotsDoc.data().slots;
            const updatedSlots = slots.map((slot: any) => {
                if (slot.time === time) {
                    return { ...slot, available };
                }
                return slot;
            });

            await setDoc(slotsRef, {
                date,
                slots: updatedSlots

            });

            return updatedSlots;
        }

        return null;
    } catch (error) {
        console.error("Error updating slot availability:", error);
        throw error;
    }
}

export async function restoreSlotAvailability(
    available: boolean = true,
    oldTime: string,
    oldDate: string
) {
    try {
        const slotsRef = doc(db, "timeSlots", `${oldDate}`);
        const slotsDoc = await getDoc(slotsRef);

        if (slotsDoc.exists()) {
            const slots = slotsDoc.data().slots;
            const updatedSlots = slots.map((slot: any) => {
                if (slot.time === oldTime) {
                    return { ...slot, available };
                }
                return slot;
            });

            await setDoc(slotsRef, {
                date: oldDate,
                slots: updatedSlots,
            });

            return updatedSlots;
        }

        return null;
    } catch (error) {
        console.error("Error restoring slot availability:", error);
        throw error;
    }
}
