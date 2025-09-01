// app/(auth)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import {UserProvider} from "@/context/UserContext";


export default function AuthLayout() {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <UserProvider>
            <View  className= "flex-1 bg-primary-light dark:bg-primary-dark"  >
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
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
            </UserProvider>
    );
}