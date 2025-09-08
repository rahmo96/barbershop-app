import { db } from "@/utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function createUser(uid: string, data: any) {
    await setDoc(doc(db, "users", uid), {
        ...data,
        createdAt: new Date(),
    });
}

export async function getUser(uid: string) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
}

export async function updateUser(uid: string, data: any) {
    await setDoc(doc(db, "users", uid), {
        ...data,
        updatedAt: new Date(),
    });
    return getUser(uid);
}
