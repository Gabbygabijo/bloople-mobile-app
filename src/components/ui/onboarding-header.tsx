import { colorPalette, Containers } from '@/constants/styles';
import { vs } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string; // e.g., "About You"
  onBack?: () => void;
  progressStep?: number;
}

export function OnboardingHeader({ currentStep, totalSteps, stepTitle, onBack, progressStep }: OnboardingHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  const condition = (Platform.OS === 'ios' || Platform.OS === 'macos') && parseInt(String(Platform.Version), 10) >= 26
  const activeSegments = progressStep ?? currentStep;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButtonWrapper}>
        {condition ? (
          <GlassView glassEffectStyle="clear" style={styles.backButtonInner}>
            <Ionicons name="chevron-back" size={20} color={colorPalette.primaryText} />
          </GlassView>
        ) : (
          <View style={[styles.backButtonInner, { backgroundColor: '#FFFFFF' }]}>
            <Ionicons name="chevron-back" size={20} color={colorPalette.primaryText} />
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.stepTitle}>{stepTitle}</Text>

      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressSegment,
              index < activeSegments ? styles.progressActive : styles.progressInactive
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: vs(20),
    paddingBottom: vs(24),
  },
  backButtonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: vs(16),
    ...Containers.backIconShadow
  },
  backButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stepTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: colorPalette.primaryText,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: colorPalette.primary,
  },
  progressInactive: {
    backgroundColor: '#D2D2D2',
  },
});
