// components/LoadingScreen.tsx
import React, { useRef, useEffect } from "react";
import {  ActivityIndicator, Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from "@/components/Heading";

type LoadingScreenProps = {
    message?: string;
};

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-primary-light dark:bg-primary-dark">
            <Heading title={message} />
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <ActivityIndicator size="large" color="#713f12" className="mt-4" />
            </Animated.View>
        </SafeAreaView>
    );
};

export default LoadingScreen;