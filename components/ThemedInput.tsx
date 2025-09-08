// components/ThemedInput.tsx
import React, { forwardRef } from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";

interface ThemedInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

const ThemedInput = forwardRef<TextInput, ThemedInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <View className="w-full mb-4">
                {label && (
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
                        {label}
                    </Text>
                )}
                <TextInput
                    ref={ref}
                    className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                    rounded-xl px-4 py-3.5 text-gray-900 dark:text-white
                    ${error ? "border-red-500" : ""}
                    ${className}`}
                    placeholderTextColor="#9ca3af"
                    {...props}
                />
                {error && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>
                )}
            </View>
        );
    }
);

export default ThemedInput;