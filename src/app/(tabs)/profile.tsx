import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colorPalette } from '@/constants/styles';
import { useBloopleApi } from '@/state/BloopleApiContext';
import { vs } from '@/utils/size';

export default function ProfileScreen() {
  const router = useRouter();
  const { account, profile } = useBloopleApi();

  const answers = profile?.answers ?? {};
  const derived = profile?.derived;
  const name = typeof answers.firstName === 'string' ? answers.firstName : account?.firstName;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="heading2" style={styles.title}>
          {name ? `Hello, ${name}` : 'My Profile'}
        </ThemedText>
        <Text style={styles.subtitle}>
          Manage your Fit-DNA preferences and personal details.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>YOUR FIT-DNA</Text>
          <Text style={styles.cardValue}>{derived?.sizeLabel || 'Size not added yet'}</Text>
          {derived?.tagline ? <Text style={styles.cardBody}>{derived.tagline}</Text> : null}
        </View>

        <View style={styles.buttonWrapper}>
          <ActionButton
            btnText="Edit Fit-DNA"
            onPress={() => router.push('/onboarding')}
          />
        </View>
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
    marginBottom: vs(24),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8E1E4',
    gap: 8,
    marginBottom: vs(24),
  },
  cardLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: colorPalette.secondaryText,
  },
  cardValue: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 22,
    color: colorPalette.primaryText,
  },
  cardBody: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
    lineHeight: 20,
  },
  buttonWrapper: {
    marginTop: 'auto',
  },
});
