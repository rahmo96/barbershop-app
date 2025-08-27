import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import ThemedInput from "@/components/ThemedInput";
import RoundedButton from "@/components/RoundedButtons";

export default function Login() {
    const keyboardVerticalOffset = Platform.select({ ios: 64, android: 0 });


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View  className="flex-1 items-center justify-center px-6 bg-primary">
                        <Text className="text-white text-2xl font-bold">Login</Text>

                        <View className="h-5" />

                        <ThemedInput
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <View className="h-3" />

                        <ThemedInput
                            placeholder="Password"
                            secureTextEntry
                            keyboardType="default"
                        />

                        <RoundedButton text="Login" route="/profile" />

                        <View className="h-6" />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
