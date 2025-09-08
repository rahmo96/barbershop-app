import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/context/UserContext";
import { cancelAppointment, getUserAppointments } from "@/services/appointments";
import Heading from "@/components/Heading";
import NormalText from "@/components/NormalText";
import { Redirect, router, useFocusEffect } from "expo-router";

export default function Bookings() {
    const { current, loading } = useUser();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);

    async function loadAppointments() {
        if (!current) return;
        setLoadingAppointments(true);
        try {
            const data = await getUserAppointments(current.uid ,["booked", "rescheduled"]);
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

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black px-4 py-6">
            <Heading title="התורים שלי" />

            {loadingAppointments ? (
                <ActivityIndicator size="large" className="mt-6" />
            ) : appointments.length === 0 ? (
                <NormalText className="mt-6 text-center text-gray-500">
                    אין לך תורים עתידיים
                </NormalText>
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="p-4 mb-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Text className="text-lg font-bold text-black dark:text-white">
                                {item.date} בשעה {item.time}
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-300">
                                משך: {item.duration} דקות | ₪{item.price}
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-300">
                                סטטוס: {item.status}
                            </Text>

                            {/* כפתורי פעולה */}
                            <View className="flex-row mt-3 space-x-3">
                                <Pressable
                                    className="bg-red-500 px-3 py-2 rounded-lg"
                                    onPress={async () => {
                                        await cancelAppointment(item.id, item.time, item.date);
                                        setAppointments((prev) =>
                                            prev.filter((appt) => appt.id !== item.id)
                                        );
                                    }}
                                >
                                    <Text className="text-white">בטל</Text>
                                </Pressable>

                                <Pressable
                                    className="bg-blue-500 px-3 py-2 rounded-lg"
                                    onPress={() => {
                                        router.push({
                                            pathname: "/updateAppointment",
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
                                    <Text className="text-white">עדכן</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
