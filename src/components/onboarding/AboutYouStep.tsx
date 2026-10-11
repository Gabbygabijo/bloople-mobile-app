import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { InputField } from '@/components/ui/input-field';
import { SelectField, SelectOption } from '@/components/ui/select-field';
import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

const AGE_RANGE_OPTIONS: SelectOption[] = [
  { label: '18 - 24', value: '18 - 24' },
  { label: '25 - 34', value: '25 - 34' },
  { label: '35 - 44', value: '35 - 44' },
  { label: '45 - 54', value: '45 - 54' },
  { label: '55+', value: '55+' },
];

interface AboutYouStepProps {
  onContinue: (data: any) => void;
}

export function AboutYouStep({ onContinue }: AboutYouStepProps) {
  // State for form
  const [firstName, setFirstName] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [phone, setPhone] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft/in'>('cm');

  const handleContinue = () => {
    onContinue({ firstName, ageRange, email, country, phone, height, heightUnit });
  };

  return (
    <>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="heading2" style={styles.heading}>
          First, tell us a little about you.
        </ThemedText>

        <InputField
          label="First name"
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <SelectField
          label="Age Range"
          placeholder="Select range"
          value={ageRange}
          options={AGE_RANGE_OPTIONS}
          onSelect={(val) => setAgeRange(val)}
        />

        <InputField
          label="Email"
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <SelectField
          label="Country"
          placeholder="United Kingdom"
          value={country}
          leftElement={<Text style={{ fontSize: 16 }}>🇬🇧</Text>}
          onPress={() => {}} // Country picker modal placeholder
        />

        <InputField
          label="Phone number"
          placeholder="+44 6757 8974 2343"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          leftElement={
            <TouchableOpacity style={styles.phonePrefix}>
              <Text style={{ fontSize: 16 }}>🇬🇧</Text>
              <Ionicons name="chevron-down" size={14} color={colorPalette.primaryText} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          }
        />

        <InputField
          label="Height (Optional)"
          placeholder="e.g. 165"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          leftElement={
            <View style={styles.unitToggle}>
              <TouchableOpacity 
                style={[styles.unitBtn, heightUnit === 'cm' && styles.unitBtnActive]}
                onPress={() => setHeightUnit('cm')}
              >
                <Text style={[styles.unitText, heightUnit === 'cm' && styles.unitTextActive]}>cm</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.unitBtn, heightUnit === 'ft/in' && styles.unitBtnActive]}
                onPress={() => setHeightUnit('ft/in')}
              >
                <Text style={[styles.unitText, heightUnit === 'ft/in' && styles.unitTextActive]}>ft/in</Text>
              </TouchableOpacity>
            </View>
          }
        />

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton 
          btnText="Continue" 
          onPress={handleContinue} 
        />
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
    marginBottom: vs(24),
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: s(8),
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
    paddingRight: s(8),
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    padding: s(2),
    marginRight: s(8),
  },
  unitBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  unitBtnActive: {
    backgroundColor: colorPalette.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  unitText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: colorPalette.secondaryText,
  },
  unitTextActive: {
    color: colorPalette.surface,
  },
  spacer: {
    height: vs(40),
  },
  footer: {
    paddingVertical: vs(12),
  },
});
