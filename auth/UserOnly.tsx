import { useUser } from "@/context/UserContext"
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import {ActivityIndicator} from 'react-native'
import Heading from "@/components/Heading";
import {SafeAreaView} from "react-native-safe-area-context";

// @ts-ignore
const UserOnly = ({ children }) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (authChecked && user === null) {
            router.replace("/login")
        }
    }, [user, authChecked])


    // show loader while we wait for auth to be checked, or while redirecting if user becomes null
    if (!authChecked || !user) {
        return (
            <SafeAreaView>
                <Heading> Loading </Heading>
                <ActivityIndicator size="large" color="black" />
            </SafeAreaView>
        )
    }

    return children
}

export default UserOnly