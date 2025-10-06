import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalization } from '@/context/LocalizationContext';

export interface TimeSlot {
    time: string;
    available: boolean;
}

interface TimeSlotGridProps {
    slots: TimeSlot[];
    selectedSlot: TimeSlot | null;
    onSelectSlot: (slot: TimeSlot) => void;
}

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
                                                       slots,
                                                       selectedSlot,
                                                       onSelectSlot
                                                   }) => {
    const { t } = useLocalization();

    // Organize slots into rows of 3 for grid display
    const rows = useMemo(() => {
        const result = [];
        for (let i = 0; i < slots.length; i += 3) {
            result.push(slots.slice(i, i + 3));
        }
        return result;
    }, [slots]);

    // Format time based on locale
    const formatTime = (time: string) => {
        // Handle different time formats if needed
        return time;
    };

    return (
        <View className="mt-4">
            {rows.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} className="flex-row justify-between mb-3">
                    {row.map((slot, colIndex) => (
                        <Pressable
                            key={`slot-${rowIndex}-${colIndex}`}
                            onPress={() => slot.available && onSelectSlot(slot)}
                            disabled={!slot.available}
                            className={`
                flex-1 py-3 mx-1 rounded-lg items-center justify-center
                ${!slot.available ? 'bg-gray-200 dark:bg-gray-700' :
                                selectedSlot?.time === slot.time ?
                                    'bg-primary-500 dark:bg-primary-600' :
                                    'bg-primary-100 dark:bg-primary-800'}
              `}
                            style={{ opacity: slot.available ? 1 : 0.5 }}
                        >
                            <Text
                                className={`
                  text-center font-medium
                  ${selectedSlot?.time === slot.time ?
                                    'text-white' :
                                    'text-primary-800 dark:text-primary-200'}
                `}
                            >
                                {formatTime(slot.time)}
                            </Text>
                        </Pressable>
                    ))}

                    {/* Fill empty slots to maintain grid alignment */}
                    {row.length < 3 && Array(3 - row.length).fill(0).map((_, index) => (
                        <View key={`empty-${rowIndex}-${index}`} className="flex-1 mx-1" />
                    ))}
                </View>
            ))}

            {slots.length === 0 && (
                <Text className="text-center text-gray-500 dark:text-gray-400 my-4">
                    {t("noSlotsAvailable")}
                </Text>
            )}
        </View>
    );
};

export default TimeSlotGrid;