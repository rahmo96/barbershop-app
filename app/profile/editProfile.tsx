// app/edit-profile.tsx
import React, { useState } from "react";
import {
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Redirect } from "expo-router";
import Heading from "@/components/Heading";
import ThemedInput from "@/components/ThemedInput";
import RoundedButton from "@/components/RoundedButtons";
import { useUser } from "@/context/UserContext";

export default function EditProfile() {
    const { current, loading, updateUserProfile } = useUser();
    const router = useRouter();

    // State for user data
    const [name, setName] = useState(current?.name || "");
    const [email, setEmail] = useState(current?.email || "");

    // If still checking auth or loading, show loading state
    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-primary-light dark:bg-primary-dark">
                <Heading title="Loading..." />
            </SafeAreaView>
        );
    }

    // Redirect to login if not authenticated
    if (current === null) {
        return <Redirect href="/login" />;
    }

    const handleSave = () => {

        updateUserProfile(name);
        router.push("/profile");
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View className="px-4 py-6">
                            <Heading title="Edit Profile" style={{marginBottom: 30}} />

                            <View className="space-y-4">
                                <ThemedInput
                                    placeholder="Full Name"
                                    value={name}
                                    onChangeText={setName}
                                    className="w-full"
                                />

                                <ThemedInput
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className="w-full"
                                />

                                <View className="h-4" />

                                <RoundedButton
                                    text="Save Changes"
                                    onPress={handleSave}
                                />

                                <RoundedButton
                                    text="Cancel"
                                    onPress={() => router.back()}
                                    className="bg-gray-400 dark:bg-gray-600"
                                />
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}