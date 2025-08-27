// app/splash.tsx
import { Video } from "expo-av";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function SplashVideo() {
    const router = useRouter();
    const videoRef = useRef<Video>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/"); // עובר ל־index.tsx
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
            <View className="flex-1 bg-black">
            <StatusBar style="light" />
            <Video
                ref={videoRef}
                source={require("../assets/images/splash.mp4")}
                style={{ flex: 1 }}
                resizeMode="cover"
                isLooping={false}
                shouldPlay
                isMuted={false}
            />
        </View>

    );
}
