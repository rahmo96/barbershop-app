// components/userHeader.tsx
import {View, Text, Pressable, Image, ActivityIndicator} from "react-native";
import { useUser } from "@/context/UserContext";
import React from "react";
import { useRouter } from "expo-router";
import NormalText from "./NormalText";
import { useLocalization } from "@/context/LocalizationContext";

export default function UserHeader() {
    const { current, loading, logout } = useUser();
    const router = useRouter();
    const { t } = useLocalization(); // Get the translation function

    if (loading) {
        return (
            <View className="w-full flex-row items-center justify-between p-4">
                <Text className="text-gray-500">{t("loading")}</Text>
                <ActivityIndicator size="small" color="gray" />
            </View>
        );
    }

    return (
        <View className="w-full flex-row-reverse items-center justify-between p-4 bg-primary-500 dark:bg-primary-900 rounded-full"
              style={{
                  shadowColor: "#000000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  // Android
                  elevation: 5,
              }}>
            {current ? (
                <View className="flex-row-reverse items-center space-x-reverse space-x-3">
                    <Image
                        source={{ uri: current.photoURL ?? "https://via.placeholder.com/40" }}
                        className="w-10 h-10 rounded-full"
                    />
                    <NormalText className="text-lg text-gray-900 dark:text-white">
                        {t("welcomeUser")} {current.displayName}
                    </NormalText>
                    <Pressable onPress={logout} className="mr-5 px-4 py-2 rounded-xl bg-blue-500">
                        <NormalText className="text-sm text-white font-semibold">{t("logout")}</NormalText>
                    </Pressable>
                </View>
            ) : (
                <View className="flex-row space-x-reverse space-x-3">
                    <Pressable
                        onPress={() => router.push("/login")}
                        className="px-2 py-2 rounded-full bg-secondary-700"
                    >
                        <NormalText className="text-white text-lg">{t("login")}</NormalText>
                    </Pressable>
                    <Pressable
                        onPress={() => router.push("/register")}
                        className="px-2 py-2 rounded-full bg-secondary-700"
                    >
                        <NormalText className="text-white text-lg">{t("register")}</NormalText>
                    </Pressable>
                </View>
            )}
        </View>
    );
}