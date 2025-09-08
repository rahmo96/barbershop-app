import React, { useMemo, useState, useEffect } from "react";
import { View, Pressable, Alert } from "react-native";
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
    monthNames: ["ינואר","פברואר","מרץ","אפריל","מאי","יוני",
        "יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
    monthNamesShort: ["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצ"],
    dayNames: ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],
    dayNamesShort: ["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"],
};
LocaleConfig.defaultLocale = "he";

export default function UpdateAppointments() {
    const router = useRouter();
    const { current, loading } = useUser();
    const isDark = useColorScheme() === "dark";
    const params = useLocalSearchParams();

    const today = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(true);

    useEffect(() => {
        async function loadSlots() {
            setLoadingSlots(true);
            try {
                const result = await getTimeSlots(selectedDate);
                setSlots(result);
            } catch (err) {
                console.error("Failed to load slots:", err);
                setSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        }
        loadSlots();
    }, [selectedDate]);

    const markedDates = useMemo(() => ({
        [selectedDate]: {
            selected: true,
            selectedColor: isDark ? "#6faaf6" : "#358bf8",
            selectedTextColor: "#ffffff",
        },
    }), [selectedDate, isDark]);

    if (loading) return <NormalText>טוען...</NormalText>;
    if (!current) return <Redirect href="/login" />;

    const onConfirm = () => {
        if (!selectedSlot) {
            Alert.alert("שגיאה", "אנא בחר שעה חדשה");
            return;
        }

        router.push({
            pathname: "/updateConfirm",
            params: {
                appointmentId: params.id,
                serviceId: params.serviceId,
                name: params.name,
                description: params.description,
                price: params.price,
                duration: params.duration,
                oldDate: params.date,
                oldTime: params.time,
                newDate: selectedDate,
                newTime: selectedSlot,
            },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center">
            <View className="px-4 mb-8 items-center">
                <Heading title="בחר תאריך ושעה חדשים" className="my-4 text-right" center={false} />
            </View>

            <Calendar
                minDate={today}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().slice(0, 10)}
                markedDates={markedDates}
                onDayPress={(d) => {
                    setSelectedDate(d.dateString);
                    setSelectedSlot(null);
                }}
                theme={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    calendarBackground: isDark ? "#1e293b" : "#ffffff",
                    selectedDayBackgroundColor: isDark ? "#6faaf6" : "#358bf8",
                    todayTextColor: isDark ? "#6faaf6" : "#358bf8",
                }}
            />

            <View className="px-4 mt-4">
                <NormalText className="text-xl mb-2 text-black dark:text-white text-right">
                    שעות זמינות ל־{selectedDate}:
                </NormalText>

                <View className="flex-row flex-wrap justify-center">
                    {loadingSlots ? (
                        <NormalText>טוען שעות...</NormalText>
                    ) : slots.length === 0 ? (
                        <NormalText>אין שעות זמינות</NormalText>
                    ) : (
                        slots.map(({ time, available }) => (
                            <Pressable
                                key={time}
                                disabled={!available}
                                onPress={() => setSelectedSlot(time)}
                                className={`m-1 px-4 py-2 rounded-lg border ${
                                    selectedSlot === time
                                        ? "bg-primary-600 dark:bg-primary-300"
                                        : available
                                            ? "bg-white dark:bg-gray-800 border-primary-600"
                                            : "bg-gray-200 dark:bg-red-300"
                                }`}
                            >
                                <NormalText
                                    className={`text-sm ${
                                        selectedSlot === time ? "text-white" : available ? "text-black dark:text-white" : "text-gray-500 line-through"
                                    }`}
                                >
                                    {time}
                                </NormalText>
                            </Pressable>
                        ))
                    )}
                </View>

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
