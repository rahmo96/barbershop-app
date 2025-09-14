// app/(auth)/login.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
} from "react-native";
import ThemedInput from "@/components/ThemedInput";
import { Link, useRouter, Redirect } from "expo-router";
import { useUser } from "@/context/UserContext";
import Heading from "@/components/Heading";
import {SafeAreaView} from 'react-native-safe-area-context';
import { useLocalization } from '@/context/LocalizationContext';

export default function LoginScreen() {
    const { t, locale } = useLocalization();
    const textAlign = locale === 'he' ? 'right' : 'left';
    const keyboardVerticalOffset = Platform.select({ ios: 64, android: 0 });
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, current, loading } = useUser();

    // If already logged in, redirect to profile
    if (!loading && current) {
        return <Redirect href="/(tabs)/profile" />;
    }

    const handleLogin = async () => {
        setError("");
        try {
            const session = await login(email, password);
            if (session) {
                router.replace("/(tabs)/profile");
            }
        } catch (err) {
            console.error("Login failed:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(t("loginFailed"));
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardVerticalOffset}
            className="flex-1 bg-primary-light dark:bg-primary-dark"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View className="flex-1">
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="flex-1 items-center justify-center px-6">
                            <Heading className="my-4">{t("login")}</Heading>

                            <View className="h-5" />

                            <ThemedInput
                                placeholder={t("email")}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setEmail}
                                value={email}
                                style={{ textAlign }}
                            />

                            <View className="h-3" />

                            <ThemedInput
                                placeholder={t("password")}
                                secureTextEntry
                                keyboardType="default"
                                onChangeText={setPassword}
                                value={password}
                                style={{ textAlign }}
                            />

                            <Pressable
                                className="rounded-full py-3 px-6 items-center justify-center my-2 bg-primary-500 dark:bg-primary-700 w-60 mt-5"
                                onPress={handleLogin}
                            >
                                <Text className="text-white font-bold">{t("login")}</Text>
                            </Pressable>

                            <Link href="/register" asChild>
                                <Pressable hitSlop={8} className="mt-3">
                                    <Text className="text-primary-700 dark:text-primary-300">
                                        {t("orRegister")}
                                    </Text>
                                </Pressable>
                            </Link>

                            {error ? (
                                <Text className="text-danger mt-2">{error}</Text>
                            ) : null}

                            <View className="h-6" />
                        </View>
                    </ScrollView>
                    <SafeAreaView className="absolute bottom-0 left-0 right-0 items-center pb-4">
                        <Pressable
                            className="rounded-full py-3 px-6 items-center justify-center bg-primary-400 dark:bg-primary-600 w-60"
                            onPress={() => router.push("/")}
                        >
                            <Text className="text-white font-bold">
                                {t("home")}
                            </Text>
                        </Pressable>
                    </SafeAreaView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}