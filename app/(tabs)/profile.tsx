
import React, { useEffect} from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Redirect } from "expo-router";
import { useUser } from "@/context/UserContext";
import Heading from "@/components/Heading";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { ProfileItem } from "@/components/ProfileItem";
import { Edit3, Calendar, LogOut } from "lucide-react-native";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLocalization } from '@/context/LocalizationContext';
import AnimatedScreen from "@/components/AnimatedScreen";

export default function Profile() {
    const { current, loading, logout } = useUser();
    const { t } = useLocalization();
    const router = useRouter();

    // Shared values for animations
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    // Animate on mount
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 800 });
        translateY.value = withTiming(0, { duration: 800 });
    }, [opacity, translateY]);

    // Animated styles
    const containerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    // If still loading, show loading state
    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
                <Heading title={t("loading")} />
            </SafeAreaView>
        );
    }

    // Redirect to login if not authenticated
    if (current === null) {
        return <Redirect href="/login" />;
    }

    return (
        <AnimatedScreen type="fade" duration={400}>
        <SafeAreaView className="flex-1 bg-primary-50 dark:bg-gray-900">
            <ScrollView>
                <Animated.View
                    style={containerStyle}
                    className="px-4 py-6"
                >
                    <Heading title={t("profile")} />

                    <View className="items-center mt-6 mb-8">
                        <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 items-center justify-center">
                            <Text className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                                {current.displayName ? current.displayName.charAt(0).toUpperCase() : "U"}
                            </Text>
                        </View>

                        <Text className="text-xl font-bold mb-1 text-black dark:text-white">
                            {current.displayName || t("user")}
                        </Text>

                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                            {current.email}
                        </Text>
                    </View>

                    <View className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6 text-center justify-center items-center">
                        <Text className="text-lg font-bold mb-4 text-black dark:text-white">
                            {t("accountSettings")}
                        </Text>

                        <View className="space-y-3">
                            <ProfileItem
                                title={t("editProfile")}
                                color="bg-blue-100 dark:bg-blue-900"
                                onPress={() => router.push("/profile/editProfile")}
                                icon={<Edit3 size={16} color="black" />}
                            />

                            <ProfileItem
                                title={t("myAppointments")}
                                color="bg-green-100 dark:bg-green-900"
                                onPress={() => router.push("/bookings")}
                                icon={<Calendar size={16} color="black" />}
                            />

                            <ProfileItem
                                title={t("logout")}
                                color="bg-red-100 dark:bg-red-900"
                                onPress={async () => {
                                    await logout();
                                    router.replace("/login");
                                }}
                                icon={<LogOut size={16} color="black" />}
                            />
                        </View>
                    </View>

                    <View className="items-center mt-4">
                        <LanguageSwitcher />
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
            </AnimatedScreen>
    );
}

