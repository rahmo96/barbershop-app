// app/(tabs)/services.tsx
import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Heading from "@/components/Heading";
import { useUser } from "@/context/UserContext";
import {useFonts} from "expo-font";
import AnimatedCard from "@/components/AnimatedCard";

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
    const [fontsLoaded] = useFonts({
        varela: require("../../assets/fonts/VarelaRound-Regular.ttf"),
    });

    const handlePress = (item: any) => {
        if (!current) {
            router.push("/login");
        } else {
            router.push(`/service-details?id=${item.id}`);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary-50 dark:bg-black">
            <Heading title="השירותים שלנו" className="my-4" />

            <FlatList
                data={SERVICES}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item, index }) => (
                    <AnimatedCard index={index} onPress={() => handlePress(item)}>
                        <View className="p-5 mb-4 bg-white dark:bg-gray-500 rounded-xl shadow-md overflow-hidden">
                            <View className="flex-row justify-between">
                                <View className="flex-1 pr-4">
                                    <Text
                                        className="text-xl text-primary-800 dark:text-primary-300 mb-1"
                                        style={{ fontFamily: "varela" }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        className="text-sm text-gray-600 dark:text-gray-200 mb-2"
                                        style={{ fontFamily: "varela" }}
                                    >
                                        {item.description}
                                    </Text>
                                    <Text
                                        className="text-accent-600 text-lg text-gray-600 dark:text-gray-200"
                                        style={{ fontFamily: "varela" }}
                                    >
                                        ₪{item.price}
                                    </Text>
                                </View>
                                <Image
                                    source={item.image}
                                    className="w-20 h-20 rounded-lg"
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                    </AnimatedCard>
                )}
            />
        </SafeAreaView>
    );
}