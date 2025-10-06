import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUser } from "@/context/UserContext";
import { useLocalization } from "@/context/LocalizationContext";
import Heading from "@/components/Heading";
import NormalText from "@/components/NormalText";
import RoundedButton from "@/components/RoundedButtons";
import { getServiceById } from "@/services/services";
import LoadingScreen from "@/components/LoadingScreen";

interface ServiceVariant { id: string; name: string; price: number; duration: number; }
interface ServiceAddOn { id: string; name: string; price: number; duration: number; }
interface Service {
    id: string;
    name: string;
    description: string;
    image: string | ImageSourcePropType;
    variants: ServiceVariant[];
    addOns?: ServiceAddOn[];
}

export default function ServiceDetails() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();
    const { current } = useUser();
    const { t } = useLocalization();

    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [variantId, setVariantId] = useState("");
    const [addOnIds, setAddOnIds] = useState<string[]>([]);

    // helper: translate with fallback
    const tr = (key: string, fallback: string) => {
        const v = t(key);
        return v === key ? fallback : v;
    };

    useEffect(() => {
        async function fetchServiceDetails() {
            if (!id) { router.back(); return; }
            try {
                setLoading(true);
                const serviceData = await getServiceById(id as string);
                if (!serviceData || !serviceData.name || !serviceData.description || !serviceData.variants) {
                    router.back();
                    return;
                }
                setService(serviceData as Service);
                if (serviceData.variants?.length) setVariantId(serviceData.variants[0].id);
            } finally {
                setLoading(false);
            }
        }
        fetchServiceDetails();
    }, [id, router]);

    const selectedVariant = service?.variants.find(v => v.id === variantId);
    const selectedAddOns = (service?.addOns || []).filter(a => addOnIds.includes(a.id));

    const totalPrice = (selectedVariant?.price || 0) + selectedAddOns.reduce((s, a) => s + a.price, 0);
    const totalDuration = (selectedVariant?.duration || 0) + selectedAddOns.reduce((s, a) => s + a.duration, 0);

    const imageSource = useMemo(() => {
        if (!service?.image) return undefined;
        return typeof service.image === "string" ? { uri: service.image } : service.image;
    }, [service?.image]);

    const handleVariantSelect = (vid: string) => setVariantId(vid);
    const handleAddOnToggle = (aid: string) =>
        setAddOnIds(prev => (prev.includes(aid) ? prev.filter(x => x !== aid) : [...prev, aid]));

    const handleContinue = () => {
        if (!service || !selectedVariant) return;
        if (!current) { router.push("/login"); return; }
        router.push({
            pathname: "/profile/appointments",
            params: {
                id: service.id,
                serviceId: service.id,
                title: service.name,
                description: service.description,
                variantId,
                addOns: addOnIds.join(","),
                price: String(totalPrice),
                duration: String(totalDuration),
            },
        });
    };

    if (loading) return <LoadingScreen />;
    if (!service) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <NormalText>{t("serviceNotFound")}</NormalText>
                <RoundedButton text={t("goBack")} onPress={() => router.back()} className="mt-4" />
            </View>
        );
    }

    const serviceName = tr(`service_${service.id}_name`, service.name);

    return (
        <ScrollView className="flex-1 bg-white dark:bg-gray-900">
            {imageSource && <Image source={imageSource} className="w-full h-64" resizeMode="cover" />}

            <View className="p-4 ">
                <Heading title={t(serviceName)} center={true} />

                {/* Variants */}
                {!!service.variants.length && (
                    <View className="mb-6">
                        <Heading style={{ fontSize: 18 }} title={t("chooseVariant")} />
                        <View className="mt-2 space-y-2">
                            {service.variants.map(variant => {
                                const isSelected = variantId === variant.id;
                                const vName = tr(`service_${service.id}_variant_${variant.id}_name`, variant.name);

                                const a11yLabel =
                                    tr("a11y.variant_option_label",
                                        `${vName}, ${variant.duration} ${t("minutes")}, ₪${variant.price}`
                                    );
                                const a11yHint = isSelected
                                    ? tr("a11y.variant_selected_hint", "נבחר. הקש לביטול או לבחירה אחרת")
                                    : tr("a11y.variant_select_hint", "הקש לבחירה");

                                return (
                                    <TouchableOpacity
                                        key={variant.id}
                                        onPress={() => handleVariantSelect(variant.id)}
                                        className={`p-3 rounded-lg border ${
                                            isSelected
                                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                                : "border-gray-300 dark:border-gray-700"
                                        }`}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: isSelected }}
                                        accessibilityLabel={a11yLabel}
                                        accessibilityHint={a11yHint}
                                        testID={`variant-${variant.id}`}
                                    >
                                        <View className="flex-row justify-between">
                                            <NormalText className="font-bold">{t(vName)}</NormalText>
                                            <NormalText>₪{variant.price}</NormalText>
                                        </View>
                                        <NormalText className="text-sm text-gray-500 dark:text-gray-400">
                                            {variant.duration} {t("minutes")}
                                        </NormalText>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Add-ons */}
                {!!service.addOns?.length && (
                    <View className="mb-6">
                        <Heading style={{ fontSize: 18 }} title={t("optionalAddOns")} />
                        <View className="mt-2 space-y-2">
                            {service.addOns!.map(addOn => {
                                const selected = addOnIds.includes(addOn.id);
                                const aName = tr(`service_${service.id}_addon_${addOn.id}_name`, addOn.name);

                                const a11yLabel =
                                    tr("a11y.addon_option_label",
                                        `${aName}, ${addOn.duration} ${t("minutes")}, ₪${addOn.price}`
                                    );
                                const a11yHint = selected
                                    ? tr("a11y.addon_selected_hint", "נבחר. הקש לביטול")
                                    : tr("a11y.addon_select_hint", "הקש לבחירה");

                                return (
                                    <TouchableOpacity
                                        key={addOn.id}
                                        onPress={() => handleAddOnToggle(addOn.id)}
                                        className={`p-3 rounded-lg border ${
                                            selected
                                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                                : "border-gray-300 dark:border-gray-700"
                                        }`}
                                        accessibilityRole="checkbox"
                                        accessibilityState={{ checked: selected }}
                                        accessibilityLabel={a11yLabel}
                                        accessibilityHint={a11yHint}
                                        testID={`addon-${addOn.id}`}
                                    >
                                        <View className="flex-row justify-between">
                                            <NormalText className="font-bold">{t(aName)}</NormalText>
                                            <NormalText>₪{addOn.price}</NormalText>
                                        </View>
                                        <NormalText className="text-sm text-gray-500 dark:text-gray-400">
                                            {addOn.duration} {t("minutes")}
                                        </NormalText>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Summary */}
                <View className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <View className="flex-row justify-between mb-2">
                        <NormalText className="font-bold">{t("totalPrice")}</NormalText>
                        <NormalText className="font-bold">₪{totalPrice}</NormalText>
                    </View>
                    <View className="flex-row justify-between">
                        <NormalText>{t("duration")}</NormalText>
                        <NormalText>{totalDuration} {t("minutes")}</NormalText>
                    </View>
                </View>

                <RoundedButton
                    text={t("continue")}
                    onPress={handleContinue}
                    disabled={!selectedVariant}
                    className="mt-2"
                />
            </View>
        </ScrollView>
    );
}
