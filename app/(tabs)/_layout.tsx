// app/(tabs)/_layout.tsx
import React from "react";
import { View, useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";
import { icons } from "@/constants/icons";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <View className={`flex-1 ${isDark ? "dark bg-brand-950" : "bg-brand-100"}`}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: isDark ? "#0f172a" : "#ffffff",
                        borderTopColor: isDark ? "#1e293b" : "#e2e8f0",
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    tabBarActiveTintColor: "#0f766e",
                    tabBarInactiveTintColor: isDark ? "#94a3b8" : "#64748b",
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.home} title="Home" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.search} title="Search" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.beard} title="Profile" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="services"
                    options={{
                        title: "Services",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.sccissors} title="Services" />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}