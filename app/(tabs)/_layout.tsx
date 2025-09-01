import React from "react";
import { View, useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";
import { icons } from "@/constants/icons";
import {UserProvider} from "@/context/UserContext";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <UserProvider>
        <View className= "flex-1 bg-primary-light dark:bg-primary-dark">
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
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "bold",
                        color: isDark ? "#eceff3" : "#64748b",
                    },
                    tabBarBackground: () => (
                        <View className="flex-1 bg-primary-light dark:bg-black" />
                    ),
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.home} title="" />
                        ),


                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.beard} title="" />
                        ),

                    }}

                />
                <Tabs.Screen
                    name="services"
                    options={{
                        title: "Services",
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={icons.sccissors} title="" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name = "appointments"
                    options={{
                        title: "Appointments",
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} icon={icons.calendar} title=""/>),
                    }}

                    />
            </Tabs>
        </View>
        </UserProvider>

    );
}