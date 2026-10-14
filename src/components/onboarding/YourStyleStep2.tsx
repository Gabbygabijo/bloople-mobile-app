import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { SelectionPillGroup } from '@/components/ui/selection-pill-group';
import { colorPalette } from '@/constants/styles';
import { vs } from '@/utils/size';

const BRA_STYLE_OPTIONS = [
  'Balconette',
  'Plunge',
  'T-shirt',
  'Full cup',
  'Bralette',
  'Push-up',
  'Strapless',
  'Non-wired',
  'Sports bra',
  "I'm not sure",
];

interface YourStyleStep2Props {
  onContinue: (data: { braStyles: string[] }) => void;
  initialSelections?: string[];
}

export function YourStyleStep2({ onContinue, initialSelections = [] }: YourStyleStep2Props) {
  const [selected, setSelected] = useState<string[]>(initialSelections);

  const handleToggle = (option: string) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }
      return [...prev, option];
    });
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      onContinue({ braStyles: selected });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="heading2" style={styles.heading}>
          Which bra styles do you usually wear?
        </ThemedText>

        <ThemedText type="bodyText1" style={styles.subtitle}>
          Select all that apply.
        </ThemedText>

        <SelectionPillGroup
          options={BRA_STYLE_OPTIONS}
          selected={selected}
          onToggle={handleToggle}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton
          btnText="Continue"
          onPress={handleContinue}
          disabled={selected.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vs(24),
  },
  heading: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 28,
    lineHeight: 34,
    color: colorPalette.primaryText,
    marginBottom: vs(12),
  },
  subtitle: {
    color: colorPalette.secondaryText,
    marginBottom: vs(24),
  },
  bottomSpacer: {
    height: vs(32),
  },
  footer: {
    paddingVertical: vs(12),
  },
});
