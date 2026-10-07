import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { OnboardingHeader } from '@/components/ui/onboarding-header';
import { Containers } from '@/constants/styles';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  onBack?: () => void;
}

export function OnboardingLayout({ 
  children, 
  currentStep, 
  totalSteps, 
  stepTitle,
  onBack 
}: OnboardingLayoutProps) {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <OnboardingHeader 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            stepTitle={stepTitle}
            onBack={onBack}
          />
          {children}
        </KeyboardAvoidingView>
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
});
