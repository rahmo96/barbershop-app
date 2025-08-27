// components/GreenPill.tsx
import React from "react";
import {ViewStyle, StyleProp, useColorScheme} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

type Props = {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export default function GreenPill({
                                      style,
                                      children,
                                  }: Props) {
    const colorScheme = useColorScheme()
    const theme = colorScheme === 'dark' ? 'dark' : 'light'
    return (
        <LinearGradient
            // ירוק בהיר נעים (אפשר לשנות גוונים כאן)
            colors={theme === "dark" ? ["#f3d4b8", "#f6a344", "#a16207"]
                :["#fcecb0", "#f3d77d", "#ca8a04"]
            }
            start={{ x: 0.1, y: 0.0 }}
            end={{ x: 0.2, y: 1.0 }}
            style={style}

        >
            {children ?? <Text style={{ color: "#065F46", fontWeight: "600", fontStyle: "italic", fontSize: 16 }}></Text>}
        </LinearGradient>
    );
}
