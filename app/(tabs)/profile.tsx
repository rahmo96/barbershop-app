// app/(tabs)/profile.tsx
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundedButton from "@/components/RoundedButtons";
import Heading from "@/components/Heading";
import { Redirect, useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";
import { ProfileItem } from "@/components/ProfileItem";
import { Edit3, Calendar, LogOut } from "lucide-react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";

const Profile = () => {
    const { current, loading, logout } = useUser();
    const router = useRouter();

    // Shared values
    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);

    // Fade in for whole screen
    const fadeStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    // Scale animation for avatar
    const avatarStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Animate on mount
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000 });
    }, []);

    // Handle press on avatar
    const handleAvatarPress = () => {
        scale.value = withSpring(scale.value === 1 ? 1.1 : 1);
    };

    // Show loading state
    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-primary-light dark:bg-primary-dark">
                <Heading title="Loading..." />
            </SafeAreaView>
        );
    }

    // Redirect if not logged in
    if (current === null) {
        return <Redirect href="/login" />;
    }

    return (
        <SafeAreaView className="flex-1 bg-primary-50 dark:bg-black">
            <Animated.View style={[fadeStyle]} className="flex-1 px-5">
                <View className="items-center pt-6 pb-8">
                    {/* Avatar with press scale */}
                    <Pressable onPress={handleAvatarPress}>
                        <Animated.View
                            style={[avatarStyle]}
                            className="w-28 h-28 rounded-full bg-brand-200 dark:bg-brand-800 mb-4 overflow-hidden border-4 border-white dark:border-gray-800 shadow-md"
                        />
                    </Pressable>

                    <Heading className="text-2xl text-gray-500 dark:text-gray-400 mb-1">
                        {current?.displayName}
                    </Heading>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                        {current?.email}
                    </Text>
                </View>

                {/* Profile Items with stagger animation */}
                <View className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm mb-5">
                    <Text className="text-lg font-bold text-black dark:text-white mb-4 text-right">
                        משתמש
                    </Text>

                    <View className="space-y-3">
                        <StaggeredItem delay={200}>
                            <ProfileItem
                                title="ערוך פרופיל"
                                color="bg-blue-100 dark:bg-blue-900"
                                onPress={() => router.push("/profile/editProfile")}
                                icon={<Edit3 size={16} color="black" />}
                            />
                        </StaggeredItem>

                        <StaggeredItem delay={400}>
                            <ProfileItem
                                title="התורים שלי"
                                color="bg-green-100 dark:bg-green-900"
                                onPress={() => router.push("/bookings")}
                                icon={<Calendar size={16} color="black" />}
                            />
                        </StaggeredItem>

                        <StaggeredItem delay={600}>
                            <ProfileItem
                                title="התנתק"
                                color="bg-red-100 dark:bg-red-900"
                                onPress={async () => {
                                    await logout();
                                    router.replace("/login");
                                }}
                                icon={<LogOut size={16} color="black" />}
                            />
                        </StaggeredItem>
                    </View>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

// Helper component for staggered fade/slide
const StaggeredItem = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
        translateY.value = withDelay(delay, withSpring(0));
    }, []);

    const style = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return <Animated.View style={style}>{children}</Animated.View>;
};

export default Profile;
