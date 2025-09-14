// app/updateAppointment.tsx
import React, { useState, useEffect, useMemo } from "react";
import { View, Alert, useColorScheme, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from "react-native-calendars";
import { useRouter, useLocalSearchParams, Redirect } from "expo-router";
import { useUser } from "@/context/UserContext";
import { useLocalization } from "@/context/LocalizationContext";
import { getAvailableTimeSlots } from "@/services/timeSlots";
import Heading from "@/components/Heading";
import NormalText from "@/components/NormalText";
import LoadingScreen from "@/components/LoadingScreen";
import RoundedButton from "@/components/RoundedButtons";
import TimeSlotGrid from "@/components/TimeSlotGrid";
import type { TimeSlot} from "@/components/TimeSlotGrid";

export default function UpdateAppointments() {
    const router = useRouter();
    const { current, loading } = useUser();
    const { t } = useLocalization();
    const isDark = useColorScheme() === "dark";
    const params = useLocalSearchParams();
    const name = params.name as string;

    const today = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(true);

    // Calendar theme
    const calendarTheme = {
        backgroundColor: isDark ? '#000000' : '#ffffff',
        calendarBackground: isDark ? '#000000' : '#ffffff',
        textSectionTitleColor: isDark ? '#b6c1cd' : '#b6c1cd',
        textSectionTitleDisabledColor: isDark ? '#d9e1e8' : '#d9e1e8',
        selectedDayBackgroundColor: isDark ? '#6faaf6' : '#358bf8',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: isDark ? '#ffffff' : '#2d4150',
        textDisabledColor: isDark ? '#4f4f4f' : '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: isDark ? '#b6c1cd' : '#00adf5',
        disabledArrowColor: isDark ? '#4f4f4f' : '#d9e1e8',
        monthTextColor: isDark ? '#ffffff' : '#2d4150',
        indicatorColor: isDark ? '#ffffff' : '#2d4150',
        textMonthFontWeight: "bold" as const,
        textDayHeaderFontWeight: "bold" as const,
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14
    };

    // Load available time slots for the selected date
    useEffect(() => {
        async function loadSlots() {
            setLoadingSlots(true);
            try {
                const slotsData = await getAvailableTimeSlots(selectedDate);
                setSlots(slotsData);
            } catch (error) {
                console.error("Error loading time slots:", error);
                Alert.alert(t("error"), t("errorLoadingSlots"));
            } finally {
                setLoadingSlots(false);
            }
        }
        loadSlots();
    }, [selectedDate]);

    // Marked dates for calendar
    const markedDates = useMemo(() => ({
        [selectedDate]: {
            selected: true,
            selectedColor: isDark ? "#6faaf6" : "#358bf8",
            selectedTextColor: "#ffffff",
        },
    }), [selectedDate, isDark]);

    if (loading) return <LoadingScreen />;
    if (!current) return <Redirect href="/login" />;

    const onConfirm = () => {
        if (!selectedSlot) {
            Alert.alert(t("error"), t("pleaseSelectTime"));
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
                newTime: selectedSlot?.time,
            },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center">
            <ScrollView>
            <View className="px-4 mb-8 items-center">
                <Heading title={t("updateAppointment")} className="my-4 text-right" center={false} />
            </View>

            {/* Calendar */}
            <Calendar
                minDate={new Date().toISOString().slice(0, 10)}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))
                    .toISOString().slice(0, 10)}
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

            {/* Time slots */}
            <View className="mt-6 mx-4">
                <Heading title={t("selectTime")} className="text-lg" />
                <NormalText>{`${t("for")} ${t(name)}`}</NormalText>


                {loadingSlots ? (
                    <View className="items-center justify-center mt-4">
                        <ActivityIndicator size="large" />
                    </View>
                ) : slots.length > 0 ? (
                    <TimeSlotGrid
                        slots={slots}
                        selectedSlot={selectedSlot}
                        onSelectSlot={setSelectedSlot}
                    />
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