import { Stack } from "expo-router";
import { View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/context/UserContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
    const scheme = useColorScheme() ?? "light";

    return (
        <LocalizationProvider>
        <SafeAreaProvider>
                <UserProvider>
                    <View className="flex-1">
                        <StatusBar style={scheme === "dark" ? "light" : "dark"} />
                        <SafeAreaView edges={['top']} className="absolute top-0 right-0 z-50">
                        </SafeAreaView>
                        <Stack
                            initialRouteName="(tabs)"
                            screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: "transparent" },
                                animation:"fade",
                                animationDuration: 200,
                            }}
                        />
                    </View>
                </UserProvider>
        </SafeAreaProvider>
        </LocalizationProvider>

    );
}