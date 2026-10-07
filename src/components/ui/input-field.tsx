import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native';
import { colorPalette } from '@/constants/styles';
import { ThemedText } from '../themed-text';
import { vs } from '@/utils/size';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerStyle?: import('react-native').StyleProp<import('react-native').ViewStyle>;
}

export function InputField({ label, error, leftElement, rightElement, style, containerStyle, ...rest }: InputFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftElement}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colorPalette.secondaryText}
          {...rest}
        />
        {rightElement}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  inputError: {
    borderColor: colorPalette.error,
  },
  input: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
    height: '100%',
    paddingVertical: 14, // Ensure text is centered properly
  },
  errorText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colorPalette.error,
    marginTop: 4,
  },
});
