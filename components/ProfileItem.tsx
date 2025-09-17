import { Pressable, View, Text } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";

export function ProfileItem({
                                title,
                                color,
                                onPress,
                                icon,
                            }: {
    title: string;
    color: string;
    onPress: () => void;
    icon: React.ReactNode;
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Pressable
            onPressIn={() => {
                scale.value = withSpring(0.95, { damping: 8, stiffness: 150 });
            }}
            onPressOut={() => {
                scale.value = withSpring(1, { damping: 8, stiffness: 150 });
                onPress();
            }}
        >
            <Animated.View
                style={animatedStyle}
                className="flex-row-reverse justify-center items-center py-3 border-b border-gray-100 dark:border-gray-700"
            >
                <View
                    className={`w-8 h-8 rounded-full ${color} items-center justify-center mr-3`}
                >
                    {icon}
                </View>
                <Text className="text-black dark:text-white ml-6 mr-6">{title} </Text>
            </Animated.View>
        </Pressable>
    );
}
