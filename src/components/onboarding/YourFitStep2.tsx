import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { SelectField, SelectOption } from '@/components/ui/select-field';
import { colorPalette } from '@/constants/styles';
import { vs } from '@/utils/size';
import { useBloopleApi } from '@/state/BloopleApiContext';

type RegionType = 'UK' | 'US' | 'EU';

const REGIONS: RegionType[] = ['UK', 'US', 'EU'];

const REGION_DATA: Record<RegionType, { bands: string[]; cups: string[] }> = {
  US: {
    bands: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
    cups: ['AA', 'A', 'B', 'C', 'DD', 'DDD', 'DDD/F', 'G', 'H', 'I'],
  },
  UK: {
    bands: ['28', '30', '32', '34', '36', '38', '40', '42', '44'],
    cups: ['A', 'B', 'C', 'D', 'DD/E', 'F', 'FF', 'G', 'GG', 'H'],
  },
  EU: {
    bands: ['60', '65', '70', '75', '80', '85', '90'],
    cups: ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  },
};

const FIT_OPTIONS: SelectOption[] = [
  { label: 'Usually fits', value: 'Usually fits' },
  { label: 'Sometimes fits', value: 'Sometimes fits' },
  { label: 'Rarely fits', value: 'Rarely fits' },
];

interface YourFitStep2Props {
  onContinue: (data: any) => void;
  initialData?: Record<string, any>;
}

export function YourFitStep2({ onContinue, initialData = {} }: YourFitStep2Props) {
  const { sizeOptions } = useBloopleApi();
  const [region, setRegion] = useState<RegionType>(initialData.region ?? 'UK');
  const [band, setBand] = useState<string | null>(initialData.band ?? null);
  const [cup, setCup] = useState<string | null>(initialData.cup ?? null);
  const [fitPreference, setFitPreference] = useState(initialData.fitPreference ?? '');

  const handleRegionChange = (newRegion: RegionType) => {
    setRegion(newRegion);
    // Reset band or cup if not available in selected region
    const options = sizeOptions?.[newRegion] ?? REGION_DATA[newRegion];
    if (band && !options.bands.includes(band)) {
      setBand(null);
    }
    if (cup && !options.cups.includes(cup)) {
      setCup(null);
    }
  };

  const handleContinue = () => {
    onContinue({ region, band, cup, fitPreference });
  };

  const getSelectedDisplay = () => {
    if (!band && !cup) {
      return '- - / - -';
    }
    const sizePart = [band, cup].filter(Boolean).join('');
    return `${region} ${sizePart}`;
  };

  const currentBands = sizeOptions?.[region].bands ?? REGION_DATA[region].bands;
  const currentCups = sizeOptions?.[region].cups ?? REGION_DATA[region].cups;

  const renderGrid = (
    items: string[],
    selectedValue: string | null,
    onSelect: (val: string) => void
  ) => {
    const rows: string[][] = [];
    for (let i = 0; i < items.length; i += 5) {
      rows.push(items.slice(i, i + 5));
    }

    return (
      <View style={styles.gridContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.gridRow}>
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const item = row[colIndex];
              if (!item) {
                return (
                  <View
                    key={`empty-${colIndex}`}
                    style={[styles.gridItem, styles.gridItemHidden]}
                  />
                );
              }
              const isSelected = selectedValue === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.gridItem, isSelected && styles.gridItemActive]}
                  onPress={() => onSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.gridItemText,
                      isSelected && styles.gridItemTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="heading2" style={styles.heading}>
          What size do you usually get?
        </ThemedText>

        {/* Selected size pill & Region Toggle */}
        <View style={styles.topBarContainer}>
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedLabel}>
              Selected:{'  '}
              <Text style={styles.selectedValue}>{getSelectedDisplay()}</Text>
            </Text>
          </View>

          <View style={styles.regionToggleGroup}>
            {REGIONS.map((r) => {
              const isSelected = region === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.regionBtn, isSelected && styles.regionBtnActive]}
                  onPress={() => handleRegionChange(r)}
                  activeOpacity={0.8}
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
          {renderGrid(currentBands, band, (selected) => {
            setBand((prev) => (prev === selected ? null : selected));
          })}
        </View>

        {/* Cup Sizes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cup</Text>
          {renderGrid(currentCups, cup, (selected) => {
            setCup((prev) => (prev === selected ? null : selected));
          })}
        </View>

        {/* Fit Dropdown */}
        <View style={[styles.sectionContainer, { marginTop: vs(12) }]}>
          <SelectField
            label="How well does that size usually fit you?"
            placeholder="Usually fits"
            value={fitPreference}
            options={FIT_OPTIONS}
            onSelect={(val) => setFitPreference(val)}
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
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(24),
  },
  selectedBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    justifyContent: 'center',
  },
  selectedLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colorPalette.secondaryText,
  },
  selectedValue: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primaryText,
  },
  regionToggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#EBEBEB',
    borderRadius: 8,
    padding: 3,
  },
  regionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  regionBtnActive: {
    backgroundColor: colorPalette.primary,
  },
  regionBtnText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: colorPalette.secondaryText,
  },
  regionBtnTextActive: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#FFFFFF',
  },
  sectionContainer: {
    marginBottom: vs(20),
  },
  sectionTitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.primaryText,
    marginBottom: vs(10),
  },
  gridContainer: {
    gap: 8,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 8,
  },
  gridItem: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemHidden: {
    opacity: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  gridItemActive: {
    borderColor: colorPalette.primary,
    backgroundColor: '#F7EFF3',
  },
  gridItemText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  gridItemTextActive: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primaryText,
  },
  spacer: {
    height: vs(32),
  },
  footer: {
    paddingVertical: vs(12),
  },
});
