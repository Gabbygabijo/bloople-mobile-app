import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ThemedText } from '../themed-text';

import { colorPalette } from '@/constants/styles';
import { vs } from '@/utils/size';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  options?: SelectOption[];
  onSelect?: (value: string, option: SelectOption) => void;
  onChange?: (value: string) => void;
  onPress?: () => void;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  disabled?: boolean;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function SelectField({
  label,
  placeholder,
  value,
  options,
  onSelect,
  onChange,
  onPress,
  leftElement,
  rightElement,
  disabled,
  error,
  containerStyle,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options?.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : value || placeholder;
  const isPlaceholder = !selectedOption && !value;

  const handlePress = () => {
    if (disabled) return;
    if (options && options.length > 0) {
      setIsOpen((prev) => !prev);
    }
    onPress?.();
  };

  const handleSelectOption = (option: SelectOption) => {
    setIsOpen(false);
    onSelect?.(option.value, option);
    onChange?.(option.value);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TouchableOpacity
        style={[
          styles.inputContainer,
          isOpen && styles.inputContainerOpen,
          error ? styles.inputError : null,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
        <Text style={[styles.text, isPlaceholder && styles.placeholder]}>
          {displayText}
        </Text>
        {rightElement ? (
          rightElement
        ) : (
          <Ionicons
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colorPalette.primaryText}
          />
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {isOpen && options && options.length > 0 && (
        <View style={styles.dropdownContainer}>
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isLast = index === options.length - 1;
            return (
              <React.Fragment key={option.value}>
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    isSelected && styles.optionItemSelected,
                  ]}
                  onPress={() => handleSelectOption(option)}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={18} color={colorPalette.primary} />
                  )}
                </TouchableOpacity>
                {!isLast && <View style={styles.optionDivider} />}
              </React.Fragment>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: vs(16),
  },
  label: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    minHeight: 52,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
  },
  inputContainerOpen: {
    borderColor: '#D0D0D0',
  },
  inputError: {
    borderColor: colorPalette.error,
  },
  leftElement: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  placeholder: {
    color: colorPalette.secondaryText,
  },
  dropdownContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionItemSelected: {
    backgroundColor: '#FAF7F8',
  },
  optionText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  optionTextSelected: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primary,
  },
  optionDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  errorText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colorPalette.error,
    marginTop: 4,
  },
});

