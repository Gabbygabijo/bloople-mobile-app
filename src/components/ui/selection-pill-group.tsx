import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

interface SelectionPillGroupProps {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  maxSelect?: number;
  disabled?: boolean;
}

export function SelectionPillGroup({
  options,
  selected,
  onToggle,
  maxSelect,
  disabled = false,
}: SelectionPillGroupProps) {
  const isAtMax = maxSelect !== undefined && selected.length >= maxSelect;

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const isDimmed = !isSelected && isAtMax;

        const handlePress = () => {
          if (disabled) return;
          if (!isSelected && isAtMax) return;
          onToggle(option);
        };

        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.7}
            onPress={handlePress}
            disabled={disabled || isDimmed}
            style={[
              styles.pill,
              isSelected ? styles.pillSelected : styles.pillDefault,
              isDimmed && styles.pillDimmed,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                isSelected ? styles.pillTextSelected : styles.pillTextDefault,
                isDimmed && styles.pillTextDimmed,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(10),
  },
  pill: {
    paddingVertical: vs(14),
    paddingHorizontal: s(16),
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillDefault: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E1E4',
  },
  pillSelected: {
    backgroundColor: 'rgba(109, 59, 94, 0.10)',
    borderColor: colorPalette.primary,
  },
  pillDimmed: {
    opacity: 0.45,
  },
  pillText: {
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  pillTextDefault: {
    fontFamily: 'Manrope_400Regular',
  },
  pillTextSelected: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primaryText,
  },
  pillTextDimmed: {
    color: colorPalette.secondaryText,
  },
});
