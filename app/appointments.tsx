import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";

// הגדרות עברית ללוח שנה
LocaleConfig.locales["he"] = {
    monthNames: ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
    monthNamesShort: ["ינו׳","פבר׳","מרץ","אפר׳","מאי","יונ׳","יול׳","אוג׳","ספט׳","אוק׳","נוב׳","דצמ׳"],
    dayNames: ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],
    dayNamesShort: ["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"],
    today: "היום",
};
LocaleConfig.defaultLocale = "he";

const SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","16:00","16:30","17:00"];

export default function Appointments() {
    const router = useRouter();
    const isDark = useColorScheme() === "dark";

    // פרמטרים שהגעת איתם מהמסך הקודם (service-details)
    const { id = "1", price, duration, variantId, addOns } = useLocalSearchParams();

    const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const markedDates = useMemo(() => ({
        [selectedDate]: {
            selected: true,
            selectedColor: isDark ? "#fbbf24" : "#713f12",
            selectedTextColor: "#ffffff",
        },
    }), [selectedDate, isDark]);

    const theme = {
        calendarBackground: "transparent",
        monthTextColor: isDark ? "#f3f4f6" : "#111827",
        textSectionTitleColor: isDark ? "#cbd5e1" : "#64748b",
        dayTextColor: isDark ? "#e5e7eb" : "#0f172a",
        todayTextColor: isDark ? "#fbbf24" : "#713f12",
        selectedDayBackgroundColor: isDark ? "#fbbf24" : "#713f12",
        selectedDayTextColor: "#ffffff",
        arrowColor: isDark ? "#e5e7eb" : "#0f172a",
    } as const;

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
                // מראה ימי ראשון כראשון השבוע
                firstDay={0}
                style={{ marginHorizontal: 16, borderRadius: 12 }}
            />

            <View className="px-4 mt-4">
                <Text className="text-brand-900 dark:text-brand-100 mb-2 text-right" style={{ writingDirection: "rtl" }}>
                    בחר שעה:
                </Text>

                <View className="flex-row flex-wrap gap-2">
                    {SLOTS.map((t) => {
                        const selected = t === selectedSlot;
                        return (
                            <Pressable
                                key={t}
                                onPress={() => setSelectedSlot(t)}
                                className={[
                                    "px-4 py-2 rounded-full border",
                                    selected ? "bg-brand-500 border-brand-500" : "bg-transparent border-brand-300 dark:border-brand-700"
                                ].join(" ")}
                            >
                                <Text className={selected ? "text-white font-semibold" : "text-brand-900 dark:text-brand-100"}>
                                    {t}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <View className="mt-6">
                    <RoundedButton
                        text={selectedSlot ? "אישור" : "בחר שעה"}
                        disabled={!selectedSlot}
                        route={selectedSlot ? {
                            pathname: "/confirm",
                            params: { id, variantId, addOns, date: selectedDate, time: selectedSlot, price, duration }
                        } : undefined}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
