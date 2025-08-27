import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Heading from "@/components/Heading";
import { useRouter } from "expo-router";
import {useFonts} from "expo-font";

const services = [
    { id: "1", title: "תספורת",           price: "₪25", image: require("../../assets/images/haircut.png") },
    { id: "2", title: "תספורת וזקן",      price: "₪15", image: require("../../assets/images/beard.png") },
    { id: "3", title: "תספורת זקן צבע",   price: "₪45", image: require("../../assets/images/haircolor.png") },
];

export default function Services() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <Heading title="השירותים שלנו" className="my-4 px-4 text-center font-bold" center={false} />

            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <Pressable
                        className="bg-brand-100 dark:bg-brand-800 rounded-xl p-4 mb-4 flex-row items-center"
                        onPress={() => router.push(`/service-details?id=${item.id}`)}
                    >
                        <View className="flex-1 items-end">
                            <Text
                                className="text-lg font-bold text-brand-900 dark:text-brand-100 text-center"
                                style={{ writingDirection: "rtl" }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                className="text-brand-600 dark:text-brand-300 text-center"
                                style={{ writingDirection: "rtl" }}
                            >
                                {item.price}
                            </Text>
                        </View>

                        <Image source={item.image} className="w-16 h-16 rounded-lg" />
                    </Pressable>


                )}
            />
        </SafeAreaView>
    );
}
