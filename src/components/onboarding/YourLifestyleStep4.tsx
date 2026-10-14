import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { SelectionPillGroup } from '@/components/ui/selection-pill-group';
import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

const MATTERS_MOST_OPTIONS = [
  'Fit',
  'Comfort',
  'Support',
  'Lift',
  'Shape',
  'Cleavage',
  'Coverage',
  'Price',
  'Style / design',
  'Quality',
  'Durability',
];

interface YourLifestyleStep4Props {
  onContinue: (data: { mattersMost: string[] }) => void;
  initialSelections?: string[];
}

export function YourLifestyleStep4({ onContinue, initialSelections = [] }: YourLifestyleStep4Props) {
  const [selected, setSelected] = useState<string[]>(initialSelections);
  const maxSelect = 4;

  const handleToggle = (option: string) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }
      if (prev.length >= maxSelect) {
        return prev;
      }
      return [...prev, option];
    });
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      onContinue({ mattersMost: selected });
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
          What matters most to you?
        </ThemedText>

        <View style={styles.subHeaderRow}>
          <Text style={styles.subtitle}>Choose up to 4.</Text>
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              {selected.length}/{maxSelect}
            </Text>
          </View>
        </View>

        <SelectionPillGroup
          options={MATTERS_MOST_OPTIONS}
          selected={selected}
          onToggle={handleToggle}
          maxSelect={maxSelect}
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
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(24),
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.secondaryText,
  },
  counterBadge: {
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderColor: '#E8E1E4',
    borderRadius: 8,
    paddingHorizontal: s(10),
    paddingVertical: vs(4),
  },
  counterText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: colorPalette.primaryText,
  },
  bottomSpacer: {
    height: vs(32),
  },
  footer: {
    paddingVertical: vs(12),
  },
});
