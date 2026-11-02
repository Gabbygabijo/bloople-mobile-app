import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import DynamicViewLayout from '@/components/layouts/DynamicViewLayout';
import { ThemedView } from '@/components/themed-view';
import DynamicBottomSheet from '@/components/ui/dynamic-bottom-sheet';
import { colorPalette, isGlassSupported } from '@/constants/styles';
import { s, vs } from '@/utils/size';
import LoveIcon from '../../assets/svgs/LoveIcon';

// ── Image Gallery Assets ──
const PRODUCT_IMAGES = [
  require('@/assets/images/products/Full-Coverage-T-Shirt-Bra.png'),
  require('@/assets/images/products/white_tshirt_bra.jpg'),
  require('@/assets/images/products/nude_plunge_bra.jpg'),
  require('@/assets/images/products/burgundy_lace_bra.jpg'),
];

// ── Match Points ──
const FIT_DNA_MATCHES = [
  'Available in your size',
  'Popular with women with a similar fit profile',
  'Strong support',
  'Matches your preference for lift',
  'Some women with similar fit profiles found the straps firm.',
];

// ── Available Colors ──
const AVAILABLE_COLORS = [
  { name: 'Dusty Rose', color: '#A03048' },
  { name: 'Black', color: '#1B1B1B' },
  { name: 'Nude', color: '#7E7672' },
  { name: 'White', color: '#FFFFFF', border: true },
];

// ── Fit Information ──
const FIT_INFORMATION = [
  { label: 'Support', value: 'Strong support' },
  { label: 'Coverage', value: 'Medium coverage' },
  { label: 'Underwire', value: 'Yes' },
  { label: 'Padding', value: 'Lightly padded' },
  { label: 'Material', value: 'Smooth microfibre' },
];

// ── Criteria Ratings ──
const CRITERIA_RATINGS = [
  { label: 'Support', score: 3.2, stars: 4 },
  { label: 'Comfort', score: 3.2, stars: 3 },
  { label: 'Lift', score: 3.2, stars: 2 },
  { label: 'Appearance', score: 3.2, stars: 4 },
  { label: 'Quality', score: 3.2, stars: 3 },
];

// ── Community Reviews ──
const REVIEWS = [
  {
    id: 'r1',
    user: '@ada_',
    meta: '30FF · Fuller on top',
    quote: '"Really good lift and doesn\'t dig into my shoulders."',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'r2',
    user: '@ada_',
    meta: '30FF · Fuller on top',
    quote: '"Really good lift and doesn\'t dig into my shoulders."',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'r3',
    user: '@ada_',
    meta: '30FF · Fuller on top',
    quote: '"Really good lift and doesn\'t dig into my shoulders."',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
  },
];

// ── Bottom Sheet Options ──
const REASONS_LIST = [
  'Too tight',
  'Too loose',
  'Cups too small',
  'Cups too large',
  'Uncomfortable',
  'Poor support',
  "Didn't suit my shape",
  "Didn't like the appearance",
  'Other',
];

const ItemView = () => {
  const { id } = useLocalSearchParams();

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Dusty Rose');
  const [isFavorited, setIsFavorited] = useState(false);

  // Bottom sheet flow state: null | 'more' | 'feedback' | 'success'
  const [activeSheet, setActiveSheet] = useState<'more' | 'feedback' | 'success' | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>(['Cups too small']);

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]
    );
  };

  const handleOpenMore = () => {
    setActiveSheet('more');
  };

  const handleCloseSheet = () => {
    setActiveSheet(null);
  };

  return (
    <>
      <DynamicViewLayout
        rightHandler={
          <TouchableOpacity
            style={styles.topRightWrapper}
            activeOpacity={0.7}
            onPress={() => setIsFavorited((prev) => !prev)}
          >
            {isGlassSupported ? (
              <GlassView glassEffectStyle="clear" style={styles.topRightInner}>
                <LoveIcon fill={isFavorited ? colorPalette.primary : 'none'} />
              </GlassView>
            ) : (
              <View style={[styles.topRightInner, { backgroundColor: '#FFFFFF' }]}>
                <LoveIcon fill={isFavorited ? colorPalette.primary : 'none'} />
              </View>
            )}
          </TouchableOpacity>
        }
        footer={
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.shopButton}
              activeOpacity={0.85}
              onPress={() => { }}
            >
              <Text style={styles.shopButtonText}>Shop at Curvy Kate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.moreButton}
              activeOpacity={0.75}
              onPress={handleOpenMore}
            >
              <Ionicons name="ellipsis-horizontal" size={16} color={colorPalette.primary} />
              <Text style={styles.moreButtonText}>More</Text>
            </TouchableOpacity>
          </View>
        }
      >
        <ThemedView style={styles.container}>
          {/* ── 1. Image Gallery (Hero + 4 Vertical Thumbnails) ── */}
          <View style={styles.galleryRow}>
            <View style={styles.mainImageCard}>
              <Image
                source={PRODUCT_IMAGES[selectedImageIndex]}
                style={styles.mainImage}
                contentFit="contain"
              />
            </View>

            <View style={styles.thumbnailsColumn}>
              {PRODUCT_IMAGES.map((img, idx) => {
                const isSelected = selectedImageIndex === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.thumbnailCard,
                      isSelected && styles.thumbnailCardActive,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => setSelectedImageIndex(idx)}
                  >
                    <Image source={img} style={styles.thumbnailImage} contentFit="contain" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ── 2. Product Header ── */}
          <View style={styles.headerSection}>
            <View style={styles.brandRow}>
              <Text style={styles.brandText}>Curvy Kate</Text>
              <View style={styles.availabilityBadge}>
                <Ionicons name="checkmark-circle-outline" size={14} color="#3E8067" />
                <Text style={styles.availabilityText}>Available in your size</Text>
              </View>
            </View>

            <Text style={styles.titleText}>Full Coverage T-Shirt Bra</Text>

            <View style={styles.ratingAndPriceRow}>
              <View style={styles.ratingRow}>
                <Ionicons name="star-outline" size={15} color={colorPalette.primaryText} />
                <Text style={styles.ratingText}>4.6 (124 reviews)</Text>
              </View>
              <Text style={styles.priceText}>£38</Text>
            </View>
          </View>

          {/* ── 3. Fit-DNA Match Card ── */}
          <View style={styles.matchCard}>
            <Text style={styles.matchTitle}>94% Match for your Fit-DNA</Text>
            <View style={styles.matchList}>
              {FIT_DNA_MATCHES.map((item, idx) => (
                <View key={idx} style={styles.matchItem}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={17}
                    color="#6D3B5E"
                    style={styles.matchIcon}
                  />
                  <Text style={styles.matchText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── 4. Available Colors ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Colors</Text>
            <View style={styles.colorsRow}>
              {AVAILABLE_COLORS.map((col) => {
                const isSelected = selectedColor === col.name;
                return (
                  <TouchableOpacity
                    key={col.name}
                    style={styles.colorItem}
                    activeOpacity={0.75}
                    onPress={() => setSelectedColor(col.name)}
                  >
                    <View
                      style={[
                        styles.colorDot,
                        { backgroundColor: col.color },
                        col.border && styles.colorDotBorder,
                      ]}
                    />
                    <Text
                      style={[
                        styles.colorName,
                        isSelected && styles.colorNameSelected,
                      ]}
                    >
                      {col.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.divider} />

          {/* ── 5. Size Range ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size Range</Text>
            <View style={styles.pillsRow}>
              <View style={styles.rangePill}>
                <Text style={styles.rangePillText}>28DD-40GG</Text>
              </View>
              <View style={styles.sizePill}>
                <Text style={styles.sizePillText}>UK 30F (Your size is available)</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ── 6. Fit Information Table ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fit Information</Text>
            <View style={styles.fitTableCard}>
              {FIT_INFORMATION.map((row, idx) => {
                const isLast = idx === FIT_INFORMATION.length - 1;
                return (
                  <View
                    key={row.label}
                    style={[styles.fitTableRow, !isLast && styles.fitTableRowBorder]}
                  >
                    <Text style={styles.fitTableLabel}>{row.label}</Text>
                    <Text style={styles.fitTableValue}>{row.value}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.divider} />

          {/* ── 7. Reviews from women like you ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews from women like you</Text>

            {/* Criteria breakdown */}
            <View style={styles.criteriaContainer}>
              {CRITERIA_RATINGS.map((item) => (
                <View key={item.label} style={styles.criteriaRow}>
                  <Text style={styles.criteriaLabel}>{item.label}</Text>
                  <View style={styles.dashedLine} />
                  <View style={styles.starsWrapper}>
                    {[1, 2, 3, 4, 5].map((starIdx) => (
                      <Ionicons
                        key={starIdx}
                        name={starIdx <= item.stars ? 'star' : 'star-outline'}
                        size={13}
                        color={colorPalette.primary}
                        style={{ marginHorizontal: 1 }}
                      />
                    ))}
                    <Text style={styles.criteriaScore}>{item.score}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Review Cards */}
            <View style={styles.reviewsList}>
              {REVIEWS.map((rev) => (
                <View key={rev.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Image source={{ uri: rev.avatarUrl }} style={styles.reviewAvatar} />
                    <View style={styles.reviewUserCol}>
                      <Text style={styles.reviewUsername}>{rev.user}</Text>
                      <Text style={styles.reviewMeta}>{rev.meta}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewQuote}>{rev.quote}</Text>
                </View>
              ))}
            </View>
          </View>
        </ThemedView>
      </DynamicViewLayout>

      {/* ── 8. Bottom Sheet Modal (Consolidated More Actions Flow) ── */}
      <DynamicBottomSheet
        visible={activeSheet !== null}
        onClose={handleCloseSheet}
        scrollable={activeSheet === 'feedback'}
        snapPoints={activeSheet === 'feedback' ? ['82%'] : undefined}
        enableDynamicSizing={activeSheet !== 'feedback'}
        showHandle
        icon={
          activeSheet === 'success' && <Image
            source={require('@/assets/images/arrow.png')}
            style={{ width: s(80), height: s(80), }}
            contentFit="contain"
          />
        }
        title={
          activeSheet === 'feedback' ? 'What didn’t work?' : activeSheet === 'success' ? 'Thanks for the feedback!' : null
        }
      >
        {activeSheet === 'more' && (
          <View style={styles.sheetContent}>
            <Text style={styles.sheetHeaderLabel}>More Actions</Text>

            <TouchableOpacity style={styles.actionOptionBtn} activeOpacity={0.7} onPress={handleCloseSheet}>
              <Text style={styles.actionOptionText}>Move to Want</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionOptionBtn} activeOpacity={0.7} onPress={handleCloseSheet}>
              <Text style={styles.actionOptionText}>Move to Own</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionOptionBtn} activeOpacity={0.7} onPress={handleCloseSheet}>
              <Text style={styles.actionOptionText}>Move to Love</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionOptionBtn}
              activeOpacity={0.7}
              onPress={() => setActiveSheet('feedback')}
            >
              <Text style={styles.actionOptionText}>Didn't work</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.solidPlumBtn}
              activeOpacity={0.85}
              onPress={handleCloseSheet}
            >
              <Text style={styles.solidPlumBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeSheet === 'feedback' && (
          <View style={styles.sheetContent}>
            <Text style={styles.feedbackSubtitle}>
              Tell us what went wrong so we can make better recommendations for you.
            </Text>

            <Text style={styles.selectLabel}>Select all that apply.</Text>

            <View style={styles.reasonsList}>
              {REASONS_LIST.map((reason) => {
                const isSelected = selectedReasons.includes(reason);
                return (
                  <TouchableOpacity
                    key={reason}
                    style={[
                      styles.reasonCard,
                      isSelected && styles.reasonCardSelected,
                    ]}
                    activeOpacity={0.75}
                    onPress={() => toggleReason(reason)}
                  >
                    <Text
                      style={[
                        styles.reasonText,
                        isSelected && styles.reasonTextSelected,
                      ]}
                    >
                      {reason}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.solidPlumBtn}
              activeOpacity={0.85}
              onPress={() => setActiveSheet('success')}
            >
              <Text style={styles.solidPlumBtnText}>Submit Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelLink}
              activeOpacity={0.7}
              onPress={handleCloseSheet}
            >
              <Text style={styles.cancelLinkText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeSheet === 'success' && (
          <View style={[styles.sheetContent, { alignItems: 'center', paddingVertical: vs(12) }]}>
            <Text style={[styles.feedbackSubtitle, { marginBottom: vs(24) }]}>
              We'll use this to improve your recommendations
            </Text>

            <TouchableOpacity
              style={[styles.solidPlumBtn, { width: '100%' }]}
              activeOpacity={0.85}
              onPress={handleCloseSheet}
            >
              <Text style={styles.solidPlumBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      </DynamicBottomSheet>
    </>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  container: {
    paddingBottom: vs(20),
    backgroundColor: 'transparent',
  },
  topRightWrapper: {
    zIndex: 10,
  },
  topRightInner: {
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

  // ── Gallery ──
  galleryRow: {
    flexDirection: 'row',
    gap: s(12),
    marginTop: vs(8),
  },
  mainImageCard: {
    flex: 1,
    height: vs(280),
    backgroundColor: '#FFFFFF',
    borderRadius: s(18),
    borderWidth: 1,
    borderColor: '#F0E8ED',
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(16),
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailsColumn: {
    width: s(64),
    justifyContent: 'space-between',
    gap: vs(8),
  },
  thumbnailCard: {
    width: s(64),
    height: vs(64),
    backgroundColor: '#FFFFFF',
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#EFE8ED',
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(4),
  },
  thumbnailCardActive: {
    borderWidth: 1.5,
    borderColor: colorPalette.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },

  // ── Product Header ──
  headerSection: {
    marginTop: vs(16),
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colorPalette.secondaryText,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  availabilityText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#3E8067',
  },
  titleText: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: s(24),
    lineHeight: s(30),
    color: colorPalette.primaryText,
    marginTop: vs(4),
  },
  ratingAndPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(4),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colorPalette.secondaryText,
  },
  priceText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: s(22),
    color: colorPalette.primaryText,
  },

  // ── Fit-DNA Match Card ──
  matchCard: {
    backgroundColor: '#F6EDF2',
    borderRadius: s(16),
    padding: s(16),
    marginTop: vs(16),
  },
  matchTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: colorPalette.primary,
    marginBottom: vs(12),
  },
  matchList: {
    gap: vs(10),
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: s(8),
  },
  matchIcon: {
    marginTop: 1,
  },
  matchText: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: colorPalette.primaryText,
  },

  // ── Common Sections ──
  section: {
    marginTop: vs(18),
  },
  sectionTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colorPalette.primaryText,
    marginBottom: vs(12),
  },
  divider: {
    height: 1,
    backgroundColor: '#EFE7EC',
    marginTop: vs(20),
  },

  // ── Colors ──
  colorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
    flexWrap: 'wrap',
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
  },
  colorDot: {
    width: s(14),
    height: s(14),
    borderRadius: s(7),
  },
  colorDotBorder: {
    borderWidth: 1,
    borderColor: '#D1C9CD',
  },
  colorName: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  colorNameSelected: {
    fontFamily: 'Manrope_600SemiBold',
  },

  // ── Size Range ──
  pillsRow: {
    flexDirection: 'row',
    gap: s(8),
    flexWrap: 'wrap',
  },
  rangePill: {
    backgroundColor: '#F3E8EE',
    paddingHorizontal: s(12),
    paddingVertical: vs(7),
    borderRadius: s(14),
  },
  rangePillText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: colorPalette.primary,
  },
  sizePill: {
    backgroundColor: '#E7F2EB',
    paddingHorizontal: s(12),
    paddingVertical: vs(7),
    borderRadius: s(14),
  },
  sizePillText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#3E8067',
  },

  // ── Fit Table ──
  fitTableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(14),
    paddingHorizontal: s(16),
  },
  fitTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(12),
  },
  fitTableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F6F0F4',
  },
  fitTableLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colorPalette.secondaryText,
  },
  fitTableValue: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colorPalette.primaryText,
  },

  // ── Reviews & Breakdown ──
  criteriaContainer: {
    marginBottom: vs(18),
    gap: vs(10),
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  criteriaLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colorPalette.primaryText,
    minWidth: s(80),
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderColor: '#ECE3E8',
    borderStyle: 'dashed',
    marginHorizontal: s(8),
  },
  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  criteriaScore: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: colorPalette.secondaryText,
    marginLeft: s(6),
  },
  reviewsList: {
    gap: vs(10),
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(14),
    padding: s(14),
    borderWidth: 1,
    borderColor: '#F3ECF0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAvatar: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    backgroundColor: '#EAE0E6',
  },
  reviewUserCol: {
    flex: 1,
    marginLeft: s(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewUsername: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colorPalette.primaryText,
  },
  reviewMeta: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colorPalette.secondaryText,
  },
  reviewQuote: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: colorPalette.primaryText,
    marginTop: vs(8),
  },

  // ── Footer Sticky Bar ──
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: s(16),
    paddingTop: vs(12),
    paddingBottom: Platform.OS === 'ios' ? vs(14) : vs(12),
    backgroundColor: '#FBF8F4',
    borderTopWidth: 1,
    borderTopColor: '#EFE7EC',
    gap: s(10),
  },
  shopButton: {
    flex: 1,
    height: vs(50),
    backgroundColor: colorPalette.primary,
    borderRadius: s(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  moreButton: {
    width: s(72),
    height: vs(50),
    borderRadius: s(10),
    borderWidth: 1,
    borderColor: '#8A5877',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  moreButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: colorPalette.primary,
  },

  // ── Bottom Sheet Inner Styles ──
  sheetContent: {
    width: '100%',
    paddingBottom: vs(8),
  },
  sheetHeaderLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colorPalette.secondaryText,
    marginBottom: vs(14),
  },
  actionOptionBtn: {
    width: '100%',
    height: vs(48),
    borderRadius: s(10),
    borderWidth: 1,
    borderColor: '#E8E1E4',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: s(16),
    marginBottom: vs(10),
  },
  actionOptionText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  solidPlumBtn: {
    width: '100%',
    height: vs(48),
    borderRadius: s(10),
    backgroundColor: colorPalette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(6),
  },
  solidPlumBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },

  // ── Feedback Sheet ──
  feedbackSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: colorPalette.secondaryText,
    textAlign: 'center',
    marginTop: vs(4),
    marginBottom: vs(16),
    paddingHorizontal: s(12),
  },
  selectLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.primaryText,
    marginBottom: vs(10),
  },
  reasonsList: {
    gap: vs(8),
    marginBottom: vs(14),
  },
  reasonCard: {
    width: '100%',
    height: vs(46),
    borderRadius: s(10),
    borderWidth: 1,
    borderColor: '#E8E1E4',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: s(16),
  },
  reasonCardSelected: {
    backgroundColor: '#F3E8EE',
    borderColor: colorPalette.primary,
  },
  reasonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  reasonTextSelected: {
    color: colorPalette.primary,
  },
  cancelLink: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(10),
  },
  cancelLinkText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colorPalette.secondaryText,
  },

});
