import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from "@/context/UserContext";
import { cancelAppointment, getUserAppointments } from "@/services/appointments";
import Heading from "@/components/Heading";
import NormalText from "@/components/NormalText";
import { Redirect, router, useFocusEffect } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import AnimatedScreen from "@/components/AnimatedScreen";

export default function Bookings() {
    const { current, loading } = useUser();
    const { t, locale } = useLocalization();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);

    async function loadAppointments() {
        if (!current) return;
        setLoadingAppointments(true);
        try {
            const data = await getUserAppointments(current.uid, ["booked", "rescheduled"]);
            setAppointments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAppointments(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadAppointments();
        }, [current])
    );

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    if (!current) {
        return <Redirect href="/login" />;
    }


    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, locale === 'he' ? 'dd בMMMM yyyy' : 'MMM dd, yyyy', {
                locale: locale === 'he' ? he : undefined
            });
        } catch (error) {
            console.error("Date formatting error:", error);
            return dateString;
        }
    };


    return (
        <AnimatedScreen type="fade" duration={400}>
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 px-4">
            <Heading className="my-6 text-center">{t("myAppointments")}</Heading>

            {loadingAppointments ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" />
                </View>
            ) : appointments.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <NormalText className="text-center">{t("noAppointments")}</NormalText>
                    <Pressable
                        className="bg-primary-500 px-5 py-3 rounded-lg mt-4"
                        onPress={() => router.push("/(tabs)/services")}
                    >
                        <Text className="text-white font-semibold">{t("bookAppointment")}</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 mt-6 shadow-sm justify-center items-center ">

                            <Text className="text-lg font-bold text-black dark:text-white mb-1">
                                {t(item.name as string)}
                            </Text>

                            <View className="flex-row justify-center items-center mt-2">
                                <View className="bg-primary-100 dark:bg-primary-900 px-3 py-1 rounded-full">
                                    <Text className="text-primary-700 dark:text-primary-300">
                                        {formatDate(item.date)}
                                    </Text>
                                </View>
                                <View className="bg-primary-100 dark:bg-primary-900 px-3 py-1 rounded-full ml-2">
                                    <Text className="text-primary-700 dark:text-primary-300">
                                        {item.time}
                                    </Text>
                                </View>
                            </View>

                            <View className="mt-3 items-center">
                                <Text className="text-gray-600 dark:text-gray-400">
                                    {t("duration")}: {item.duration} {t("minutes")}
                                </Text>
                                <Text className="text-gray-600 dark:text-gray-400">
                                    {t("price")}: ₪{item.price}
                                </Text>
                                {item.status === "rescheduled" && (
                                    <View className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded mt-2 justify-center">
                                        <Text className="text-yellow-800 dark:text-yellow-300 text-sm ">
                                            {t("rescheduled")}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <View className="flex-row mt-3 space-x-3 justify-between ">
                                <Pressable
                                    className="bg-red-400 px-8 py-3 rounded-lg"
                                    onPress={async () => {
                                        await cancelAppointment(item.id, item.time, item.date);
                                        setAppointments((prev) =>
                                            prev.filter((appt) => appt.id !== item.id)
                                        );
                                    }}
                                >
                                    <Text className="text-white">{t("cancel")}</Text>
                                </Pressable>

                                <Pressable
                                    className="bg-blue-500 px-8 py-3 rounded-lg"
                                    onPress={() => {
                                        router.push({
                                            pathname: "/bookings/updateAppointment",
                                            params: {
                                                id: item.id,
                                                name: item.name,
                                                variantId: item.variantId,
                                                addOns: item.addOns,
                                                date: item.date,
                                                time: item.time,
                                                duration: item.duration,
                                                price: item.price,
                                                status: item.status,
                                            },
                                        });
                                    }}
                                >
                                    <Text className="text-white">{t("update")}</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
        </AnimatedScreen>
    );
}