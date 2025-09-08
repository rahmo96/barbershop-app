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
        <View className= "flex-1 ">
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: isDark ? "#0a101c" : "#ffffff",
                        borderTopColor: "transparent",
                        elevation: 0,
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        shadowOffset: { height: -3, width: 0 },
                        height: 65,
                        paddingBottom: 8,
                    },
                    tabBarActiveTintColor: isDark? "#e8ebf1" : "#3b82f6", // Accent color
                    tabBarInactiveTintColor: isDark ? "#94a3b8" : "#64748b",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600",
                        paddingTop: 3.5
                    },
                    sceneStyle: { backgroundColor: isDark ? "#0a101c" : "#ffffff" },

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
                    name = "bookings"
                    options={{
                        title: "My Bookings",
                        tabBarIcon: ({focused}) => (
                            <TabIcon focused={focused} icon={icons.calendar} title=""/>),
                    }}

                    />
            </Tabs>
        </View>
        </UserProvider>

    );
}