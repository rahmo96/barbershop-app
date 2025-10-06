import React from "react";
import { Image, Text, View, StyleSheet, ImageSourcePropType } from "react-native";
import TabsPill from "@/components/TabsPill";

type Props = { focused: boolean; icon: ImageSourcePropType; title?: string; className?: string };

const TabIcon = ({ focused, icon, title = "" }: Props) => {
    if (focused) {
        return (
            <View className="relative flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden">
                {/* Background pill — fills the entire container */}
                <TabsPill style={StyleSheet.absoluteFill} />

                <Image source={icon} style={{ tintColor: "#115E59" }} className="w-5 h-5" />
                {!!title && (
                    <Text className="text-foreground-light dark:text-foreground-dark text-base font-semibold ml-2">
                        {title}
                    </Text>
                )}
            </View>
        );
    }

    // Inactive: icon only
    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} style={{ tintColor: "#A8B5DB" }} className="w-5 h-5" />
        </View>
    );
};

export default TabIcon;
