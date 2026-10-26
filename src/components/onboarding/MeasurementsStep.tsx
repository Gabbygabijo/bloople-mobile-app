import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '@/components/buttons/ActionButton';
import { MeasurementDiagram } from '@/components/onboarding/MeasurementDiagram';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colorPalette, Containers } from '@/constants/styles';
import { s, vs } from '@/utils/size';
import { InputField } from '../ui/input-field';

interface MeasurementsStepProps {
  initialUnderbust?: string;
  initialOverbust?: string;
  onContinue: (data: { underbust?: string; overbust?: string }) => void;
  onBack?: () => void;
}

export function MeasurementsStep({
  initialUnderbust,
  initialOverbust,
  onContinue,
  onBack,
}: MeasurementsStepProps) {
  const [underbust, setUnderbust] = useState(initialUnderbust ?? '');
  const [overbust, setOverbust] = useState(initialOverbust ?? '');
  const [diagramMode, setDiagramMode] = useState<'underbust' | 'overbust'>('underbust');

  const isGlassSupported =
    (Platform.OS === 'ios' || Platform.OS === 'macos') &&
    parseInt(String(Platform.Version), 10) >= 26;

  const handleContinue = () => {
    onContinue({
      underbust: underbust.trim() || undefined,
      overbust: overbust.trim() || undefined,
    });
  };

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
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

            {/* ── Title & Subtitle ── */}
            <ThemedText type="heading2" style={styles.title}>
              Measurements
            </ThemedText>
            <Text style={styles.subtitle}>
              Optional but helps refine your Fit-DNA further.
            </Text>

            {/* ── Interactive Diagram Card ── */}
            <View style={styles.diagramSection}>
              <MeasurementDiagram
                mode={diagramMode}
                onToggleMode={setDiagramMode}
              />
            </View>

            {/* ── Form Inputs ── */}
            <View style={styles.inputsContainer}>
              {/* Underbust Field */}
              <InputField
                label='Underbust (Optional)'
                placeholder='e.g 76'
                keyboardType="numeric"
                value={underbust}
                onChangeText={setUnderbust}
                onFocus={() => setDiagramMode('underbust')}
              />

              {/* Overbust Field */}
              <InputField
                label='Overbust (Optional)'
                placeholder='e.g 96'
                keyboardType="numeric"
                value={overbust}
                onChangeText={setOverbust}
                onFocus={() => setDiagramMode('overbust')}
              />
            </View>
          </ScrollView>

          {/* ── Bottom CTA ── */}
          <View style={styles.bottomBar}>
            <ActionButton btnText="Continue" onPress={handleContinue} />
          </View>
        </KeyboardAvoidingView>
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
  keyboardContainer: {
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
    marginBottom: vs(8),
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.secondaryText,
    lineHeight: 20,
    marginBottom: vs(20),
  },
  diagramSection: {
    marginBottom: vs(24),
  },
  inputsContainer: {
    gap: vs(8),
  },
  bottomBar: {
    ...Containers.defaultContainer,
    paddingBottom: vs(12),
    paddingTop: vs(8),
  },
});
