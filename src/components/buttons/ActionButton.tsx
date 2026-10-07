import { colorPalette } from '@/constants/styles';
import { vs } from '@/utils/size';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

const ActionButton = ({
  btnText = 'Start exploring',
  onPress,
  bgColor,
  textColor,
  borderWidth,
  borderColor,
  disabled,
  isLoading,
  btnWidth = '100%',
  icon,
  opacity,
  rightIcon
}: {
  btnText?: string
  onPress?: any
  bgColor?: string
  textColor?: string
  borderWidth?: any
  borderColor?: string
  disabled?: boolean
  isLoading?: any
  btnWidth?: any
  marginR?: any
  icon?: React.JSX.Element
  opacity?: number
  rightIcon?: React.JSX.Element
}) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      marginVertical: vs(5),
      width: '100%',
      flexDirection: 'row',
      // width: '100%',
      justifyContent: 'center',
    },
    btn: {
      backgroundColor: disabled ? colorPalette.secondary : (bgColor || colorPalette.primary),
      paddingVertical: 17,
      // paddingHorizontal: s(16),
      width: btnWidth,
      borderRadius: 8,
      textAlign: 'center',
      overflow: 'hidden',
      borderColor: borderColor || colorPalette.primary,
      borderWidth,
    },
    btnIcon: {
      backgroundColor: disabled ? colorPalette.secondary : (bgColor || colorPalette.primary),
      paddingVertical: 17,
      paddingHorizontal: 16,
      width: btnWidth,
      borderRadius: 8,
      textAlign: 'center',
      overflow: 'hidden',
      borderColor: borderColor || colorPalette.primary,
      borderWidth,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '8',
      alignItems: 'center'
    },
    btnText: {
      color: disabled ? colorPalette.secondaryText : (textColor || colorPalette.background),
      textAlign: 'center',
    },
    loadingBtn: {
      backgroundColor: colorPalette.secondary,
      paddingVertical: 12,
      // paddingHorizontal: s(16),
      width: btnWidth,
      borderRadius: 8,
      textAlign: 'center',
      overflow: 'hidden',
      borderColor: borderColor || colorPalette.primary,
      borderWidth,
    },
  });
  if (isLoading) {
    return (
      <ThemedView style={styles.loadingBtn}>
        <ThemedText style={{textAlign: 'center'}}>Loading...</ThemedText>
      </ThemedView>
    )
  }
  return (
    <TouchableOpacity activeOpacity={opacity ? opacity : 0.4} style={styles.container} onPress={onPress} disabled={disabled}>
      {
        icon ?
          <ThemedView style={styles.btnIcon}>
            {icon}
            <ThemedText style={styles.btnText}>{btnText}</ThemedText>
          </ThemedView>
          :
          rightIcon ?
            <ThemedView style={styles.btnIcon}>
              <ThemedText style={styles.btnText}>{btnText}</ThemedText>
              {rightIcon}
            </ThemedView>
            :
            <ThemedView style={styles.btn}>
              <ThemedText style={styles.btnText}>{btnText}</ThemedText>
            </ThemedView>
      }
    </TouchableOpacity>
  );
};

export default ActionButton;
