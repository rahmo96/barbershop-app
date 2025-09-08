// components/LoadingOverlay.tsx
import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

type LoadingOverlayProps = {
    isLoading: boolean;
    message?: string;
    transparent?: boolean;
};

export default function LoadingOverlay({
                                           isLoading,
                                           message = 'Loading...',
                                           transparent = false
                                       }: LoadingOverlayProps) {
    if (!isLoading) return null;

    return (
        <View style={[
            styles.container,
            transparent && styles.transparentContainer
        ]}>
            <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    transparentContainer: {
        backgroundColor: 'transparent',
    },
    loadingBox: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    message: {
        marginTop: 10,
        color: '#333',
        fontWeight: '500',
    },
});