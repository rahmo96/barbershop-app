// app/(tabs)/services.tsx
import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Heading from "@/components/Heading";
import { useUser } from "@/context/UserContext";

// Mock data
const SERVICES = [
    {
        id: "1",
        name: "תספורת רגילה",
        description: "תספורת קלאסית עם מכונה ומספריים",
        price: 60,
        image: require("@/assets/images/haircut.png"),
    },
    {
        id: "2",
        name: "תספורת + זקן",
        description: "תספורת מלאה עם עיצוב זקן",
        price: 80,
        image: require("@/assets/images/beard.png"),
    },
    {
        id: "3",
        name: "עיצוב זקן",
        description: "עיצוב וסידור הזקן",
        price: 40,
        image: require("@/assets/images/beard.png"),
    },
];

export default function Services() {
    const router = useRouter();
    const { current } = useUser();

    const handlePress = (item: any) => {
        if (!current) {
            router.push("/login");
        } else {
            router.push(`/service-details?id=${item.id}`);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <Heading title="השירותים שלנו" className="my-4" />

            <FlatList
                data={SERVICES}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => handlePress(item)}
                        className="flex-row justify-between items-center p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg"
                    >
                        <View>
                            <Text className="text-lg font-bold text-brand-900 dark:text-brand-100">
                                {item.name}
                            </Text>
                            <Text className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                            </Text>
                            <Text className="text-brand-500 font-bold mt-1">
                                ₪{item.price}
                            </Text>
                        </View>

                        <Image source={item.image} className="w-16 h-16 rounded-lg" />
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}