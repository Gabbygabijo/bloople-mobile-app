import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colorPalette } from '@/constants/styles';
import { ThemedText } from '../themed-text';
import { Ionicons } from '@expo/vector-icons';
import { vs } from '@/utils/size';

interface SelectFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onPress?: () => void;
  leftElement?: React.ReactNode;
}

export function SelectField({ label, placeholder, value, onPress, leftElement }: SelectFieldProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TouchableOpacity 
        style={styles.inputContainer} 
        onPress={onPress} 
        activeOpacity={0.7}
      >
        {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colorPalette.primaryText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: vs(16),
  },
  label: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
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
  }
});
