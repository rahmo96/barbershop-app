import React from "react";
import { View, Pressable, Text } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLocalization();

    return (
        <View className="flex-row space-x-2">
            <Pressable
                onPress={() => setLocale("en")}
                className={`px-3 py-1 rounded-full ${locale === "en" ? "bg-primary-500" : "bg-gray-300"}`}
            >
                <Text className={`${locale === "en" ? "text-white" : "text-black"}`}>EN</Text>
            </Pressable>
            <Pressable
                onPress={() => setLocale("he")}
                className={`px-3 py-1 rounded-full ${locale === "he" ? "bg-primary-500" : "bg-gray-300"}`}
            >
                <Text className={`${locale === "he" ? "text-white" : "text-black"}`}>HE</Text>
            </Pressable>
        </View>
    );
}