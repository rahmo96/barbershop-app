// app/(auth)/register.tsx
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    TextInput as RNTextInput,
    Pressable,
} from "react-native";
import ThemedInput from "@/components/ThemedInput";
import { Link, useRouter, Redirect } from "expo-router";
import { useUser } from "@/context/UserContext";
import Heading from "@/components/Heading";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalization } from '@/context/LocalizationContext';

export default function RegisterScreen() {
    const { t } = useLocalization();
    const keyboardVerticalOffset = Platform.select({ ios: 64, android: 0 });
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { register, current, loading } = useUser();

    // Refs for focusing inputs
    const emailRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);

    // If already logged in, redirect to profile
    if (!loading && current) {
        return <Redirect href="/(tabs)/profile" />;
    }

    const handleRegister = async () => {
        setError("");
        try {
            if (name.trim() === "") {
                setError(t("nameRequired"));
                return;
            }

            if (password.length < 6) {
                setError(t("passwordLength"));
                return;
            }

            const user = await register(email, password, name);
            if (user) {
                router.replace("/(tabs)/profile");
            }
        } catch (err) {
            console.error("Registration failed:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(t("registerFailed"));
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
                            <Heading className="my-4">{t("register")}</Heading>

                            <View className="h-5" />

                            <ThemedInput
                                placeholder={t("fullName")}
                                autoCapitalize="words"
                                onChangeText={setName}
                                value={name}
                                style={{ textAlign: "center" }}
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef.current?.focus()}
                            />

                            <View className="h-3" />

                            <ThemedInput
                                ref={emailRef}
                                placeholder={t("email")}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={setEmail}
                                value={email}
                                style={{ textAlign: "center" }}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />

                            <View className="h-3" />

                            <ThemedInput
                                ref={passwordRef}
                                placeholder={t("password")}
                                secureTextEntry
                                keyboardType="default"
                                onChangeText={setPassword}
                                value={password}
                                style={{ textAlign: "center" }}
                                returnKeyType="done"
                            />

                            <Pressable
                                className="rounded-full py-3 px-6 items-center justify-center my-2 bg-primary-500 dark:bg-primary-700 w-60 mt-5"
                                onPress={handleRegister}
                            >
                                <Text className="text-white font-bold">{t("register")}</Text>
                            </Pressable>

                            <Link href="/login" asChild>
                                <Pressable hitSlop={8} className="mt-3">
                                    <Text className="text-primary-700 dark:text-primary-300">
                                        {t("alreadyHaveAccount")}
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