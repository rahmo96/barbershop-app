// components/TabsPill.tsx
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

export default function TabsPill({
                                      style,
                                      children,
                                  }: Props) {
    const colorScheme = useColorScheme()
    const theme = colorScheme === 'dark' ? 'dark' : 'light'
    return (
        <LinearGradient
            colors={theme === "dark" ? ["#1d4ed8", "#153ba6", "#0e2567"]
                :["#93c5fd", "#6aafff", "#3a95fa"]
            }
            start={{ x: 0.1, y: 0.0 }}
            end={{ x: 0.2, y: 1.0 }}
            style={style}

        >
            {children ?? <Text style={{ color: "#065F46", fontWeight: "600", fontStyle: "italic", fontSize: 16 }}></Text>}
        </LinearGradient>
    );
}
