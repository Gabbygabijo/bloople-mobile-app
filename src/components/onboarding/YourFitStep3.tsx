import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

const BAND_PROBLEMS = [
  'Band feels too tight',
  'Band feels too loose',
  'Band rides up',
  'Band digs in',
  'None of these',
];

const CUP_PROBLEMS = [
  'Cups feel too small',
  'Underwire digs in',
  'Cups feel too large',
  'Underwire sits on breast tissue',
  "Centre gore doesn't sit flat",
  'Cups feel too shallow',
  'Breast tissue escapes underneath',
  'One cup fits differently from the other',
  'Breast tissue spills over the top',
  'Cups gape',
  'Cups feel too deep',
  'None of these',
];

const STRAPS_PROBLEMS = [
  'Straps slip off',
  'Straps dig into shoulders',
  'Straps leave marks',
  "Straps don't feel supportive",
  'I constantly have to adjust them',
  'None of these',
];

const GENERAL_PROBLEMS = [
  'I struggle to find my correct size',
  'Different brands fit completely differently',
  "I don't know what size to buy online",
  'I often need to return bras because of fit',
  "None of these / I'm generally happy with my fit",
];

interface YourFitStep3Props {
  onContinue: (data: any) => void;
}

export function YourFitStep3({ onContinue }: YourFitStep3Props) {
  const [bandSelections, setBandSelections] = useState<string[]>([]);
  const [cupSelections, setCupSelections] = useState<string[]>([]);
  const [strapsSelections, setStrapsSelections] = useState<string[]>([]);
  const [generalSelections, setGeneralSelections] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const toggleSelection = (
    item: string,
    currentSelections: string[],
    setSelections: React.Dispatch<React.SetStateAction<string[]>>,
    noneOption: string
  ) => {
    if (item === noneOption) {
      if (currentSelections.includes(noneOption)) {
        setSelections([]);
      } else {
        setSelections([noneOption]);
      }
    } else {
      if (currentSelections.includes(item)) {
        setSelections(currentSelections.filter((i) => i !== item));
      } else {
        const withoutNone = currentSelections.filter((i) => i !== noneOption);
        setSelections([...withoutNone, item]);
      }
    }
  };

  const handleContinue = () => {
    onContinue({
      bandProblems: bandSelections,
      cupProblems: cupSelections,
      strapsProblems: strapsSelections,
      generalProblems: generalSelections,
      additionalNotes,
    });
  };

  const renderSection = (
    title: string,
    items: string[],
    selections: string[],
    setSelections: React.Dispatch<React.SetStateAction<string[]>>,
    noneOption: string
  ) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.pillsContainer}>
        {items.map((item) => {
          const isSelected = selections.includes(item);
          return (
            <TouchableOpacity
              key={item}
              style={[styles.pill, isSelected && styles.pillActive]}
              onPress={() => toggleSelection(item, selections, setSelections, noneOption)}
              activeOpacity={0.7}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="heading2" style={styles.heading}>
          What fit problems do you usually experience?
        </ThemedText>

        <ThemedText type="bodyText1" style={styles.subheading}>
          Select all that apply
        </ThemedText>

        {/* Band */}
        {renderSection('Band', BAND_PROBLEMS, bandSelections, setBandSelections, 'None of these')}

        {/* Cup */}
        {renderSection('Cup', CUP_PROBLEMS, cupSelections, setCupSelections, 'None of these')}

        {/* Straps */}
        {renderSection('Straps', STRAPS_PROBLEMS, strapsSelections, setStrapsSelections, 'None of these')}

        {/* General Sizing */}
        {renderSection(
          'General sizing',
          GENERAL_PROBLEMS,
          generalSelections,
          setGeneralSelections,
          "None of these / I'm generally happy with my fit"
        )}

        {/* Anything else? (optional) */}
        <View style={styles.optionalContainer}>
          <Text style={styles.optionalTitle}>Anything else? (optional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tell us more"
            placeholderTextColor={colorPalette.secondaryText}
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton btnText="Continue" onPress={handleContinue} />
      </View>
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
    marginBottom: vs(8),
  },
  subheading: {
    color: colorPalette.secondaryText,
    marginBottom: vs(24),
  },
  sectionContainer: {
    marginBottom: vs(24),
  },
  sectionTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colorPalette.secondaryText,
    marginBottom: vs(12),
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(10),
  },
  pill: {
    paddingVertical: vs(14),
    paddingHorizontal: s(16),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E1E4',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillActive: {
    borderColor: colorPalette.primary,
    backgroundColor: '#F7EFF3',
    borderWidth: 1.5,
  },
  pillText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  pillTextActive: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primaryText,
  },
  optionalContainer: {
    marginBottom: vs(24),
  },
  optionalTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colorPalette.primaryText,
    marginBottom: vs(10),
  },
  textArea: {
    minHeight: 82,
    borderWidth: 1,
    borderColor: '#E8E1E4',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: s(14),
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  spacer: {
    height: vs(32),
  },
  footer: {
    paddingVertical: vs(12),
  },
});
