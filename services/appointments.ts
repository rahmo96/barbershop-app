import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp, updateDoc, doc, query, where, getDocs, orderBy } from "firebase/firestore";
import {updateSlotAvailability} from "@/services/timeSlots";

export async function createAppointment(data: any) {
    return await addDoc(collection(db, "appointments"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "booked",
    });

}

export async function getUserAppointments(userId: string, statuses: string[] = []) {
    try {
        let q;

        if (statuses.length > 0) {
            q = query(
                collection(db, "appointments"),
                where("userId", "==", userId),
                where("status", "in", statuses),
                orderBy("date", "desc"),
                orderBy("time", "desc")
            );
        } else {
            q = query(
                collection(db, "appointments"),
                where("userId", "==", userId),
                orderBy("date", "desc"),
                orderBy("time", "desc")
            );
        }

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (err) {
        console.error("Error fetching appointments:", err);
        throw err;
    }
}

export async function cancelAppointment(appointmentId: string, time: string, date: string) {
    try {
        await updateDoc(doc(db, "appointments", appointmentId), {
            status: "cancelled"
        });
        await updateSlotAvailability(date, time, true );
    } catch (err) {
        console.error("Error cancelling appointment:", err);
        throw err;
    }
}

export async function updateAppointment(appointmentId: string, newDate: string, newTime: string, oldDate: string, oldTime: string) {
    try {
        await updateDoc(doc(db, "appointments", appointmentId), {
            date: newDate,
            time: newTime,
            status: "rescheduled"
        });
        await updateSlotAvailability(newDate, newTime, false);
        await updateSlotAvailability(oldDate, oldTime, true);
    } catch (err) {
        console.error("Error updating appointment:", err);
        throw err;
    }
}
