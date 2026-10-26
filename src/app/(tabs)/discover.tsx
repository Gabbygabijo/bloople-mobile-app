import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colorPalette } from '@/constants/styles';

export default function DiscoverScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="heading2" style={styles.title}>
          Discover
        </ThemedText>
        <Text style={styles.subtitle}>
          Browse bras and styles tailored to your Fit-DNA.
        </Text>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  safeArea: {
    flex: 1,
    padding: 24,
  },
  title: {
    color: colorPalette.primaryText,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.secondaryText,
  },
});
