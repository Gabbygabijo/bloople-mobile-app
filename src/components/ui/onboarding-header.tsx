import { colorPalette } from '@/constants/styles';
import { vs } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string; // e.g., "About You"
}

export function OnboardingHeader({ currentStep, totalSteps, stepTitle }: OnboardingHeaderProps) {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={20} color={colorPalette.primaryText} />
      </TouchableOpacity>
      
      <Text style={styles.stepTitle}>{stepTitle}</Text>
      
      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressSegment, 
              index < currentStep ? styles.progressActive : styles.progressInactive
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(16),
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
    backgroundColor: '#E5E5E5',
  },
});
