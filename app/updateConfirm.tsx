// app/updateConfirm.tsx
import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams, Redirect } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from "@/context/UserContext";
import { updateAppointment } from "@/services/appointments";
import RoundedButton from "@/components/RoundedButtons";
import Heading from "@/components/Heading";
import { useLocalization } from "@/context/LocalizationContext";
import { format, parseISO } from "date-fns"; // Add parseISO
import { he } from "date-fns/locale";
import LoadingScreen from "@/components/LoadingScreen";

export default function UpdateConfirm() {
    const { current, loading } = useUser();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t, locale } = useLocalization();

    const appointmentId = params.appointmentId as string;
    const newDate = params.newDate as string;
    const newTime = params.newTime as string;
    const oldDate = params.oldDate as string;
    const oldTime = params.oldTime as string;
    const title = params.name as string;


    if (loading) return <LoadingScreen />;
    if (!current) return <Redirect href="/login" />;

    // Format dates safely
    const formatDateTime = (dateStr: string, timeStr: string) => {
        try {
            // Ensure time format is valid (HH:MM)
            if (!timeStr || !/^\d{1,2}:\d{2}$/.test(timeStr)) {
                return `${dateStr} (${timeStr})`;
            }

            // Ensure we have a valid ISO format
            const isoString = `${dateStr}T${timeStr.padStart(5, '0')}:00`;
            return format(parseISO(isoString), 'PPpp', {
                locale: locale === 'he' ? he : undefined
            });
        } catch (error) {
            console.error("Date formatting error:", error);
            return `${dateStr} ${timeStr}`;
        }
    };

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

            Alert.alert(t("success"), t("appointmentUpdated"), [
                { text: t("confirm"), onPress: () => router.replace("/(tabs)/bookings") },
            ]);
        } catch (error) {
            console.error("Error updating appointment:", error);
            Alert.alert(t("error"), t("updateError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="p-4 flex-1">
                <Heading title={t("confirmationDetails")} className="my-4" />

                <View className="space-y-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg justify-center items-center">
                    <View className="space-y-2">
                        <Text className="text-gray-600 dark:text-gray-400">{t("service")}:</Text>
                        <Text className="text-black dark:text-white text-lg">{t(title)}</Text>
                    </View>

                    <View className="space-y-2">
                        <Text className="text-gray-600 dark:text-gray-400">{t("oldDate")}:</Text>
                        <Text className="text-black dark:text-white">
                            {formatDateTime(oldDate, oldTime)}
                        </Text>
                    </View>

                    <View className="space-y-2">
                        <Text className="text-gray-600 dark:text-gray-400">{t("newDate")}:</Text>
                        <Text className="text-black dark:text-white font-bold">
                            {formatDateTime(newDate, newTime)}
                        </Text>
                    </View>
                </View>

                <View className="items-center mt-auto">
                    <RoundedButton
                        text={isSubmitting ? t("updating") : t("updateAppointment")}
                        onPress={handleConfirm}
                        disabled={isSubmitting}
                    />

                    {isSubmitting && (
                        <ActivityIndicator size="small" color="#358bf8" className="my-2" />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}