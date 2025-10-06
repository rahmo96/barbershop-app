import React from "react";
import { Tabs } from "expo-router";
import { UserProvider } from "@/context/UserContext";
import CustomTabBar from "@/components/CustomTabBar";

export default function TabsLayout() {
    return (
        <UserProvider>
            <Tabs
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{ headerShown: false }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarLabel: "Home",
                        tabBarIcon: require("@/assets/icons/home.png"),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarLabel: "Profile",
                        tabBarIcon: require("@/assets/icons/beard.png"),
                    }}
                />
                <Tabs.Screen
                    name="services"
                    options={{
                        title: "Services",
                        tabBarLabel: "Services",
                        tabBarIcon: require("@/assets/icons/sccissors.png"),
                    }}
                />
                <Tabs.Screen
                    name="bookings"
                    options={{
                        title: "Bookings",
                        tabBarLabel: "Bookings",
                        tabBarIcon: require("@/assets/icons/calendar.png"),
                    }}
                />
            </Tabs>
        </UserProvider>
    );
}
