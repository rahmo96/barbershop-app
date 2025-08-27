import { Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";


const RoundedButton = ({ text, route, disabled, className }:{ text: string, route: any, disabled?: boolean, className?: string} ) => {
    const router = useRouter();

    return (
        <Pressable
            disabled={disabled}
            className={[
                "rounded-full py-3 px-6 items-center justify-center my-2",
                // 👇 מתחלף לפי מצב המכשיר
                "bg-brand-400 dark:bg-brand-800",
                // אפקט לחיצה/מצב כבוי
                disabled ? "opacity-50" : "active:opacity-90",
                className ?? "",
            ].join(" ")}
            onPress={() => router.push(route)}

        >
            <Text className="text-white text-lg font-bold">{text}</Text>
        </Pressable>
    );
};

export default RoundedButton;
