import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import { useUser } from "@/context/UserContext";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";
import LoadingScreen from "@/components/LoadingScreen";
import { updateAppointment } from "@/services/appointments";

export default function UpdateConfirm() {
    const { current, loading } = useUser();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const appointmentId = params.appointmentId as string;
    const newDate = params.newDate as string;
    const newTime = params.newTime as string;
    const oldDate = params.oldDate as string;
    const oldTime = params.oldTime as string;

    if (loading) return <LoadingScreen />;
    if (!current) return <Redirect href="/login" />;

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);

            await updateAppointment(
                appointmentId,
                newDate,
                newTime,
                oldDate,
                oldTime
            );

            Alert.alert("הצלחה", "התור עודכן בהצלחה", [
                { text: "אישור", onPress: () => router.replace("/(tabs)/bookings") },
            ]);
        } catch (error) {
            console.error("Error updating appointment:", error);
            Alert.alert("שגיאה", "אירעה שגיאה בעת עדכון התור");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <View className="flex-1 px-4 py-6">
                <Heading title="אישור שינוי תור" className="text-center mb-8" />

                <View className="bg-secondary-light dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                    <Text className="text-primary-dark dark:text-primary-light text-lg mb-4 text-center font-bold">
                        פרטי התור החדש
                    </Text>

                    <View className="mb-6 space-y-2">
                        <View className="flex-row justify-between">
                            <Text>תאריך:</Text>
                            <Text>{newDate}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text>שעה:</Text>
                            <Text>{newTime}</Text>
                        </View>
                    </View>

                    <RoundedButton
                        text={isSubmitting ? "מעדכן..." : "עדכן תור"}
                        onPress={handleConfirm}
                        disabled={isSubmitting}
                    />

                    {isSubmitting && (
                        <ActivityIndicator size="small" color="#358bf8" className="my-2" />
                    )}

                    <RoundedButton
                        text="ביטול"
                        onPress={() => router.back()}
                        disabled={isSubmitting}
                        className="bg-gray-400 dark:bg-gray-600 mt-4"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
