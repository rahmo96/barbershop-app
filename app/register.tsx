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
    Alert
} from "react-native";
import ThemedInput from "@/components/ThemedInput";
import RoundedButton from "@/components/RoundedButtons";

export default function Register() {
    const keyboardVerticalOffset = Platform.select({ ios: 64, android: 0 });
    // סטייטים בסיסיים (לא חובה, אבל שימושי לאימותים)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // refs לפוקוס לשדה הבא
    const nameRef = useRef<RNTextInput>(null);
    const emailRef = useRef<RNTextInput>(null);
    const passwordRef = useRef<RNTextInput>(null);

    const canSubmit = name.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 6;

    const onSubmit = () => {
        console.log(name, email, password);
        Keyboard.dismiss();
        if (!canSubmit){
            Alert.alert(
                "Error",
                !name.trim() ? "Please enter your name" :
                    !email.trim() ? "Please enter your email" :
                        !password.length ? "Please enter a password" :
                            "Please enter a valid email",
            );
            return;
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 items-center justify-center px-6 py-8 bg-primary">
                        <Text className="text-xl text-white font-bold">Register</Text>

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
                            className="w-80 mb-3"
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
                            className="w-80 mb-3"
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
                            className="w-80 mb-6"
                        />

                        <RoundedButton
                            text={canSubmit ? "Submit" : "Fill all fields"}
                            route={"/profile"}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
