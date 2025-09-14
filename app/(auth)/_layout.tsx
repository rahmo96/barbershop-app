// app/(auth)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import {UserProvider} from "@/context/UserContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {SafeAreaView} from 'react-native-safe-area-context';


export default function AuthLayout() {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <UserProvider>
            <View className="flex-1 bg-primary-50 dark:bg-primary-900">
                <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
                <SafeAreaView className="items-center mt-4">
                    <LanguageSwitcher />
                </SafeAreaView>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: "transparent" },
                        animation: "fade",
                        animationDuration: 100,
                    }}
                >
                </Stack>
            </View>
        </UserProvider>    );
}