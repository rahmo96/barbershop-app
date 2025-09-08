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
import RoundedButton from "@/components/RoundedButtons";
import { useUser } from "@/context/UserContext";
import {useRouter, Redirect, Link} from "expo-router";
import Heading from "@/components/Heading";
import { db } from "@/utils/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
    const keyboardVerticalOffset = Platform.select({ ios: 64, android: 0 });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const { register, current, loading } = useUser();
    const router = useRouter();

    // refs for focus
    const nameRef = useRef<RNTextInput>(null);
    const emailRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);

    // If already logged in, redirect to profile
    if (!loading && current) {
        return <Redirect href="/(tabs)/profile" />;
    }

    const canSubmit = name.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 6;

    const handleSubmit = async () => {
        try {
            await register(email, password, name);
            router.replace("/(tabs)/profile");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardVerticalOffset}
            className="flex-1 bg-primary-50 dark:bg-primary-900"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 items-center justify-center px-6 py-8">
                        <Heading className="my-4">הרשמה</Heading>

                        <View className="h-4" />

                        {/* Name */}
                        <ThemedInput
                            ref={nameRef}
                            placeholder="Full name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            autoComplete="name"
                            textContentType="name"
                            returnKeyType="next"
                            onSubmitEditing={() => emailRef.current?.focus()}
                        />

                        {/* Email */}
                        <ThemedInput
                            ref={emailRef}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            textContentType="emailAddress"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                        />

                        {/* Password */}
                        <ThemedInput
                            ref={passwordRef}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="password-new"
                            textContentType="newPassword"
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                        />

                        <RoundedButton
                            text={canSubmit ? "Submit" : "Fill all fields"}
                            onPress={handleSubmit}
                            disabled={!canSubmit}
                        />

                        <Link href="/login" asChild>
                            <Pressable hitSlop={8} className="mt-3">
                                <Text className="text-primary-700 dark:text-primary-300">
                                    Already have an account? Login
                                </Text>
                            </Pressable>
                        </Link>

                        {error ? (
                            <Text className="text-danger mt-2">{error}</Text>
                        ) : null}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}