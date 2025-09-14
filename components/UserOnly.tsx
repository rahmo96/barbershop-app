// auth/UserOnly.tsx
import { useUser } from "@/context/UserContext"
import { ActivityIndicator } from 'react-native'
import Heading from "@/components/Heading";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from "expo-router";

// @ts-ignore
const UserOnly = ({ children }) => {
    const { current, authChecked } = useUser();

    // If auth check completed and user is not logged in, redirect to login
    if (authChecked && current === null) {
        return <Redirect href="/login" />;
    }

    // Show loader while we wait for auth to be checked
    if (!authChecked || current === undefined) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-primary-light dark:bg-primary-dark">
                <Heading title="Loading..." />
                <ActivityIndicator size="large" color="#713f12" />
            </SafeAreaView>
        );
    }

    // User is logged in, render children
    return children;
}

export default UserOnly;