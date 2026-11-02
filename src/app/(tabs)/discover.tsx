import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ProductCard, type ProductItem } from '@/components/cards/ProductCard';
import PlainLayout from '@/components/layouts/PlainLayout';
import DynamicBottomSheet from '@/components/ui/dynamic-bottom-sheet';
import { colorPalette, Containers } from '@/constants/styles';
import { s, vs } from '@/utils/size';

// ── Categories ──
const CATEGORIES = ['Bras', 'Sports Bras', 'Lingerie', 'Swim', 'Active'];

// ── Mock Product Catalog ──
const DISCOVER_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    brand: 'Curvy Kate',
    title: 'Full Coverage T-Shirt Bra',
    price: '£38',
    matchScore: '94% match',
    image: require('@/assets/images/products/Full-Coverage-T-Shirt-Bra.png'),
  },
  {
    id: '2',
    brand: 'Elomi',
    title: 'Wireless Balconette',
    price: '£32',
    matchScore: '91% match',
    image: require('@/assets/images/products/burgundy_lace_bra.jpg'),
  },
  {
    id: '3',
    brand: 'Freya',
    title: 'Plunge Swim Top',
    price: '£45',
    matchScore: '94% match',
    image: require('@/assets/images/products/burgundy_lace_bra.jpg'),
  },
  {
    id: '4',
    brand: 'Elomi',
    title: 'Wireless Balconette',
    price: '£32',
    matchScore: '91% match',
    image: require('@/assets/images/products/nude_plunge_bra.jpg'),
  },
  {
    id: '5',
    brand: 'Elomi',
    title: 'Wireless Balconette',
    price: '£32',
    matchScore: '91% match',
    image: require('@/assets/images/products/burgundy_lace_bra.jpg'),
  },
  {
    id: '6',
    brand: 'Curvy Kate',
    title: 'Full Coverage T-Shirt Bra',
    price: '£38',
    matchScore: '94% match',
    image: require('@/assets/images/products/white_tshirt_bra.jpg'),
  },
];

// ── Filter Options ──
const BAND_SIZES = ['28', '30', '32', '34', '36', '38', '40'];
const CUP_SIZES = ['A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H'];
const STYLES = ['Balconette', 'Plunge', 'T-shirt', 'Strapless', 'Full cup', 'Push-up', 'Bralette'];
const SUPPORTS = ['High', 'Medium', 'Low'];
const COVERAGES = ['Full', 'Medium', 'Plunge/Lower'];
const ACTIVITIES = ['Gym', 'Running', 'Yoga', 'Work', 'Everyday'];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Bras');
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);

  // Filter selections
  const [selectedBand, setSelectedBand] = useState<string | null>('28');
  const [selectedCup, setSelectedCup] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>('Plunge');
  const [selectedSupport, setSelectedSupport] = useState<string | null>('High');
  const [selectedCoverage, setSelectedCoverage] = useState<string | null>('Full');
  const [selectedActivity, setSelectedActivity] = useState<string | null>('Gym');

  // Active applied state
  const [isFiltered, setIsFiltered] = useState(false);

  // Active filter tags for chip row
  const activeChips = [
    selectedBand,
    selectedCup,
    selectedStyle,
    selectedSupport,
    selectedCoverage,
    selectedActivity,
  ].filter(Boolean) as string[];

  const handleApplyFilters = () => {
    setIsFiltered(true);
    setIsFilterSheetVisible(false);
  };

  const handleClearFilters = () => {
    setSelectedBand(null);
    setSelectedCup(null);
    setSelectedStyle(null);
    setSelectedSupport(null);
    setSelectedCoverage(null);
    setSelectedActivity(null);
    setIsFiltered(false);
  };

  const handleRemoveChip = (chip: string) => {
    if (selectedBand === chip) setSelectedBand(null);
    if (selectedCup === chip) setSelectedCup(null);
    if (selectedStyle === chip) setSelectedStyle(null);
    if (selectedSupport === chip) setSelectedSupport(null);
    if (selectedCoverage === chip) setSelectedCoverage(null);
    if (selectedActivity === chip) setSelectedActivity(null);
  };

  return (
    <>
      <PlainLayout
        title="Discover"
        subTitle="Find products that fit you."
      >
        <View style={Containers.defaultContainer}>
          {/* ── 1. Search Bar & Filter Button ── */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search-outline" size={18} color="#706970" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search bras, brands, styles"
                placeholderTextColor="#8E8A8D"
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={8}>
                  <Ionicons name="close-circle" size={16} color="#706970" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.filterButton,
                isFiltered && styles.filterButtonActive,
              ]}
              activeOpacity={0.75}
              onPress={() => setIsFilterSheetVisible(true)}
            >
              <Ionicons
                name="options-outline"
                size={20}
                color={isFiltered ? colorPalette.primary : colorPalette.primaryText}
              />
            </TouchableOpacity>
          </View>

          {/* ── 2. Category Pills (Horizontal Scroll) ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
            style={styles.categoriesScroll}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryPill,
                    isSelected && styles.categoryPillSelected,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryPillText,
                      isSelected && styles.categoryPillTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ── 3. Filter Chips Row (When Filters are Applied) ── */}
          {isFiltered && activeChips.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsContent}
              style={styles.chipsScroll}
            >
              {activeChips.map((chip) => (
                <View key={chip} style={styles.chipPill}>
                  <Text style={styles.chipText}>{chip}</Text>
                  <TouchableOpacity onPress={() => handleRemoveChip(chip)} hitSlop={6}>
                    <Ionicons name="close" size={12} color="#706970" style={{ marginLeft: 3 }} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {/* ── 4. Section Header ── */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>
              {isFiltered ? 'Search Result (30)' : 'Matched to your Fit-DNA'}
            </Text>

            {isFiltered && (
              <TouchableOpacity onPress={handleClearFilters} activeOpacity={0.7}>
                <Text style={styles.clearFilterLink}>Clear Filter</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ── 5. Product Grid (2 Columns) ── */}
          <View style={styles.productsGrid}>
            {DISCOVER_PRODUCTS.map((product) => (
              <View key={product.id} style={styles.productCardWrapper}>
                <ProductCard
                  product={product}
                  style={styles.cardItem}
                  onPress={() =>
                    router.push({
                      pathname: '/ItemView',
                      params: { id: product.id },
                    })
                  }
                />
              </View>
            ))}
          </View>
        </View>
      </PlainLayout>

      {/* ── 6. Filter Products Bottom Sheet ── */}
      <DynamicBottomSheet
        visible={isFilterSheetVisible}
        onClose={() => setIsFilterSheetVisible(false)}
        scrollable
        snapPoints={['88%']}
        showHandle
      >
        <View style={styles.filterSheetContent}>
          {/* Header */}
          <View style={styles.filterSheetHeader}>
            <Text style={styles.filterSheetTitle}>Filter products</Text>
            <TouchableOpacity onPress={handleClearFilters} activeOpacity={0.7}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </View>

          {/* Band */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Band</Text>
            <View style={styles.pillsWrapRow}>
              {BAND_SIZES.map((size) => {
                const isSelected = selectedBand === size;
                return (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.squarePill,
                      isSelected && styles.squarePillSelected,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedBand(isSelected ? null : size)}
                  >
                    <Text
                      style={[
                        styles.squarePillText,
                        isSelected && styles.squarePillTextSelected,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Cup */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Cup</Text>
            <View style={styles.pillsWrapRow}>
              {CUP_SIZES.map((cup) => {
                const isSelected = selectedCup === cup;
                return (
                  <TouchableOpacity
                    key={cup}
                    style={[
                      styles.squarePill,
                      isSelected && styles.squarePillSelected,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedCup(isSelected ? null : cup)}
                  >
                    <Text
                      style={[
                        styles.squarePillText,
                        isSelected && styles.squarePillTextSelected,
                      ]}
                    >
                      {cup}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.filterSection}>
            <View style={styles.priceHeaderRow}>
              <Text style={styles.filterLabel}>Price</Text>
              <Text style={styles.priceRangeText}>£38 - £100</Text>
            </View>
            <View style={styles.priceSliderTrack}>
              <View style={styles.priceSliderActive} />
              <View style={[styles.sliderThumb, { left: '28%' }]} />
              <View style={[styles.sliderThumb, { right: 0 }]} />
            </View>
            <View style={styles.priceLabelsRow}>
              <Text style={styles.priceBoundText}>£10</Text>
              <Text style={styles.priceBoundText}>£100</Text>
            </View>
          </View>

          {/* Style */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Style</Text>
            <View style={styles.pillsWrapRow}>
              {STYLES.map((st) => {
                const isSelected = selectedStyle === st;
                return (
                  <TouchableOpacity
                    key={st}
                    style={[
                      styles.tagPill,
                      isSelected && styles.tagPillSelected,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedStyle(isSelected ? null : st)}
                  >
                    <Text
                      style={[
                        styles.tagPillText,
                        isSelected && styles.tagPillTextSelected,
                      ]}
                    >
                      {st}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Support */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Support</Text>
            <View style={styles.pillsWrapRow}>
              {SUPPORTS.map((sup) => {
                const isSelected = selectedSupport === sup;
                return (
                  <TouchableOpacity
                    key={sup}
                    style={[
                      styles.tagPill,
                      isSelected && styles.tagPillSelected,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedSupport(isSelected ? null : sup)}
                  >
                    <Text
                      style={[
                        styles.tagPillText,
                        isSelected && styles.tagPillTextSelected,
                      ]}
                    >
                      {sup}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Coverage */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Coverage</Text>
            <View style={styles.pillsWrapRow}>
              {COVERAGES.map((cov) => {
                const isSelected = selectedCoverage === cov;
                return (
                  <TouchableOpacity
                    key={cov}
                    style={[
                      styles.tagPill,
                      isSelected && styles.tagPillSelected,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedCoverage(isSelected ? null : cov)}
                  >
                    <Text
                      style={[
                        styles.tagPillText,
                        isSelected && styles.tagPillTextSelected,
                      ]}
                    >
                      {cov}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Activity */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Activity</Text>
            <View style={styles.pillsWrapRow}>
              {ACTIVITIES.map((act) => {
                const isSelected = selectedActivity === act;
                return (
                  <TouchableOpacity
                    key={act}
                    style={[
                      styles.tagPill,
                      isSelected && styles.tagPillSelected,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedActivity(isSelected ? null : act)}
                  >
                    <Text
                      style={[
                        styles.tagPillText,
                        isSelected && styles.tagPillTextSelected,
                      ]}
                    >
                      {act}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyBtn}
            activeOpacity={0.85}
            onPress={handleApplyFilters}
          >
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </DynamicBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  // ── Search & Filter Row ──
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    marginTop: vs(12),
  },
  searchInputContainer: {
    flex: 1,
    height: vs(40),
    backgroundColor: '#FFFFFF',
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#E8E1E4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(12),
  },
  searchIcon: {
    marginRight: s(8),
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colorPalette.primaryText,
    paddingVertical: 0,
  },
  filterButton: {
    width: s(44),
    height: vs(40),
    backgroundColor: '#FFFFFF',
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#E8E1E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#F3E8EE',
    borderColor: colorPalette.primary,
  },

  // ── Category Pills ──
  categoriesScroll: {
    marginTop: vs(12),
    marginHorizontal: -s(8),
  },
  categoriesContent: {
    paddingHorizontal: s(8),
    gap: s(8),
  },
  categoryPill: {
    paddingHorizontal: s(16),
    paddingVertical: vs(8),
    borderRadius: s(10),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E1E4',
  },
  categoryPillSelected: {
    backgroundColor: '#F3E8EE',
    borderColor: colorPalette.primary,
  },
  categoryPillText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  categoryPillTextSelected: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primary,
  },

  // ── Applied Chips Row ──
  chipsScroll: {
    marginTop: vs(10),
  },
  chipsContent: {
    gap: s(6),
  },
  chipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(10),
    paddingVertical: vs(5),
    borderRadius: s(12),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E1E4',
  },
  chipText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colorPalette.secondaryText,
  },

  // ── Section Header ──
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(18),
    marginBottom: vs(14),
  },
  sectionHeading: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colorPalette.primaryText,
  },
  clearFilterLink: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: '#C05C7E',
  },

  // ── Product Grid ──
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: vs(90),
  },
  productCardWrapper: {
    width: '48.5%',
    marginBottom: vs(12),
  },
  cardItem: {
    width: '100%',
  },

  // ── Filter Sheet ──
  filterSheetContent: {
    width: '100%',
    paddingBottom: vs(24),
  },
  filterSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  filterSheetTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: s(22),
    color: colorPalette.primaryText,
  },
  clearAllText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: '#C05C7E',
  },
  filterSection: {
    marginBottom: vs(16),
  },
  filterLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colorPalette.secondaryText,
    marginBottom: vs(8),
  },
  pillsWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(8),
  },
  squarePill: {
    width: s(40),
    height: vs(36),
    borderRadius: s(8),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E1E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squarePillSelected: {
    backgroundColor: '#F3E8EE',
    borderColor: colorPalette.primary,
  },
  squarePillText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  squarePillTextSelected: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primary,
  },

  // Price slider
  priceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(10),
  },
  priceRangeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colorPalette.primary,
  },
  priceSliderTrack: {
    height: 4,
    backgroundColor: '#E8E1E4',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  priceSliderActive: {
    position: 'absolute',
    left: '28%',
    right: 0,
    height: 4,
    backgroundColor: colorPalette.primary,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: s(16),
    height: s(16),
    borderRadius: s(8),
    backgroundColor: colorPalette.primary,
    top: -vs(6),
  },
  priceLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(8),
  },
  priceBoundText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colorPalette.secondaryText,
  },

  // Tag pills
  tagPill: {
    paddingHorizontal: s(14),
    paddingVertical: vs(8),
    borderRadius: s(8),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E1E4',
  },
  tagPillSelected: {
    backgroundColor: '#F3E8EE',
    borderColor: colorPalette.primary,
  },
  tagPillText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  tagPillTextSelected: {
    fontFamily: 'Manrope_600SemiBold',
    color: colorPalette.primary,
  },

  // Apply button
  applyBtn: {
    width: '100%',
    height: vs(48),
    borderRadius: s(10),
    backgroundColor: colorPalette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(12),
  },
  applyBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
