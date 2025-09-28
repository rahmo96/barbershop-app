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
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarLabel: "Profile",
                    }}
                />
                <Tabs.Screen
                    name="services"
                    options={{
                        title: "Services",
                        tabBarLabel: "Services",
                    }}
                />
                <Tabs.Screen
                    name="bookings"
                    options={{
                        title: "Bookings",
                        tabBarLabel: "Bookings",
                    }}
                />
            </Tabs>
        </UserProvider>
    );
}
