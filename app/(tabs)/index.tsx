import {Image, View, Pressable, useColorScheme, ScrollView, Text} from "react-native";
import "../globals.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import UserHeader from "@/components/userHeader";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming, withDelay, withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import {useRouter} from "expo-router";
import {useLocalization} from "@/context/LocalizationContext";
import {StatusBar} from "expo-status-bar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AnimatedScreen from "@/components/AnimatedScreen";

export default function HomeScreen() {
    const router = useRouter();
    const { t } = useLocalization();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Animation values
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30);
    const logoScale = useSharedValue(0.8);

    useEffect(() => {
        // Animate elements when component mounts
        opacity.value = withDelay(300, withTiming(1, { duration: 800 }));
        translateY.value = withDelay(300, withTiming(0, { duration: 800 }));
        logoScale.value = withSequence(
            withDelay(100, withTiming(1.1, { duration: 600 })),
            withTiming(1, { duration: 300 })
        );
    }, []);

    // Animation styles
    const contentStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }]
    }));

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }]
    }));

    return (
        <AnimatedScreen type="fade" duration={400}>
            <SafeAreaView className="flex-1 bg-primary-50 dark:bg-gray-900">
                <StatusBar style={isDark ? 'light' : 'dark'} />
                <UserHeader />

                <ScrollView className="flex-1">
                    <View className="items-center px-6 pt-8 pb-16">
                        {/* Logo and Title */}
                        <Animated.View style={logoStyle} className="items-center mb-8">
                            <Image
                                source={require('@/assets/images/logo.png')}
                                className="w-40 h-40 rounded-full"
                                resizeMode="cover"
                            />
                            <Text className="mt-4 justify-center text-3xl font-bold text-primary-800 dark:text-primary-200">
                                Elegant Cuts
                            </Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400 justify-center">
                                {t('premiumBarberExperience')}
                            </Text>
                        </Animated.View>

                        {/* Main content */}
                        <Animated.View style={contentStyle} className="w-full">
                            {/* Welcome Section */}
                            <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md mb-6 justify-center items-center">
                                <Text
                                    className="text-xl font-bold mb-3 text-primary-800 dark:text-primary-200"
                                    style={{ textAlign: "center" }}
                                >
                                    {t('welcome')}
                                </Text>
                                <Text
                                    className="text-gray-600 dark:text-gray-300 mb-4 justify-center items-center"
                                    style={{ textAlign: "center" }}
                                >
                                    {t('welcomeMessage')}
                                </Text>

                                <Pressable
                                    className="bg-primary-600 dark:bg-primary-700 py-3 rounded-full items-center"
                                    onPress={() => router.push('/services')}
                                >
                                    <Text className="text-white font-semibold">
                                        {t('exploreServices')}
                                    </Text>
                                </Pressable>
                            </View>

                            {/* Call to Action Buttons */}
                            <View className="flex-row justify-between w-full mb-6">
                                <Pressable
                                    className="bg-secondary-500 dark:bg-secondary-700 py-4 rounded-xl flex-1 mr-2 items-center"
                                    onPress={() => router.push('/bookings')}
                                >
                                    <Text className="text-white font-semibold">
                                        {t('bookings')}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    className="bg-primary-500 dark:bg-primary-700 py-4 rounded-xl flex-1 ml-2 items-center"
                                    onPress={() => router.push('/profile')}
                                >
                                    <Text className="text-white font-semibold">
                                        {t('profile')}
                                    </Text>
                                </Pressable>
                            </View>

                            {/* Features */}
                            <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                                <Text
                                    className="text-xl font-bold mb-4 text-primary-800 dark:text-primary-200"
                                    style={{ textAlign: "center" }}
                                >
                                    {t('whyChooseUs')}
                                </Text>

                                {[
                                    { title: t('professionalBarbers'), desc: t('professionalBarbersDesc') },
                                    { title: t('premiumProducts'), desc: t('premiumProductsDesc') },
                                    { title: t('convenientBooking'), desc: t('convenientBookingDesc') }
                                ].map((item, index) => (
                                    <View key={index} className="mb-4 last:mb-0">
                                        <Text
                                            className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200"
                                            style={{ textAlign: "center" }}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            className="text-gray-600 dark:text-gray-400"
                                            style={{ textAlign: "center" }}
                                        >
                                            {item.desc}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </Animated.View>
                    </View>
                    <View className="items-center">
                        <LanguageSwitcher/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AnimatedScreen>
    );
}