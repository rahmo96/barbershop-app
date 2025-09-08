import { Text, type TextProps } from "react-native";
import { cn } from "@/lib/cn";
import { useFonts } from "expo-font";

type HeadingProps = TextProps & {
    title?: string;
    center?: boolean;
    className?: string;
    isError?: boolean;
};

export default function NormalText({
                                    title,
                                    children,
                                    center = true,
                                    className,
                                    isError,
                                    style,
                                    ...rest
                                }: HeadingProps) {
    const [fontsLoaded] = useFonts({
        varela: require("../assets/fonts/VarelaRound-Regular.ttf"),
    });

    return (
        <Text
            {...rest}
            style={[style, fontsLoaded && { fontFamily: "varela" }]}
            className={cn(
                "text-2xl",
                isError ? "text-danger dark:text-danger" : "text-black dark:text-white",
                center && "text-center",
                className
            )}
        >
            {children ?? title}
        </Text>
    );
}
