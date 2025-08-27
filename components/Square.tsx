import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import Heading from "@/components/Heading";

type Props = {
    size?: number;
    title?: string;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

export default function Square({ size = 120, title = "0", children, style }: Props) {
    return (
        <View
            className="bg-brand-100 dark:bg-brand-900 rounded-2xl border border-slate-200 dark:border-neutral-800 items-center justify-center overflow-hidden"
            style={[{ width: size, aspectRatio: 1, elevation: 6 }, style]}
        >
            {children ?? <Heading title={title} />}
        </View>
    );
}
