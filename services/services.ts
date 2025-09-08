import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createAppointment(data: any) {
    return await addDoc(collection(db, "services"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "booked",
    });
}
