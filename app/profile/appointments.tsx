// app/(tabs)/appointments.tsx
import React, { useMemo, useState, useEffect } from "react";
import { View, Alert, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from "react-native-calendars";
import { useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter, Redirect } from "expo-router";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";
import { useUser } from "@/context/UserContext";
import { getTimeSlots } from "@/services/timeSlots";
import NormalText from "@/components/NormalText";
import LoadingScreen from "@/components/LoadingScreen";
import TimeSlotGrid, { TimeSlot } from "@/components/TimeSlotGrid";
import { useLocalization } from "@/context/LocalizationContext";

export default function Appointments() {
    const router = useRouter();
    const { current, loading } = useUser();
    const { t } = useLocalization();
    const isDark = useColorScheme() === "dark";

    const { id: serviceId, variantId, description, addOns, price, duration } =
        useLocalSearchParams();
    const { title } = useLocalSearchParams() as { title: string };

    const today = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(true);


    // Load slots
    useEffect(() => {
        async function loadSlots() {
            setLoadingSlots(true);
            try {
                if (serviceId) {
                    const result = await getTimeSlots(selectedDate);
                    setSlots(result);
                } else {
                    setSlots([]);
                }
            } catch (err) {
                console.error("Failed to load slots:", err);
                setSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        }
        loadSlots();
    }, [selectedDate]);

    // Marked dates
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
            Alert.alert(t("error"), t("pleaseSelectTime"));
            return;
        }
        if (!serviceId) {
            Alert.alert(t("error"), "Missing service id");
            return;
        }

        router.push({
            pathname: "/confirm",
            params: {
                id: serviceId,
                serviceId: serviceId,
                variantId: variantId || "",
                addOns: JSON.stringify(addOns || []),
                title,
                description,
                date: selectedDate,
                time: selectedSlot?.time,
                price: price || 0,
                duration: duration || 0,
            },
        });
    };

    // Calendar theme
    const calendarTheme = {
        backgroundColor: isDark ? "#000000" : "#ffffff",
        calendarBackground: isDark ? "#000000" : "#ffffff",
        textSectionTitleColor: isDark ? "#b6c1cd" : "#b6c1cd",
        selectedDayBackgroundColor: isDark ? "#6faaf6" : "#358bf8",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#00adf5",
        dayTextColor: isDark ? "#ffffff" : "#2d4150",
        textDisabledColor: isDark ? "#4f4f4f" : "#d9e1e8",
        arrowColor: isDark ? "#b6c1cd" : "#00adf5",
        monthTextColor: isDark ? "#ffffff" : "#2d4150",
        textMonthFontWeight: "bold" as const,
        textDayHeaderFontWeight: "bold" as const,
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center">
            <ScrollView>
                <View className="px-4 mb-8 items-center">
                    <Heading title={t("bookAppointment")} className="my-4 text-right" center={false} />
                </View>

                {/* Calendar */}
                <Calendar
                    minDate={new Date().toISOString().slice(0, 10)}
                    maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))
                        .toISOString()
                        .slice(0, 10)}
                    markedDates={markedDates}
                    onDayPress={(d) => {
                        setSelectedDate(d.dateString);
                        setSelectedSlot(null);
                    }}
                    theme={calendarTheme}
                    enableSwipeMonths
                    firstDay={0}
                    style={{ marginHorizontal: 16, borderRadius: 12 }}
                />

                {/* Slots */}
                <View className="mt-6 mx-4">
                    <Heading title={t("selectTime")} className="text-lg" />
                    <NormalText>{`${t("for")} ${t(title)}`}</NormalText>

                    {loadingSlots ? (
                        <View className="items-center justify-center mt-4">
                            <ActivityIndicator size="large" />
                        </View>
                    ) : slots.length > 0 ? (
                        <TimeSlotGrid slots={slots} selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} />
                    ) : (
                        <View className="items-center justify-center mt-4">
                            <NormalText>{t("noAvailableSlots")}</NormalText>
                        </View>
                    )}

                    <View className="mt-6">
                        <RoundedButton
                            text={selectedSlot ? t("confirm") : t("selectTime")}
                            disabled={!selectedSlot}
                            onPress={onConfirm}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
