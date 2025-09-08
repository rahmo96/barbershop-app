// app/confirm.tsx
import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import { useUser } from "@/context/UserContext";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";
import LoadingScreen from "@/components/LoadingScreen";
import { createAppointment } from "@/services/appointments"; // You'll need to create this service
import { updateSlotAvailability } from "@/services/timeSlots";

export default function ConfirmScreen() {
    const { current, loading } = useUser();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Extract and parse parameters
    const id = params.id as string;
    const variantId = params.variantId as string;
    let addOns: any[] = [];
    try {
        addOns = params.addOns ? JSON.parse(params.addOns as string) : [];
    } catch {
        addOns = Array.isArray(params.addOns) ? (params.addOns as string[]) : [];
    }
    const title = params.title as string;

    const date = params.date as string;
    const time = params.time as string;
    const price = parseFloat(params.price as string);
    const duration = parseInt(params.duration as string);
    const description = params.description as string;
    const barberId = params.barberId as string;

    // --- Guard for loading/not logged in ---
    if (loading) return <LoadingScreen />;
    if (!current) return <Redirect href="/login" />;

    // Calculate total price (implement if needed)
    const totalPrice = price; // Add add-ons price calculation if needed

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);


            // Create the appointment in Firebase
            await createAppointment({
                userId: current.uid,
                serviceId: id,
                name: title,
                variantId,
                addOns,
                date,
                time,
                price: totalPrice,
                duration,
                description: params.description as string,
                status: 'confirmed',
            });


            await updateSlotAvailability(date, time, false);

            // Show success message
            Alert.alert(
                "הזמנה התקבלה",
                "התור נקבע בהצלחה! תודה שבחרת בנו.",
                [{ text: "אישור", onPress: () => router.replace("/(tabs)/profile") }]
            );
        } catch (error) {
            console.error("Error creating appointment:", error);
            Alert.alert("שגיאה", "אירעה שגיאה בעת יצירת התור. אנא נסה שוב מאוחר יותר.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <View className="flex-1 px-4 py-6">
                <Heading title="אישור תור" className="text-center mb-8" />

                <View className="bg-secondary-light dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                    <Text className="text-primary-dark dark:text-primary-light text-lg mb-4 text-center font-bold">
                        פרטי ההזמנה
                    </Text>

                    <View className="mb-6 space-y-2">
                        <View className="flex-row justify-between">
                            <Text className="text-primary-dark dark:text-primary-light font-bold">תאריך:</Text>
                            <Text className="text-primary-dark dark:text-primary-light">{date}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-primary-dark dark:text-primary-light font-bold">שעה:</Text>
                            <Text className="text-primary-dark dark:text-primary-light">{time}</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-primary-dark dark:text-primary-light font-bold">משך:</Text>
                            <Text className="text-primary-dark dark:text-primary-light">{duration} דקות</Text>
                        </View>

                        <View className="flex-row justify-between">
                            <Text className="text-primary-dark dark:text-primary-light font-bold">מחיר:</Text>
                            <Text className="text-primary-dark dark:text-primary-light">₪{totalPrice}</Text>
                        </View>
                    </View>

                    <View className="mt-6 space-y-4">
                        <RoundedButton
                            text={isSubmitting ? "מאשר..." : "אישור והזמנה"}
                            onPress={handleConfirm}
                            disabled={isSubmitting}
                        />

                        {isSubmitting && (
                            <ActivityIndicator size="small" color="#713f12" className="my-2" />
                        )}

                        <RoundedButton
                            text="ביטול"
                            onPress={handleCancel}
                            disabled={isSubmitting}
                            className="bg-gray-400 dark:bg-gray-600"
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}