import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withDelay,
} from "react-native-reanimated";

type AnimatedCardProps = {
    index?: number;
    children: React.ReactNode;
    onPress?: () => void;
};

export default function AnimatedCard({ index = 0, children, onPress }: AnimatedCardProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);
    const pressScale = useSharedValue(1);

    useEffect(() => {
        opacity.value = withDelay(index * 150, withTiming(1, { duration: 500 }));
        translateY.value = withDelay(index * 150, withSpring(0));
    }, []);

    const appearStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    const pressStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pressScale.value }],
    }));

    return (
        <Pressable
            onPressIn={() => {
                pressScale.value = withSpring(0.95);
            }}
            onPressOut={() => {
                pressScale.value = withSpring(1);
                onPress?.();
            }}
        >
            <Animated.View style={[appearStyle, pressStyle]}>
                {children}
            </Animated.View>
        </Pressable>
    );
}
