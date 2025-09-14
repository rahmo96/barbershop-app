// app/(tabs)/services.tsx
import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";
import { useLocalization } from "@/context/LocalizationContext";
import Heading from "@/components/Heading";
import NormalText from "@/components/NormalText";
import AnimatedCard from "@/components/AnimatedCard";
import { getServices } from "@/services/services";

// Define service types
interface ServiceVariant {
    id: string;
    name: string;
    price: number;
    duration: number;
}

interface Service {
    id: string;
    name: string;
    description: string;
    image?: string;
    price: number;
    duration: number;
    variants: ServiceVariant[];
    createdAt: any;
}

export default function Services() {
    const { current } = useUser();
    const router = useRouter();
    const { t } = useLocalization();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch services on component mount
    useEffect(() => {
        async function fetchServices() {
            try {
                setLoading(true);
                const servicesData = await getServices();
                setServices(servicesData as Service[]);
            } catch (error) {
                console.error("Error loading services:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    const handlePress = (item: Service) => {
        if (!current) {
            router.push("/login");
        } else {
            router.push({
                pathname: "/service-details",
                params: { id: item.id }
            });
        }
    };

    const renderServiceCard = ({ item, index }: { item: Service; index: number }) => {
        // Determine starting price from variants or use default price
        const startingPrice = item.variants && item.variants.length > 0
            ? Math.min(...item.variants.map(v => v.price))
            : item.price;

        return (
            <AnimatedCard
                index={index}
                onPress={() => handlePress(item)}
            >
                {/* Content rendered inside AnimatedCard */}
                <View className="p-4">
                    <Heading title={t(item.name)} center={false} />
                    <NormalText center={false}>{item.description}</NormalText>

                    <View className="flex-row justify-between mt-2">
                        <Text className="font-bold">₪{startingPrice}</Text>
                        {item.image && (
                            <Image
                                source={{ uri: item.image }}
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                    </View>
                </View>
            </AnimatedCard>
        );
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
                <ActivityIndicator size="large" color="#475569" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 p-4 bg-white dark:bg-gray-900">
            <Heading title={t("ourServices")} />
            <NormalText className="mb-4">{t("servicesDescription")}</NormalText>

            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={renderServiceCard}
            />
        </SafeAreaView>
    );
}