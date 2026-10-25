import { AntDesign, Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, Rect, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import ActionButton from '@/components/buttons/ActionButton';
import { BustFullnessStep } from '@/components/onboarding/BustFullnessStep';
import { CommunityUsernameStep } from '@/components/onboarding/CommunityUsernameStep';
import { MeasurementsStep } from '@/components/onboarding/MeasurementsStep';
import { PaddingPreferenceStep } from '@/components/onboarding/PaddingPreferenceStep';
import { PreferredCoverageStep } from '@/components/onboarding/PreferredCoverageStep';
import { PreferredSupportStep } from '@/components/onboarding/PreferredSupportStep';
import { ThemedText } from '@/components/themed-text';
import { DynamicBottomSheet } from '@/components/ui/dynamic-bottom-sheet';
import { colorPalette, Containers } from '@/constants/styles';
import { s } from '@/utils/size';
import { useState } from 'react';
import DoubbleArrowDown from '../../assets/svgs/DoubbleArrowDown';
import { ThemedView } from '../themed-view';

interface MeetFitDnaStepProps {
  onboardingData?: Record<string, any>;
  onContinue: (data?: any) => void;
  onBack?: () => void;
}

export function MeetFitDnaStep({
  onboardingData = {},
  onContinue,
  onBack,
}: MeetFitDnaStepProps) {
  const [subStep, setSubStep] = useState<
    'main' | 'fullness' | 'measurements' | 'coverage' | 'support' | 'padding' | 'username'
  >('main');
  const [showImproveModal, setShowImproveModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [fitDnaData, setFitDnaData] = useState<Record<string, any>>(onboardingData);

  const isGlassSupported =
    (Platform.OS === 'ios' || Platform.OS === 'macos') &&
    parseInt(String(Platform.Version), 10) >= 26;

  if (subStep === 'fullness') {
    return (
      <BustFullnessStep
        initialSelection={fitDnaData.bustFullness}
        onContinue={(data) => {
          setFitDnaData((prev) => ({ ...prev, ...data }));
          setSubStep('measurements');
        }}
        onBack={() => setSubStep('main')}
      />
    );
  }

  if (subStep === 'measurements') {
    return (
      <MeasurementsStep
        initialUnderbust={fitDnaData.underbust}
        initialOverbust={fitDnaData.overbust}
        onContinue={(data) => {
          setFitDnaData((prev) => ({ ...prev, ...data }));
          setSubStep('coverage');
        }}
        onBack={() => setSubStep('fullness')}
      />
    );
  }

  if (subStep === 'coverage') {
    return (
      <PreferredCoverageStep
        initialSelection={fitDnaData.preferredCoverage}
        onContinue={(data) => {
          setFitDnaData((prev) => ({ ...prev, ...data }));
          setSubStep('support');
        }}
        onBack={() => setSubStep('measurements')}
      />
    );
  }

  if (subStep === 'support') {
    return (
      <PreferredSupportStep
        initialSelection={fitDnaData.preferredSupport}
        onContinue={(data) => {
          setFitDnaData((prev) => ({ ...prev, ...data }));
          setSubStep('padding');
        }}
        onBack={() => setSubStep('coverage')}
      />
    );
  }

  if (subStep === 'padding') {
    return (
      <PaddingPreferenceStep
        initialSelection={fitDnaData.paddingPreference}
        onContinue={(data) => {
          setFitDnaData((prev) => ({ ...prev, ...data }));
          setSubStep('main');
          setShowCommunityModal(true);
        }}
        onBack={() => setSubStep('support')}
      />
    );
  }

  if (subStep === 'username') {
    return (
      <CommunityUsernameStep
        initialUsername={fitDnaData.communityUsername}
        onContinue={(data) => {
          const finalData = { ...fitDnaData, ...data };
          setFitDnaData(finalData);
          onContinue(finalData);
        }}
        onBack={() => {
          setSubStep('main');
          setShowCommunityModal(true);
        }}
      />
    );
  }

  // Derive dynamic user fit data with Figma defaults as fallback
  const region = onboardingData.region || 'UK';
  const band = onboardingData.band || '30';
  const cup = onboardingData.cup || 'F';
  const sizeString = `${region} ${band}${cup}`;

  const styleTags =
    Array.isArray(onboardingData.preferredStyles) && onboardingData.preferredStyles.length > 0
      ? onboardingData.preferredStyles
      : ['Feminine', 'Fashion-forward'];

  const lifestyleTags =
    Array.isArray(onboardingData.shoppingCategories) && onboardingData.shoppingCategories.length > 0
      ? onboardingData.shoppingCategories
      : Array.isArray(onboardingData.clothesWorkFor) && onboardingData.clothesWorkFor.length > 0
        ? onboardingData.clothesWorkFor
        : ['Gym', 'Pilates', 'Everyday'];

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
        >

          {/* ── Top Navigation Bar ── */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onBack} style={styles.backButtonWrapper} activeOpacity={0.7}>
              {isGlassSupported ? (
                <GlassView glassEffectStyle="clear" style={styles.backButtonInner}>
                  <Ionicons name="chevron-back" size={20} color={colorPalette.primaryText} />
                </GlassView>
              ) : (
                <View style={[styles.backButtonInner, { backgroundColor: '#FFFFFF' }]}>
                  <Ionicons name="chevron-back" size={20} color={colorPalette.primaryText} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* ── Circular Graphic / Badge ── */}
          <View style={styles.badgeRow}>
            <Image
              source={require('@/assets/fit_dna_badge.svg')}
              style={styles.badgeImage}
              contentFit="contain"
            />
          </View>

          {/* ── Header Titles ── */}
          <View style={styles.headerTextBlock}>
            <ThemedText type="heading2" style={styles.title}>
              Meet your Fit-DNA
            </ThemedText>
            <Text style={styles.subtitle}>You personal fit and style profile.</Text>
          </View>

          {/* ── Dark Plum Summary Card ── */}
          <View style={styles.summaryCard}>
            <View style={styles.sizeSection}>
              <Text style={styles.sizeLabel}>YOUR CURRENT SIZE</Text>
              <View style={styles.sizeValueRow}>
                <Text style={styles.sizeRegion}>{region} </Text>
                <Text style={styles.sizeCup}>
                  {band}
                  {cup}
                </Text>
              </View>
            </View>

            {/* Dashed Line */}
            <View style={styles.dashedDivider} />

            {/* Your Style row */}
            <View style={styles.tagSectionRow}>
              <Image
                source={require('@/assets/icon_your_style.svg')}
                style={styles.categoryIcon}
                contentFit="contain"
              />
              <View style={styles.tagInfoCol}>
                <Text style={styles.tagCategoryTitle}>Your style</Text>
                <View style={styles.tagPillsRow}>
                  {styleTags.map((tag: string, index: number) => (
                    <Text key={tag} style={styles.tagValueText}>
                      {tag}
                      {index < styleTags.length - 1 ? '  ' : ''}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            {/* Your Lifestyle row */}
            <View style={[styles.tagSectionRow, { marginTop: 12 }]}>
              <Image
                source={require('@/assets/icon_your_lifestyle.svg')}
                style={styles.categoryIcon}
                contentFit="contain"
              />
              <View style={styles.tagInfoCol}>
                <Text style={styles.tagCategoryTitle}>Your lifestyle</Text>
                <View style={styles.tagPillsRow}>
                  {lifestyleTags.map((tag: string, index: number) => (
                    <Text key={tag} style={styles.tagValueText}>
                      {tag}
                      {index < lifestyleTags.length - 1 ? '  ' : ''}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* ── Scroll Prompt ── */}
          <View style={styles.scrollPromptSection}>
            <Text style={styles.scrollPromptText}>Scroll to explore your result</Text>
            <View style={styles.arrowContainer}>
              <ThemedView style={styles.arrowIndicator} />
              <DoubbleArrowDown />
              <ThemedView style={styles.arrowIndicator} />
            </View>
          </View>

          {/* ── Section: What we've learned about your fit ── */}
          <View style={styles.learnedSection}>
            <Text style={styles.sectionHeading}>What we’ve learned about your fit</Text>
            <Text style={styles.sectionSubtitle}>
              Your unique preferences, challenges and styles, all in one place.
            </Text>

            <View style={styles.learnedCardsCol}>
              {/* Box 1: Support & lift */}
              <View style={styles.learnedCard}>
                <View style={styles.iconBox}>
                  <Image
                    source={require('@/assets/fit_dna_support_icon-c83319.png')}
                    style={styles.learnedIcon}
                    contentFit="contain"
                  />
                </View>
                <View style={styles.learnedCardText}>
                  <Text style={styles.learnedCardTitle}>
                    Support and lift are your priorities
                  </Text>
                  <Text style={styles.learnedCardBody}>
                    We’ll focus on bras that combine stronger support with your preferred style.
                  </Text>
                </View>
              </View>

              {/* Box 2: Strap comfort */}
              <View style={styles.learnedCard}>
                <View style={styles.iconBox}>
                  <Image
                    source={require('@/assets/icon_strap_comfort.svg')}
                    style={styles.learnedIconSvg}
                    contentFit="contain"
                  />
                </View>
                <View style={styles.learnedCardText}>
                  <Text style={styles.learnedCardTitle}>Strap comfort matters to you</Text>
                  <Text style={styles.learnedCardBody}>
                    We'll highlight reviews from women with similar fit concerns.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── Section: There's more waiting for you ── */}
          <View style={styles.moreSection}>
            <Text style={styles.sectionHeading}>There's more waiting for you</Text>

            <View style={styles.featuresRowContainer}>
              {/* Feature 1 */}
              <View style={styles.featureCol}>
                <Image
                  source={require('@/assets/icon_recommendations.svg')}
                  style={styles.featureIcon}
                  contentFit="contain"
                />
                <ThemedText type='caption' style={styles.featureTitle}>Recommendations</ThemedText>
                <Text style={styles.featureBody}>Products tailored to your fit and style</Text>
              </View>

              <View style={styles.featureDivider} />

              {/* Feature 2 */}
              <View style={styles.featureCol}>
                <Image
                  source={require('@/assets/icon_fit_advice.svg')}
                  style={styles.featureIcon}
                  contentFit="contain"
                />
                <ThemedText type='caption' style={styles.featureTitle}>Your fit advice</ThemedText>
                <Text style={styles.featureBody}>Guidance based on your fit concerns</Text>
              </View>

              <View style={styles.featureDivider} />

              {/* Feature 3 */}
              <View style={styles.featureCol}>
                <Image
                  source={require('@/assets/icon_women_like_you.svg')}
                  style={styles.featureIcon}
                  contentFit="contain"
                />
                <ThemedText type='caption' style={styles.featureTitle}>Women like you</ThemedText>
                <Text style={styles.featureBody}>Relevant review and real experiences.</Text>
              </View>
            </View>
          </View>

          {/* ── Gradient Banner Card: Matches ready ── */}
          <View style={styles.gradientCardWrapper}>
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
              <Defs>
                <SvgLinearGradient id="matchesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="22%" stopColor="#221A4D" />
                  <Stop offset="88%" stopColor="#63325B" />
                </SvgLinearGradient>
              </Defs>
              <Rect width="100%" height="100%" rx={12} fill="url(#matchesGrad)" />
            </Svg>

            <View style={styles.gradientCardContent}>
              {/* Badge */}
              <View style={styles.matchBadge}>
                <AntDesign name="check-circle" size={s(16)} color={colorPalette.success} />
                <Text style={styles.matchBadgeText}>Your first matches are ready</Text>
              </View>

              <View style={styles.gradientRow}>
                <View style={styles.gradientTextCol}>
                  <ThemedText style={styles.gradientHeading}>
                    We've found 3+ bras matched to your Fit-DNA!
                  </ThemedText>
                  <Text style={styles.gradientSub}>
                    Selected around your size, fit concerns, style and preferences.
                  </Text>
                </View>

                <Image
                  source={require('@/assets/fit_dna_matches_bra.png')}
                  style={styles.gradientBraImage}
                  contentFit="contain"
                />
              </View>
            </View>
          </View>

          {/* ── Bottom Action Button ── */}
          <View style={styles.bottomCtaBlock}>
            <ActionButton
              btnText="See my matches"
              rightIcon={
                <Image
                  source={require('@/assets/arrow_down.svg')}
                  style={styles.arrowDownIcon}
                  contentFit="contain"
                />
              }
              onPress={() => setShowImproveModal(true)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* ── Improve Fit-DNA Bottom Sheet Modal ── */}
      <DynamicBottomSheet
        visible={showImproveModal}
        setVisible={setShowImproveModal}
        backgroundStyle={{ backgroundColor: colorPalette.background }}
        icon={
          <Image
            source={require('@/assets/images/arrow.png')}
            style={styles.modalIcon}
            contentFit="contain"
          />
        }
        title="Want even more personalised recommendations?"
        description="Add a few more details to make your Fit-DNA even more accurate."
        primaryButton={{
          text: 'Improve my Fit-DNA',
          onPress: () => {
            setShowImproveModal(false);
            setSubStep('fullness');
          },
        }}
        secondaryButton={{
          text: "I'll do this later",
          onPress: () => {
            setShowImproveModal(false);
            setShowCommunityModal(true);
          },
          bgColor: 'transparent',
          textColor: colorPalette.primary,
          borderColor: 'transparent',
          borderWidth: 0,
        }}
      />

      {/* ── Join the Community Bottom Sheet Modal ── */}
      <DynamicBottomSheet
        visible={showCommunityModal}
        setVisible={setShowCommunityModal}
        backgroundStyle={{ backgroundColor: colorPalette.background }}
        icon={
          <Image
            source={require('@/assets/images/arrow.png')}
            style={styles.modalIcon}
            contentFit="contain"
          />
        }
        title="Join the Community"
        description="Ask questions. Share your experience. Find women who get it."
        primaryButton={{
          text: 'Join Community',
          onPress: () => {
            setShowCommunityModal(false);
            setSubStep('username');
          },
        }}
        secondaryButton={{
          text: "I'll do this later",
          onPress: () => {
            setShowCommunityModal(false);
            onContinue(fitDnaData);
          },
          bgColor: 'transparent',
          textColor: colorPalette.primary,
          borderColor: 'transparent',
          borderWidth: 0,
        }}
      />
    </ThemedView>
  );
}

// ─── Styles matching Figma node 158:1030 ─────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
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
    paddingBottom: s(40),
    gap: 20,
  },

  // Badge
  badgeRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  badgeImage: {
    width: s(100),
    height: s(100),
  },

  // Titles
  headerTextBlock: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    textAlign: 'center',
    color: colorPalette.primaryText,
    lineHeight: 36,
  },
  subtitle: {
    color: colorPalette.secondaryText,
    textAlign: 'center',
  },

  // Summary Card (Plum)
  summaryCard: {
    backgroundColor: '#6D3B5E',
    borderRadius: 12,
    padding: 20,
    marginTop: 6,
  },
  sizeSection: {
    alignItems: 'center',
    gap: 4,
  },
  sizeLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    letterSpacing: 0.8,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  sizeValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sizeRegion: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  sizeCup: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderColor: '#D2D2D2',
    borderStyle: 'dashed',
    marginVertical: 16,
  },
  tagSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  tagInfoCol: {
    flex: 1,
    gap: 2,
  },
  tagCategoryTitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: 'rgba(251, 248, 244, 0.65)',
  },
  tagPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagValueText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },

  // Scroll prompt
  scrollPromptSection: {
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  scrollPromptText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.secondaryText,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  arrowIndicator: {
    width: '40%',
    height: 1,
    backgroundColor: colorPalette.border,
  },

  // Learned Section
  learnedSection: {
    marginTop: 10,
    gap: 6,
  },
  sectionHeading: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colorPalette.primaryText,
  },
  sectionSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.secondaryText,
    lineHeight: 20,
    marginBottom: 8,
  },
  learnedCardsCol: {
    gap: 12,
  },
  learnedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 9.2,
    backgroundColor: '#FBE3EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnedIcon: {
    width: 33,
    height: 24,
  },
  learnedIconSvg: {
    width: s(24),
    height: s(24),
  },
  learnedCardText: {
    flex: 1,
    gap: 4,
  },
  learnedCardTitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: colorPalette.primaryText,
    fontWeight: '600',
  },
  learnedCardBody: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colorPalette.secondaryText,
    lineHeight: 18,
  },

  // More Section
  moreSection: {
    marginTop: 10,
    gap: 12,
  },
  featuresRowContainer: {
    backgroundColor: '#F7F2FC',
    borderRadius: s(12),
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  featureCol: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 6,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  featureTitle: {
    color: colorPalette.primaryText,
  },
  featureBody: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 10,
    color: colorPalette.secondaryText,
    lineHeight: 14,
  },
  featureDivider: {
    width: 1,
    height: 64,
    backgroundColor: '#E8E1E4',
    marginHorizontal: 8,
    alignSelf: 'center',
  },

  // Gradient Banner
  gradientCardWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    minHeight: 170,
  },
  gradientCardContent: {
    padding: 20,
    gap: 12,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: `${colorPalette.success}66`,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 33,
    gap: 6,
  },
  matchBadgeIcon: {
    width: 16,
    height: 16,
  },
  matchBadgeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: colorPalette.success,
  },
  gradientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradientTextCol: {
    flex: 1,
    paddingRight: 8,
    gap: 6,
  },
  gradientHeading: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 25,
  },
  gradientSub: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  gradientBraImage: {
    width: 130,
    height: 110,
  },

  // Bottom CTA
  bottomCtaBlock: {
    marginTop: 10,
    paddingBottom: 20,
  },
  arrowDownIcon: {
    width: 20,
    height: 20,
  },
  modalIcon: {
    width: s(80),
    height: s(80),
  },
});
