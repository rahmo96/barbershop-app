// hooks/useFormValidation.ts
import { useState } from 'react';

type ValidationRules = {
    [key: string]: (value: any) => string | null;
};

export function useFormValidation(initialValues: Record<string, any>, validationRules: ValidationRules) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = (field: string, value: any) => {
        setValues(prev => ({ ...prev, [field]: value }));

        // Validate on change if field has been touched
        if (touched[field] && validationRules[field]) {
            const error = validationRules[field](value);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        // Validate on blur
        if (validationRules[field]) {
            const error = validationRules[field](values[field]);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const validateAll = () => {
        const newErrors: Record<string, string | null> = {};
        let isValid = true;

        // Validate all fields
        Object.keys(validationRules).forEach(field => {
            const error = validationRules[field](values[field]);
            newErrors[field] = error;
            if (error) isValid = false;
        });

        setErrors(newErrors);
        return isValid;
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAll,
        setValues
    };
}