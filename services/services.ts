// services/services.ts
import { db } from "@/utils/firebase";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";

// Fetch all services
export async function getServices() {
    try {
        const servicesRef = collection(db, "services");
        const servicesQuery = query(servicesRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(servicesQuery);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}

// Fetch a single service by ID
export async function getServiceById(serviceId: string) {
    try {
        const serviceDoc = await getDoc(doc(db, "services", serviceId));
        if (serviceDoc.exists()) {
            return {
                id: serviceDoc.id,
                name: serviceDoc.data().name,
                description: serviceDoc.data().description,
                image: serviceDoc.data().image,
                variants: serviceDoc.data().variants,
                addOns: serviceDoc.data().addOns,
                createdAt: serviceDoc.data().createdAt,
                updatedAt: serviceDoc.data().updatedAt,
                ...serviceDoc.data()
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching service:", error);
        throw error;
    }
}