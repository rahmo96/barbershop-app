// components/ThemedInput.tsx
import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & { className?: string };

const ThemedInput = forwardRef<TextInput, Props>(({ className, ...props }, ref) => {
    return (
        <TextInput
            ref={ref}
            {...props}
            className={`border-e-8 border-dark-100 w-60 h-16 rounded-full bg-white px-4 py-2 ${className ?? ""}`}
            placeholderTextColor="#9CA3AF"
        />
    );
});

export default ThemedInput;
