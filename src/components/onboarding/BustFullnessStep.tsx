import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colorPalette, Containers } from '@/constants/styles';
import { s, vs } from '@/utils/size';

const BUST_FULLNESS_OPTIONS = [
  'Fuller on top',
  'Fuller on bottom',
  'Even',
  'Not sure',
];

interface BustFullnessStepProps {
  initialSelection?: string;
  onContinue: (data: { bustFullness: string }) => void;
  onBack?: () => void;
}

export function BustFullnessStep({
  initialSelection,
  onContinue,
  onBack,
}: BustFullnessStepProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    initialSelection ?? null
  );

  const isGlassSupported =
    (Platform.OS === 'ios' || Platform.OS === 'macos') &&
    parseInt(String(Platform.Version), 10) >= 26;

  const handleContinue = () => {
    if (selectedOption) {
      onContinue({ bustFullness: selectedOption });
    }
  };

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* ── Content ── */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
        >
          {/* ── Top Navigation Bar ── */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButtonWrapper}
              activeOpacity={0.7}
            >
              {isGlassSupported ? (
                <GlassView glassEffectStyle="clear" style={styles.backButtonInner}>
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={colorPalette.primaryText}
                  />
                </GlassView>
              ) : (
                <View
                  style={[styles.backButtonInner, { backgroundColor: '#FFFFFF' }]}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={colorPalette.primaryText}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <ThemedText type="heading2" style={styles.title}>
            Bust fullness
          </ThemedText>

          <View style={styles.optionsContainer}>
            {BUST_FULLNESS_OPTIONS.map((option) => {
              const isSelected = selectedOption === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => setSelectedOption(option)}
                  activeOpacity={0.7}
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
        </ScrollView>

        {/* ── Bottom CTA ── */}
        <View style={styles.bottomBar}>
          <ActionButton
            btnText="Continue"
            onPress={handleContinue}
            disabled={!selectedOption}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    paddingTop: s(8),
    paddingBottom: s(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonWrapper: {
    zIndex: 10,
  },
  backButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    ...Containers.defaultContainer,
    paddingBottom: vs(32),
  },
  title: {
    color: colorPalette.primaryText,
    marginBottom: vs(28),
  },
  optionsContainer: {
    gap: vs(12),
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E8E1E4',
    borderRadius: s(10),
    paddingVertical: vs(18),
    paddingHorizontal: s(16),
    backgroundColor: '#FFFFFF',
  },
  optionCardSelected: {
    borderColor: colorPalette.primary,
    backgroundColor: '#F4EEF1',
  },
  optionText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: colorPalette.primaryText,
  },
  optionTextSelected: {
    fontFamily: 'Manrope_500Medium',
    color: colorPalette.primaryText,
  },
  bottomBar: {
    ...Containers.defaultContainer,
    paddingBottom: vs(12),
    paddingTop: vs(8),
  },
});
