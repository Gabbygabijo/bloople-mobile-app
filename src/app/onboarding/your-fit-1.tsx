import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { OnboardingHeader } from '@/components/ui/onboarding-header';
import { colorPalette, Containers } from '@/constants/styles';
import { vs } from '@/utils/size';

const FIT_OPTIONS = [
  'Yes, I know my size',
  'I think I know my size',
  "I'm not sure",
  "I've never been properly fitted"
];

export default function YourFit1Screen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleContinue = () => {
    if (selectedOption === "I'm not sure" || selectedOption === "I've never been properly fitted") {
      setShowModal(true);
    } else if (selectedOption) {
      router.push('/onboarding/your-fit-2');
    }
  };

  const handleModalContinue = () => {
    setShowModal(false);
    // Since we don't have step 3 screens in the screenshot, let's just go to the main app
    router.replace('/');
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <OnboardingHeader currentStep={2} totalSteps={3} stepTitle="Your fit (1/3)" />

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
          // disabled={!selectedOption} 
          />
        </View>

        {/* Modal for "I'm not sure" */}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Using a placeholder emoji instead of the specific graphic for now */}
              <View style={styles.modalIconContainer}>
                <Text style={{ fontSize: 40 }}>✨</Text>
              </View>

              <ThemedText type="heading2" style={styles.modalTitle}>
                That's completely fine. We'll help you figure it out.
              </ThemedText>

              <Text style={styles.modalBody}>
                You can still continue — we'll use your preference and fit experiences to personalise your recommendations.
              </Text>

              <ActionButton
                btnText="Continue"
                onPress={handleModalContinue}
              />
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF8F4',
    ...Containers.defaultContainer,
  },
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FBF8F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vs(24),
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: vs(12),
  },
  modalBody: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.secondaryText,
    textAlign: 'center',
    marginBottom: vs(32),
    lineHeight: 20,
  }
});
