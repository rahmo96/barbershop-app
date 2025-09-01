// app/(tabs)/profile.tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundedButton from "@/components/RoundedButtons";
import Heading from "@/components/Heading";
import { Redirect, useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";

const Profile = () => {
    const { current, loading, logout } = useUser();
    const router = useRouter();

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
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <Heading title="Your Profile" className="my-4" />

            <View className="items-center mb-6 px-4">
                <View className="w-24 h-24 rounded-full bg-brand-200 dark:bg-brand-800 mb-2" />
                <Text className="text-xl dark:text-brand-100 text-brand-900 font-bold">
                    {current?.name}
                </Text>
            </View>

            <View className="space-y-4 px-4">
                <RoundedButton text="My Appointments" route="/appointments" />
                <RoundedButton text="Edit Profile" route="/profile/editProfile" />
                <RoundedButton
                    text="Log Out"
                    onPress={async () => {
                        await logout();
                        router.replace("/login");
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Profile;