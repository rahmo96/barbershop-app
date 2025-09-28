// components/AnimatedScreen.tsx
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInRight,
    SlideOutLeft,
    SlideInUp,
    SlideOutDown,
    ZoomIn,
    ZoomOut,
    RotateInUpLeft,
    RotateOutUpLeft,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
} from "react-native-reanimated";

type AnimationType = "fade" | "slide" | "slideUp" | "scale" | "rotate";

type Props = {
    children: React.ReactNode;
    type?: AnimationType;
    duration?: number;
    delay?: number;
    useBuiltIn?: boolean; // Option to use built-in animations or custom
};

export default function AnimatedScreen({
                                           children,
                                           type = "fade",
                                           duration = 300,
                                           delay = 0,
                                           useBuiltIn = false,
                                       }: Props) {
    const isFocused = useIsFocused();
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(50);
    const translateY = useSharedValue(50);
    const scale = useSharedValue(0.8);
    const rotate = useSharedValue(-10);

    // Animation configurations for built-in animations
    const animations: Record<AnimationType, { entering: any; exiting: any }> = {
        fade: {
            entering: FadeIn.duration(duration).delay(delay),
            exiting: FadeOut.duration(duration),
        },
        slide: {
            entering: SlideInRight.duration(duration).delay(delay),
            exiting: SlideOutLeft.duration(duration),
        },
        slideUp: {
            entering: SlideInUp.duration(duration).delay(delay),
            exiting: SlideOutDown.duration(duration),
        },
        scale: {
            entering: ZoomIn.duration(duration).delay(delay),
            exiting: ZoomOut.duration(duration),
        },
        rotate: {
            entering: RotateInUpLeft.duration(duration).delay(delay),
            exiting: RotateOutUpLeft.duration(duration),
        },
    };

    // Run animation when screen comes into focus
    useEffect(() => {
        if (isFocused) {
            // Reset and start animations
            opacity.value = 0;
            translateX.value = type === 'slide' ? 50 : 0;
            translateY.value = type === 'slideUp' ? 50 : 0;
            scale.value = type === 'scale' ? 0.8 : 1;
            rotate.value = type === 'rotate' ? -10 : 0;

            // Start animations with slight delay between them for natural feel
            setTimeout(() => {
                opacity.value = withTiming(1, { duration, easing: Easing.out(Easing.ease) });

                if (type === 'slide') {
                    translateX.value = withTiming(0, { duration, easing: Easing.out(Easing.ease) });
                }

                if (type === 'slideUp') {
                    translateY.value = withTiming(0, { duration, easing: Easing.out(Easing.ease) });
                }

                if (type === 'scale') {
                    scale.value = withTiming(1, { duration, easing: Easing.out(Easing.ease) });
                }

                if (type === 'rotate') {
                    rotate.value = withTiming(0, { duration, easing: Easing.out(Easing.ease) });
                }
            }, delay);
        }
    }, [delay, duration, isFocused, opacity, rotate, scale, translateX, translateY, type]);

    // Custom animations style
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
                { rotateZ: `${rotate.value}deg` }
            ]
        };
    });

    // If using built-in animations, use the Animated.View with entering/exiting props
    if (useBuiltIn && isFocused) {
        return (
            <Animated.View
                style={{ flex: 1 }}
                entering={animations[type].entering}
                exiting={animations[type].exiting}
            >
                {children}
            </Animated.View>
        );
    }

    // Otherwise use custom animations with shared values
    return (
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            {children}
        </Animated.View>
    );
}