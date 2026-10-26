import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

const PRICE_OPTIONS = [
  'Under £15',
  '£15 - £25',
  '£25 - £40',
  '£40 - £60',
  '£60+',
  'No preference',
];

interface YourStyleStep3Props {
  onContinue: (data: { pricePreference: string }) => void;
  initialSelection?: string;
}

export function YourStyleStep3({ onContinue, initialSelection = '' }: YourStyleStep3Props) {
  const [selectedOption, setSelectedOption] = useState<string>(initialSelection);

  const handleContinue = () => {
    if (selectedOption) {
      onContinue({ pricePreference: selectedOption });
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
          What do you usually like to spend on a bra?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {PRICE_OPTIONS.map((option) => {
            const isSelected = selectedOption === option;
            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                onPress={() => setSelectedOption(option)}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton
          btnText="Continue"
          onPress={handleContinue}
          disabled={!selectedOption}
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
    marginBottom: vs(24),
  },
  optionsContainer: {
    gap: vs(16),
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E8E1E4',
    borderRadius: 12,
    paddingVertical: vs(16),
    paddingHorizontal: s(16),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  optionCardSelected: {
    borderColor: colorPalette.primary,
    backgroundColor: 'rgba(109, 59, 94, 0.10)',
  },
  optionText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  optionTextSelected: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primaryText,
  },
  bottomSpacer: {
    height: vs(32),
  },
  footer: {
    paddingVertical: vs(12),
  },
});
