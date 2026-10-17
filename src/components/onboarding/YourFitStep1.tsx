import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { DynamicBottomSheet } from '@/components/ui/dynamic-bottom-sheet';
import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';
import { Image } from 'expo-image';

const FIT_OPTIONS = [
  'Yes, I know my size',
  'I think I know my size',
  "I'm not sure",
  "I've never been properly fitted"
];

interface YourFitStep1Props {
  onContinue: (data: any) => void;
  initialData?: Record<string, any>;
  initialSelection?: string;
}

export function YourFitStep1({ onContinue, initialData = {} }: YourFitStep1Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(initialData.fitStatus ?? null);
  const [showModal, setShowModal] = useState(false);

  const handleContinue = () => {
    if (selectedOption === "I'm not sure" || selectedOption === "I've never been properly fitted") {
      setShowModal(true);
    } else if (selectedOption) {
      onContinue({ fitStatus: selectedOption });
    }
  };

  const handleModalContinue = () => {
    setShowModal(false);
    onContinue({ fitStatus: selectedOption, skippedSize: true });
  };

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="heading2" style={styles.heading}>
          Do you know your current bra size?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {FIT_OPTIONS.map((option) => {
            const isSelected = selectedOption === option;
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected
                ]}
                onPress={() => setSelectedOption(option)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton
          btnText="Continue"
          onPress={handleContinue}
          disabled={!selectedOption}
        />
      </View>

      <DynamicBottomSheet
        visible={showModal}
        setVisible={setShowModal}
        icon={
          <Image
            source={require("@/assets/images/arrow.png")}
            style={styles.sheetIcon}
          />
        }
        title="That's completely fine. We'll help you figure it out."
        description="You can still continue — we'll use your preference and fit experiences to personalise your recommendations."
        primaryButton={{
          text: "Continue",
          onPress: handleModalContinue,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: vs(20),
  },
  heading: {
    color: colorPalette.primaryText,
    marginBottom: vs(32),
  },
  optionsContainer: {
    gap: vs(12),
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: vs(16),
    backgroundColor: '#FFFFFF',
  },
  optionCardSelected: {
    borderColor: colorPalette.primary,
    backgroundColor: '#FDF7F8', // very light pink/primary tint
  },
  optionText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  optionTextSelected: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primary,
  },
  spacer: {
    height: vs(40),
  },
  footer: {
    paddingVertical: vs(12),
  },
  sheetIcon: {
    width: s(80),
    height: s(80),
  },
});
