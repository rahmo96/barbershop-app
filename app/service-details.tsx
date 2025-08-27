import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Heading from "@/components/Heading";
import RoundedButton from "@/components/RoundedButtons";

type Variant = { id: string; name: string; priceDelta: number; durationDelta: number };
type AddOn   = { id: string; name: string; priceDelta: number; durationDelta?: number };

const SERVICES: Record<string, {
    id: string;
    title: string;
    basePrice: number;
    baseDuration: number; // בדקות
    description: string;
    variants: Variant[];
    addOns: AddOn[];
}> = {
    "1": {
        id: "1",
        title: "תספורת",
        basePrice: 25,
        baseDuration: 30,
        description: "תספורת מקצועית כולל שטיפה, חיתוך וסטיילינג.",
        variants: [
            { id: "classic",   name: "קלאסית",         priceDelta: 0,  durationDelta: 0 },
            { id: "fade",      name: "פייד / סקין",    priceDelta: 10, durationDelta: 10 },
            { id: "scissors",  name: "מספריים בלבד",   priceDelta: 5,  durationDelta: 5  },
            { id: "kids",      name: "ילדים",          priceDelta: -5, durationDelta: -5 },
        ],
        addOns: [
            { id: "wash",   name: "חפיפה",          priceDelta: 5,  durationDelta: 5 },
            { id: "style",  name: "פיניש סטייל",   priceDelta: 5 },
        ],
    },
    "2" :{
        id: "2",
        title: "תספורת וזקן",
        basePrice: 15,
        baseDuration: 30,
        description: "תספורת מקצועית כולל שטיפה, חיתוך וסטיילינג.",
        variants: [],
        addOns: [
            { id: "wash",   name: "חפיפה",          priceDelta: 5,  durationDelta: 5 },
            { id: "style",  name: "פיניש סטייל",   priceDelta: 5 },
        ],
    },
    "3" :{
        id: "3",
        title: "תספורת זקן צבע",
        basePrice: 45,
        baseDuration: 30,
        description: "תספורת מקצועית כולל שטיפה, חיתוך וסטיילינג.",
        variants: [],
        addOns: [
            { id: "wash",   name: "חפיפה",          priceDelta: 5,  durationDelta: 5 },
            { id: "style",  name: "פיניש סטייל",   priceDelta: 5 },
        ],
    }

};

export default function ServiceDetails() {
    const router = useRouter();
    const { id = "1" } = useLocalSearchParams();
    const service = SERVICES[String(id)] ?? SERVICES["1"];

    const [variantId, setVariantId] = useState<string>(service.variants[0]?.id ?? "");
    const [addOnIds, setAddOnIds]   = useState<string[]>([]);

    const variant = useMemo(
        () => service.variants.find(v => v.id === variantId),
        [service.variants, variantId]
    );

    const totalPrice = useMemo(() => {
        const addOnsPrice = addOnIds.reduce((s, aId) => {
            const a = service.addOns.find(x => x.id === aId);
            return s + (a?.priceDelta ?? 0);
        }, 0);
        return service.basePrice + (variant?.priceDelta ?? 0) + addOnsPrice;
    }, [service, variant, addOnIds]);

    const totalDuration = useMemo(() => {
        const addOnsDur = addOnIds.reduce((s, aId) => {
            const a = service.addOns.find(x => x.id === aId);
            return s + (a?.durationDelta ?? 0);
        }, 0);
        return service.baseDuration + (variant?.durationDelta ?? 0) + addOnsDur;
    }, [service, variant, addOnIds]);

    const toggleAddOn = (aId: string) =>
        setAddOnIds(prev => prev.includes(aId) ? prev.filter(x => x !== aId) : [...prev, aId]);


    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <ScrollView className="flex-1 px-4">
                <Heading title={service.title} className="my-4 text-right" center={false} />

                <View className="h-40 bg-brand-200 dark:bg-brand-800 rounded-xl mb-4" />

                {/* וריאנטים (סוג תספורת) */}
                <Text className="text-brand-900 dark:text-brand-100 mb-2 text-right" style={{ writingDirection: "rtl" }}>
                    בחר סוג תספורת:
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                    <View className="flex-row gap-2">
                        {service.variants.map(v => {
                            const selected = v.id === variantId;
                            return (
                                <Pressable
                                    key={v.id}
                                    onPress={() => setVariantId(v.id)}
                                    className={[
                                        "px-4 py-2 rounded-full border",
                                        selected
                                            ? "bg-brand-500 border-brand-500"
                                            : "bg-transparent border-brand-300 dark:border-brand-700"
                                    ].join(" ")}
                                >
                                    <Text className={selected ? "text-white font-semibold" : "text-brand-900 dark:text-brand-100"}>
                                        {v.name}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* תוספים (אופציונלי) */}
                <Text className="text-brand-900 dark:text-brand-100 mb-2 text-right" style={{ writingDirection: "rtl" }}>
                    תוספים:
                </Text>
                <View className="mb-4">
                    {service.addOns.map(a => {
                        const selected = addOnIds.includes(a.id);
                        return (
                            <Pressable
                                key={a.id}
                                onPress={() => toggleAddOn(a.id)}
                                className="flex-row items-center justify-between bg-brand-100 dark:bg-brand-800 rounded-xl px-4 py-3 mb-2"
                            >
                                <Text className="text-brand-900 dark:text-brand-100 text-right flex-1" style={{ writingDirection: "rtl" }}>
                                    {a.name}
                                </Text>
                                <Text className="text-brand-700 dark:text-brand-300 mr-3">
                                    {a.priceDelta >= 0 ? `+₪${a.priceDelta}` : `-₪${Math.abs(a.priceDelta)}`}
                                </Text>
                                <View className={`w-5 h-5 rounded border ${selected ? "bg-brand-500 border-brand-500" : "border-brand-400"}`} />
                            </Pressable>
                        );
                    })}
                </View>

                {/* סיכום מחיר/זמן */}
                <View className="flex-row justify-between mb-2">
                    <Text className="text-lg text-brand-900 dark:text-brand-100">מחיר:</Text>
                    <Text className="text-lg font-bold text-brand-900 dark:text-brand-100">₪{totalPrice}</Text>
                </View>
                <View className="flex-row justify-between mb-6">
                    <Text className="text-lg text-brand-900 dark:text-brand-100">משך:</Text>
                    <Text className="text-lg font-bold text-brand-900 dark:text-brand-100">{totalDuration} דק׳</Text>
                </View>

                <RoundedButton
                    text="קבע תור"
                    route={{
                        pathname: "/appointments",
                        params: {
                            id: service.id,
                            variantId,
                            addOns: addOnIds.join(","),
                            price: String(totalPrice),
                            duration: String(totalDuration),
                        },
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
