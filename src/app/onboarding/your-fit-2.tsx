import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { OnboardingHeader } from '@/components/ui/onboarding-header';
import { SelectField } from '@/components/ui/select-field';
import { colorPalette, Containers } from '@/constants/styles';
import { vs } from '@/utils/size';

const REGIONS = ['UK', 'US', 'EU'];
const BAND_SIZES = ['28', '30', '32', '34', '36', '38', '40', '42', '44'];
const CUP_SIZES = ['A', 'B', 'C', 'D', 'DD/E', 'F', 'FF', 'G', 'GG', 'H'];

export default function YourFit2Screen() {
  const router = useRouter();
  
  const [region, setRegion] = useState('UK');
  const [band, setBand] = useState<string | null>(null);
  const [cup, setCup] = useState<string | null>(null);
  const [fitPreference, setFitPreference] = useState('');

  const handleContinue = () => {
    // Next step not provided, so route to home or wherever
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <OnboardingHeader currentStep={2} totalSteps={3} stepTitle="Your fit (2/3)" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="heading2" style={styles.heading}>
          What size do you usually get?
        </ThemedText>

        {/* Region Toggle */}
        <View style={styles.regionToggleContainer}>
          <Text style={styles.regionLabel}>Selected region</Text>
          <View style={styles.regionToggleGroup}>
            {REGIONS.map((r) => {
              const isSelected = region === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.regionBtn, isSelected && styles.regionBtnActive]}
                  onPress={() => setRegion(r)}
                >
                  <Text style={[styles.regionBtnText, isSelected && styles.regionBtnTextActive]}>
                    {r}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Band Sizes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Band</Text>
          <View style={styles.gridContainer}>
            {BAND_SIZES.map((size) => {
              const isSelected = band === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[styles.gridItem, isSelected && styles.gridItemActive]}
                  onPress={() => setBand(size)}
                >
                  <Text style={[styles.gridItemText, isSelected && styles.gridItemTextActive]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Cup Sizes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cup</Text>
          <View style={styles.gridContainer}>
            {CUP_SIZES.map((size) => {
              const isSelected = cup === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[styles.gridItem, isSelected && styles.gridItemActive]}
                  onPress={() => setCup(size)}
                >
                  <Text style={[styles.gridItemText, isSelected && styles.gridItemTextActive]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Fit Dropdown */}
        <View style={[styles.sectionContainer, { marginTop: vs(16) }]}>
          <SelectField
            label="How well does that size usually fit you?"
            placeholder="Usually fits"
            value={fitPreference}
            onPress={() => {
              // Just a toggle for demo
              setFitPreference(prev => prev === 'Usually fits well' ? 'Too small' : 'Usually fits well');
            }}
          />
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton 
          btnText="Continue" 
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
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
    marginBottom: vs(24),
  },
  regionToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(32),
  },
  regionLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colorPalette.secondaryText,
  },
  regionToggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 4,
  },
  regionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  regionBtnActive: {
    backgroundColor: colorPalette.primary,
  },
  regionBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: colorPalette.secondaryText,
  },
  regionBtnTextActive: {
    color: '#FFFFFF',
  },
  sectionContainer: {
    marginBottom: vs(24),
  },
  sectionTitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colorPalette.secondaryText,
    marginBottom: vs(12),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: '22%', // Roughly 4 items per row
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemActive: {
    borderColor: colorPalette.primary,
    backgroundColor: '#FDF7F8',
  },
  gridItemText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  gridItemTextActive: {
    color: colorPalette.primary,
  },
  spacer: {
    height: vs(40),
  },
  footer: {
    paddingVertical: vs(12),
  },
});
