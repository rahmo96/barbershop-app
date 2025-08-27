import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import RoundedButton from "@/components/RoundedButtons"
import Heading from "@/components/Heading"

const Profile = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark">
            <ScrollView className="px-4">
                <Heading title="Your Profile" className="my-4" />

                <View className="items-center mb-6">
                    <View className="w-24 h-24 rounded-full bg-brand-200 dark:bg-brand-800 mb-2" />
                    <Text className="text-xl dark:text-brand-100 text-brand-900 font-bold">User Name</Text>
                </View>

                <View className="space-y-4">
                    <RoundedButton text="My Appointments" route="/appointments" />
                    <RoundedButton text="Edit Profile" route="/edit-profile" />
                    <RoundedButton text="Settings" route="/settings" />
                    <RoundedButton text="Log Out" route="/" />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile