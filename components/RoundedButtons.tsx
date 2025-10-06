import { Pressable } from "react-native";
import {Href, useRouter} from "expo-router";
import NormalText from "@/components/NormalText";
import clsx from "clsx";

const RoundedButton = ({
                           text,
                           route,
                           disabled,
                           className,
                           onPress
                       }: {
    text: string,
    route?: Href
    disabled?: boolean,
    className?: string,
    onPress?: () => void | Promise<void>
}) => {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (route) {
            router.push(route);
        }
    };

    return (
        <Pressable
            className={`rounded-full py-3 px-6 items-center justify-center my-2 
                ${disabled ? 'bg-gray-400 dark:bg-gray-600' : 'bg-primary-500 dark:bg-primary-700'} 
                ${className}`}
            onPress={handlePress}
            disabled={disabled}
        >
            <NormalText className="text-white ">{text}</NormalText>
        </Pressable>
    );
};

export default RoundedButton;