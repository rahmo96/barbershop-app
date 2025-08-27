import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import Heading from "@/components/Heading"
import Square from "@/components/Square"

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState([
        { id: '1', title: 'Haircut' },
        { id: '2', title: 'Beard Trim' },
        { id: '3', title: 'Hair Coloring' }
    ])

    return (
        <SafeAreaView className="flex-1 bg-primary-light dark:bg-primary-dark px-4">
            <Heading title="Find Services" className="my-4" />

            <TextInput
                className="bg-white dark:bg-brand-800 text-brand-900 dark:text-white px-4 py-3 rounded-full mb-4"
                placeholder="Search services..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <FlatList
                data={results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="flex-row items-center p-3 bg-brand-100 dark:bg-brand-800 rounded-lg mb-2">
                        <Square title={item.title.charAt(0)} size={50} />
                        <Text className="ml-3 text-brand-900 dark:text-brand-100 text-lg">{item.title}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Search