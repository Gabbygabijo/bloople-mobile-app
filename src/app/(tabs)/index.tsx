import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { colorPalette } from '@/constants/styles';
import { useBloopleApi } from '@/state/BloopleApiContext';
import { vs } from '@/utils/size';

export default function FitDnaHomeScreen() {
  const router = useRouter();
  const { account, profile, loadMatchStatus } = useBloopleApi();
  const [matchSummary, setMatchSummary] = useState<string | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);

  const refreshMatches = async () => {
    setMatchError(null);
    try {
      const status = await loadMatchStatus();
      setMatchSummary(status.pending ? 'Your recommendations are being prepared.' : `${status.scoredProducts} products scored for your fit.`);
    } catch (error) {
      setMatchError(error instanceof Error ? error.message : 'Recommendations are temporarily unavailable.');
    }
  };

  const answers = profile?.answers ?? {};
  const derived = profile?.derived;
  const name = typeof answers.firstName === 'string' ? answers.firstName : account?.firstName;
  const sizeLabel = derived?.sizeLabel || 'Not added yet';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>BLOOPLE · YOUR FIT-DNA</Text>
      <ThemedText type="heading2">{name ? `Hello, ${name}` : 'Your fit profile'}</ThemedText>
      <Text style={styles.subtitle}>Your saved fit details are ready to personalise recommendations.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>YOUR SIZE</Text>
        <Text style={styles.size}>{sizeLabel}</Text>
        <Text style={styles.body}>{derived?.fitDescription || 'Add your fit details to get a more useful summary.'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>FIT NOTES</Text>
        <Text style={styles.body}>{derived?.tagline || 'Your fit preferences and comfort notes will appear here.'}</Text>
        {derived?.needsTags?.length ? <Text style={styles.tags}>{derived.needsTags.join(' · ')}</Text> : null}
        {derived?.insight ? <Text style={styles.body}>{derived.insight}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>RECOMMENDATIONS</Text>
        <Text style={styles.body}>{matchSummary ?? 'Check the status of your personalised recommendations.'}</Text>
        {matchError ? <Text style={styles.error}>{matchError}</Text> : null}
        <Text onPress={refreshMatches} style={styles.link}>Refresh recommendations</Text>
      </View>

      <ActionButton btnText="Edit Fit-DNA" onPress={() => router.push('/onboarding')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, paddingTop: vs(44), gap: 18, backgroundColor: '#FBF8F4' },
  eyebrow: { color: colorPalette.primary, fontSize: 12, letterSpacing: 1.4, fontWeight: '700' },
  subtitle: { color: colorPalette.secondaryText, lineHeight: 21 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, gap: 8 },
  label: { color: colorPalette.secondaryText, fontSize: 11, letterSpacing: 1, fontWeight: '700' },
  size: { color: colorPalette.primaryText, fontSize: 26, fontWeight: '700' },
  body: { color: colorPalette.primaryText, lineHeight: 21 },
  tags: { color: colorPalette.primary, lineHeight: 21 },
  error: { color: '#A33333' },
  link: { color: colorPalette.primary, textDecorationLine: 'underline', paddingTop: 4 },
});
