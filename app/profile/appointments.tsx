// app/(tabs)/appointments.tsx
import React, { useMemo, useState, useEffect } from "react";
import {View, Text, Pressable, Alert, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";
import { useUser } from "@/context/UserContext";
import { getTimeSlots } from "@/services/timeSlots";
import NormalText from "@/components/NormalText";

LocaleConfig.locales["he"] = {
    monthNames: [
        "ינואר","פברואר","מרץ","אפריל","מאי","יוני",
        "יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"
    ],
    monthNamesShort: ["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצ"],
    dayNames: ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],
    dayNamesShort: ["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"],
};
LocaleConfig.defaultLocale = "he";

function LoadingScreen() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-primary-light dark:bg-primary-dark">
            <Heading title="טוען..." />
        </SafeAreaView>
    );
}

export default function Appointments() {
    const router = useRouter();
    const { current, loading } = useUser();
    const isDark = useColorScheme() === "dark";

    const { id: serviceId, title, variantId, description, addOns, price, duration } = useLocalSearchParams();

    const today = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(true);

// In appointments.tsx - update the useEffect hook that loads slots
    useEffect(() => {
        async function loadSlots() {
            setLoadingSlots(true);
            try {
                if (serviceId) {
                    const result = await getTimeSlots(selectedDate);
                    setSlots(result);
                } else {
                    // If no barber is selected, show an empty list or default slots
                    setSlots([]);
                    // Alternatively, you could show a message to select a barber first
                }
            } catch (err) {
                console.error("Failed to load slots:", err);
                setSlots([]);
                // Consider showing an error message to the user
            } finally {
                setLoadingSlots(false);
            }
        }
        loadSlots();
    }, [selectedDate]);

    const markedDates = useMemo(
        () => ({
            [selectedDate]: {
                selected: true,
                selectedColor: isDark ? "#6faaf6" : "#358bf8",
                selectedTextColor: "#ffffff",
            },
        }),
        [selectedDate, isDark]
    );

    if (loading) return <LoadingScreen />;
    if (!current) return <Redirect href="/login" />;

    const onConfirm = () => {
        if (!selectedSlot) {
            Alert.alert("שגיאה", "אנא בחר שעה לפני האישור");
            return;
        }
        if (!serviceId) {
            Alert.alert("שגיאה", "חסר מזהה שירות. נסה שוב.");
            return;
        }

        router.push({
            pathname: "/confirm",
            params: {
                id: serviceId,
                variantId: variantId || "",
                addOns: JSON.stringify(addOns || []),
                title: title,
                description: description,
                date: selectedDate,
                time: selectedSlot,
                price: price || 0,
                duration: duration || 0,
            },
        });
    };

    const calendarTheme = {
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        calendarBackground: isDark ? "#1e293b" : "#ffffff",
        textSectionTitleColor: isDark ? "#e2e8f0" : "#334155",
        selectedDayBackgroundColor: isDark ? "#6faaf6" : "#358bf8",
        selectedDayTextColor: "#ffffff",
        todayTextColor: isDark ? "#6faaf6" : "#358bf8",
        dayTextColor: isDark ? "#e2e8f0" : "#334155",
        textDisabledColor: isDark ? "#475569" : "#cbd5e1",
        arrowColor: isDark ? "#e2e8f0" : "#334155",
        monthTextColor: isDark ? "#e2e8f0" : "#334155",
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center">
            <View className="px-4 mb-8 items-center">
                <Heading title="בחר תאריך ושעה" className="my-4 text-right" center={false} />
            </View>

            {/* לוח שנה */}
            <Calendar
                minDate={new Date().toISOString().slice(0, 10)}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))
                    .toISOString().slice(0, 10)}                markedDates={markedDates}
                onDayPress={(d) => {
                    setSelectedDate(d.dateString);
                    setSelectedSlot(null);
                }}
                theme={calendarTheme}
                enableSwipeMonths
                firstDay={0}
                style={{ marginHorizontal: 16, borderRadius: 12 }}
            />

            {/* שעות זמינות */}
            <View className="px-4 mt-4">
                <NormalText className="text-xl mb-2 text-black dark:text-white text-right">
                    שעות זמינות ל־{selectedDate}:
                </NormalText>

                <View className="flex-row flex-wrap justify-center">
                    {loadingSlots ? (
                        <NormalText className="text-black dark:text-white">טוען שעות...</NormalText>
                    ) : slots.length === 0 ? (
                        <NormalText className="text-black dark:text-white">אין שעות זמינות</NormalText>
                    ) : (
                        slots.map(({ time, available }) => (
                            <Pressable
                                key={time}
                                disabled={!available}
                                onPress={() => setSelectedSlot(time)}
                                className= {`m-1 px-4 py-2 rounded-lg border ${
                                    selectedSlot === time
                                        ? "bg-primary-600 dark:bg-primary-300" 
                                        : available
                                            ? "bg-white dark:bg-gray-800 border-primary-600 dark:border-primary-300"  // Available slots with brand color border
                                            : "bg-gray-200 dark:bg-red-300 border-primary-300"  // Unavailable slots
                                }`}
                            >
                                <NormalText
                                    className={` text-sm ${
                                        selectedSlot === time
                                            ? "text-white"  // White text on selected
                                            : available
                                                ? "text-black dark:text-white"  // Brand text for available
                                                : "text-gray-500 line-through"  // Gray text for unavailable
                                    }`}
                                >
                                    {time}
                                </NormalText>
                            </Pressable>
                        ))
                    )}
                </View>

                {/* כפתור אישור */}
                <View className="mt-6">
                    <RoundedButton
                        text={selectedSlot ? "אישור" : "בחר שעה"}
                        disabled={!selectedSlot}
                        onPress={onConfirm}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
