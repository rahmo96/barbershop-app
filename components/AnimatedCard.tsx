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
    index?: number;             // למצב של FlatList (שיהיה staggered animation)
    children: React.ReactNode;  // מה שיוצג בתוך הכרטיס
    onPress?: () => void;       // פעולה בלחיצה
};

export default function AnimatedCard({ index = 0, children, onPress }: AnimatedCardProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);
    const pressScale = useSharedValue(1);

    // הופעה חד פעמית
    useEffect(() => {
        opacity.value = withDelay(index * 150, withTiming(1, { duration: 500 }));
        translateY.value = withDelay(index * 150, withSpring(0));
    }, []);

    // סטייל הופעה
    const appearStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    // סטייל לחיצה
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
