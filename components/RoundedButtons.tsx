// components/RoundedButtons.tsx
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
            disabled={disabled}
            className={clsx(
                "rounded-full py-3 px-6 items-center justify-center my-2",
                "bg-brand-400 dark:bg-brand-800",
                disabled ? "opacity-50" : "active:opacity-90",
                className
            )}
            onPress={handlePress}
        >
            <NormalText title={text} />
        </Pressable>
    );
};

export default RoundedButton;