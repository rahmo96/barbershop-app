// app/(tabs)/appointments.tsx
import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";
import { useUser } from "@/context/UserContext";

// Configure Calendar locale for Hebrew
LocaleConfig.locales['he'] = {
    monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
    monthNamesShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוקט', 'נוב', 'דצמ'],
    dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    dayNamesShort: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\'']
};
LocaleConfig.defaultLocale = 'he';

export default function Appointments() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const { current, loading } = useUser();

    // Get params from route
    const { id, variantId, addOns, price, duration } = useLocalSearchParams();

    // Time slots
    const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

    // Calendar theme
    const theme = {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        calendarBackground: isDark ? '#1e293b' : '#ffffff',
        textSectionTitleColor: isDark ? '#e2e8f0' : '#334155',
        selectedDayBackgroundColor: isDark ? '#fbbf24' : '#713f12',
        selectedDayTextColor: '#ffffff',
        todayTextColor: isDark ? '#fbbf24' : '#713f12',
        dayTextColor: isDark ? '#e2e8f0' : '#334155',
        textDisabledColor: isDark ? '#475569' : '#cbd5e1',
        arrowColor: isDark ? '#e2e8f0' : '#334155',
        monthTextColor: isDark ? '#e2e8f0' : '#334155',
    };

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const markedDates = useMemo(() => ({
        [selectedDate]: {
            selected: true,
            selectedColor: isDark ? "#fbbf24" : "#713f12",
            selectedTextColor: "#ffffff",
        },
    }), [selectedDate, isDark]);

    // If still checking auth or loading, show loading state
    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-primary-light dark:bg-primary-dark">
                <Heading title="Loading..." />
            </SafeAreaView>
        );
    }

    // Redirect to login if not authenticated
    if (current === null) {
        return <Redirect href="/login" />;
    }

    const onConfirm = () => {
        if (!selectedSlot) return;
        router.push({
            pathname: "/confirm",
            params: {
                id, variantId, addOns,
                date: selectedDate,
                time: selectedSlot,
                price, duration,
            },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <View className="px-4">
                <Heading title="בחר תאריך ושעה" className="my-4 text-right" center={false} />
            </View>

            <Calendar
                markedDates={markedDates}
                onDayPress={(d) => { setSelectedDate(d.dateString); setSelectedSlot(null); }}
                theme={theme}
                enableSwipeMonths
                firstDay={0}
                style={{ marginHorizontal: 16, borderRadius: 12 }}
            />

            <View className="px-4 mt-4">
                <Text className="text-xl font-bold mb-2 text-brand-900 dark:text-brand-100 text-right">
                    בחר שעה ל-{selectedDate}:
                </Text>

                <View className="flex-row flex-wrap justify-center">
                    {timeSlots.map(time => (
                        <Pressable
                            key={time}
                            onPress={() => setSelectedSlot(time)}
                            className={`m-1 px-4 py-2 rounded-lg border ${
                                selectedSlot === time
                                    ? 'bg-brand-500 border-brand-600'
                                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                            }`}
                        >
                            <Text
                                className={`${
                                    selectedSlot === time
                                        ? 'text-white'
                                        : 'text-brand-900 dark:text-brand-100'
                                }`}
                            >
                                {time}
                            </Text>
                        </Pressable>
                    ))}
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