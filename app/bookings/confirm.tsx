import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUser } from "@/context/UserContext";
import { useLocalization } from "@/context/LocalizationContext";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";
import { createAppointment } from "@/services/appointments";
import { updateSlotAvailability } from "@/services/timeSlots";


export default function Confirm() {
    const { t } = useLocalization();
    const { current } = useUser();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isDark = useColorScheme() === "dark";

    // Extract and parse params
    const title = params.title as string;
    const serviceId = params.serviceId as string;
    const description = params.description as string;
    const date = params.date as string;
    const time = params.time as string;
    const price = parseFloat(params.price as string);
    const duration = parseInt(params.duration as string);
    const variantId = params.variantId as string || null;
    const addOns = params.addOns ? JSON.parse(params.addOns as string) : [];

    // Calculate total price (base + addons)
    const totalPrice = price;

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);

            await createAppointment({
                userId: current.uid,
                serviceId: serviceId,
                name: title,
                variantId,
                addOns,
                date,
                time,
                price: totalPrice,
                duration,
                description,
                status: "confirmed",
            });

            // Update slot availability
            await updateSlotAvailability(date, time, false);

            Alert.alert(
                t("appointmentSuccessTitle"),
                t("appointmentSuccessMessage"),
                [
                    { text: t("ok"), onPress: () => router.replace("/(tabs)/profile") },
                ]
            );
        } catch (error) {
            console.error("Error creating appointment:", error);
            Alert.alert(
                t("errorTitle"),
                t("appointmentErrorMessage")
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <ScrollView>
                <View className="px-4 py-6">
                    <Heading title={t("confirmationDetails")} />

                    <View className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 mt-6 justify-center items-center">
                        <Text className="text-lg font-bold mb-3 text-black dark:text-white">
                            {t(title)}
                        </Text>

                        <View className="space-y-4">

                            <View className="items-center">
                                <Text className="text-xl text-gray-500 dark:text-gray-400">
                                    {t("date")}
                                </Text>
                                <Text className="text-lg font-medium text-black dark:text-white">
                                    {date}
                                </Text>
                            </View>

                            <View className="items-center">
                                <Text className="text-xl text-gray-500 dark:text-gray-400">
                                    {t("time")}
                                </Text>
                                <Text className="text-lg font-medium text-black dark:text-white">
                                    {time}
                                </Text>
                            </View>

                            <View className="items-center">
                                <Text className="text-xl text-gray-500 dark:text-gray-400">
                                    {t("duration")}
                                </Text>
                                <Text className="text-lg font-medium text-black dark:text-white">
                                    {duration} {t("minutes")}
                                </Text>
                            </View>

                            <View className="items-center">
                                <Text className="text-xl text-gray-500 dark:text-gray-400">
                                    {t("price")}
                                </Text>
                                <Text className="text-lg font-medium text-black dark:text-white">
                                    ₪{totalPrice}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="mt-6 space-y-4">
                        <RoundedButton
                            text={isSubmitting ? t("approving") : t("confirmAndContinue")}
                            onPress={handleConfirm}
                            disabled={isSubmitting}
                        />

                        {isSubmitting && (
                            <ActivityIndicator size="small" color={isDark ? "#fff" : "#000"} />
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}