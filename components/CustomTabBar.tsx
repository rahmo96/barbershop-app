import React from "react";
import { TouchableOpacity, Text, Dimensions, View, Image } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useDerivedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function CustomTabBar({ state, descriptors, navigation }: any) {
    const tabWidth = width / state.routes.length;
    const translateX = useSharedValue(0);

    useDerivedValue(() => {
        translateX.value = withTiming(state.index * tabWidth, { duration: 300 });
    }, [state.index]);

    const pillStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View className="flex-row h-[70px] bg-white dark:bg-black border-t direction-ltr">
            <Animated.View
                style={[{ width: tabWidth * 0.9 }, pillStyle]}
                className="absolute bottom-2 left-0 h-[50px] mx-2 rounded-full overflow-hidden z-0 direction-ltr"
            >
                <LinearGradient
                    colors={["#3b82f6", "#2563eb"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                />
            </Animated.View>

            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel ?? options.title ?? route.name;
                const icon = options.tabBarIcon;
                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => navigation.navigate(route.name)}
                        className="flex-1 items-center justify-center z-10"
                    >
                        {icon && (
                            <Image
                                source={icon}
                                className="w-5 h-5 mb-1"
                                style={{ tintColor: isFocused ? "#fff" : "#64748b" }}
                            />
                        )}
                        <Text
                            className={
                                isFocused ? "text-white font-bold" : "text-gray-500 font-medium"
                            }
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}

        </View>
    );
}
