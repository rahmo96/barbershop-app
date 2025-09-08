// hooks/useErrorHandler.ts
import { useState } from 'react';
import { Alert } from 'react-native';

export function useErrorHandler() {
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: unknown, friendlyMessage?: string) => {
        console.error('Error occurred:', err);

        let errorMessage = friendlyMessage || 'Something went wrong. Please try again.';

        if (err instanceof Error) {
            errorMessage = friendlyMessage || err.message;
        }

        setError(errorMessage);
        return errorMessage;
    };

    const showErrorAlert = (err: unknown, title = 'Error', friendlyMessage?: string) => {
        const message = handleError(err, friendlyMessage);
        Alert.alert(title, message);
    };

    const clearError = () => setError(null);

    return { error, handleError, showErrorAlert, clearError };
}