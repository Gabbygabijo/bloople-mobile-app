import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colorPalette } from '@/constants/styles';

export default function CommunityScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="heading2" style={styles.title}>
          Community
        </ThemedText>
        <Text style={styles.subtitle}>
          Connect with women who share your fit profile, share reviews, and find answers.
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
