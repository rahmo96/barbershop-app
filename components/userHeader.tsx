import {View, Text, Pressable, Image, ActivityIndicator} from "react-native";
import { useUser } from "@/context/UserContext";
import React from "react";
import { useRouter } from "expo-router";

export default function  UserHeader() {
    const { current, loading, logout } = useUser();
    const router = useRouter();

    if (loading) {
        return (
            <View className="w-full flex-row items-center justify-between p-4">
                <Text className="text-gray-500">טוען...</Text>
                <ActivityIndicator size="small" color="gray" />
            </View>
        );
    }

    return (
        <View className="w-full flex-row-reverse items-center justify-between p-4 bg-white dark:bg-primary-dark">
            {/* פרופיל או אייקון */}
            {current ? (
                <View className="flex-row items-center gap-3">
                    <Image
                        source={{ uri: current.prefs?.avatarUrl ?? "https://via.placeholder.com/40" }}
                        className="w-10 h-10 rounded-full"
                    />
                    <Text style={{ writingDirection: "rtl"}} className="text-lg font-bold text-gray-900 dark:text-white">
                        ברוך הבא {current.name}
                    </Text>
                    <Pressable onPress={logout} className="px-4 py-2 rounded-xl bg-blue-500">
                    <Text>התנתק</Text>
                    </Pressable>
                </View>
            ) : (
                <View className="flex-row gap-3">
                    <Pressable
                        onPress={() => router.push("/login")}
                        className="px-4 py-2 rounded-xl bg-brand-500"
                    >
                        <Text className="text-white font-semibold">התחברות</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => router.push("/register")}
                        className="px-4 py-2 rounded-xl bg-brand-200"
                    >
                        <Text className="text-white font-semibold">הרשמה</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
