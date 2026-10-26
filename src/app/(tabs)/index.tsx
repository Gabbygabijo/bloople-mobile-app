import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, Rect, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import { ProductCard, type ProductItem } from '@/components/cards/ProductCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colorPalette } from '@/constants/styles';
import { useBloopleApi } from '@/state/BloopleApiContext';
import { s, vs } from '@/utils/size';

const FOR_YOU_PRODUCTS: ProductItem[] = [
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
    title: 'High Support Sports',
    price: '£42',
    matchScore: '89% match',
    image: require('@/assets/images/products/nude_plunge_bra.jpg'),
  },
];

const NEW_FOR_YOU_PRODUCTS: ProductItem[] = [
  {
    id: '4',
    brand: 'Freya',
    title: 'Plunge Swim Top',
    price: '£45',
    matchScore: '94% match',
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

const UPDATES = [
  {
    id: 'u1',
    title: 'New stock alert',
    subtitle: 'Dove Comfort bra is now available',
    time: 'Sep 12, 12:30PM',
  },
  {
    id: 'u2',
    title: 'New stock alert',
    subtitle: 'Dove Comfort bra is now available',
    time: 'Sep 12, 12:30PM',
  },
  {
    id: 'u3',
    title: 'New stock alert',
    subtitle: 'Dove Comfort bra is now available',
    time: 'Sep 12, 12:30PM',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { account, profile } = useBloopleApi();

  const answers = profile?.answers ?? {};
  const derived = profile?.derived;
  const name =
    (typeof answers.firstName === 'string' && answers.firstName.trim()) ||
    account?.firstName ||
    'Grace';

  const sizeLabel =
    derived?.sizeLabel ||
    (answers.band && answers.cup
      ? `${answers.system || 'UK'} ${answers.band}${answers.cup}`
      : 'UK 30D');

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* ── Top Header Bar ── */}


        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
        >
          <ThemedView>
            <View style={styles.headerBar}>
              <View style={styles.welcomeRow}>
                <ThemedText style={styles.welcomePrefix}>Welcome back, </ThemedText>
                <ThemedText style={styles.welcomeName}>{name}</ThemedText>
              </View>

              <TouchableOpacity
                style={styles.sizePill}
                activeOpacity={0.7}
                onPress={() => router.push('/(tabs)/profile')}
              >
                <ThemedText type="caption" style={styles.sizePillText}>{sizeLabel}</ThemedText>
              </TouchableOpacity>
            </View>

            {/* Faint Divider */}
            <View style={styles.headerDivider} />
          </ThemedView>
          {/* ── 1. For You Section ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="heading4" style={styles.sectionTitle}>For You</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.sectionSubtitle}>
                Matched to your Fit-DNA
              </ThemedText>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContent}
            >
              {FOR_YOU_PRODUCTS.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </ScrollView>
          </View>

          {/* ── 2. Women Like You Banner Card ── */}
          <View style={styles.bannerWrapper}>
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
              <Defs>
                <SvgLinearGradient id="womenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#7E3765" />
                  <Stop offset="55%" stopColor="#A85F7D" />
                  <Stop offset="100%" stopColor="#FFD4D4" />
                </SvgLinearGradient>
              </Defs>
              <Rect width="100%" height="100%" rx={14} fill="url(#womenGrad)" />
            </Svg>

            <View style={styles.bannerContent}>
              <ThemedText type="heading3" style={styles.bannerTitle}>Women Like You</ThemedText>
              <ThemedText type="caption" style={styles.bannerBody}>
                87 women with a similar fit profile recommend the Curvy Kate Full Coverage T-Shirt Bra.
              </ThemedText>
            </View>
          </View>

          {/* ── 3. New For You Section ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="heading4" style={styles.sectionTitle}>New For You</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.sectionSubtitle}>
                Just landed in your size
              </ThemedText>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContent}
            >
              {NEW_FOR_YOU_PRODUCTS.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </ScrollView>
          </View>

          {/* ── 4. Trending Section ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="heading4" style={styles.sectionTitle}>Trending</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.sectionSubtitle}>
                Trending with women who have a similar fit profile.
              </ThemedText>
            </View>

            <TouchableOpacity style={styles.trendingCard} activeOpacity={0.7}>
              <View style={styles.trendingThumbnail}>
                <Image
                  source={require('@/assets/images/products/nude_plunge_bra.jpg')}
                  style={styles.trendingThumbImage}
                  contentFit="cover"
                />
              </View>

              <View style={styles.trendingInfo}>
                <ThemedText type="heading4" style={styles.trendingTitle}>Swimwear styles women</ThemedText>
                <ThemedText type="caption" themeColor="textSecondary" style={styles.trendingSubtitle}>
                  High support, flattering fits, and real reviews.
                </ThemedText>

                {/* Overlapping Avatars */}
                <View style={styles.avatarRow}>
                  <View style={[styles.avatarCircle, { backgroundColor: '#5A3D54' }]}>
                    <ThemedText style={styles.avatarInitial}>S</ThemedText>
                  </View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#8E4A6F', marginLeft: -8 }]}>
                    <ThemedText style={styles.avatarInitial}>M</ThemedText>
                  </View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#B87295', marginLeft: -8 }]}>
                    <ThemedText style={styles.avatarInitial}>A</ThemedText>
                  </View>
                  <ThemedText type="caption" themeColor="textSecondary" style={styles.avatarMoreText}>24+</ThemedText>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={s(20)} color={colorPalette.primary} />
            </TouchableOpacity>
          </View>

          {/* ── 5. Updates Section ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="heading4" style={styles.sectionTitle}>Updates</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.sectionSubtitle}>
                Important updates, just for you.
              </ThemedText>
            </View>

            <View style={styles.updatesList}>
              {UPDATES.map((update) => (
                <View key={update.id} style={styles.updateCard}>
                  <View style={styles.updateIconBox}>
                    <MaterialIcons name="production-quantity-limits" size={16} color="#944874" />
                  </View>

                  <View style={styles.updateTextCol}>
                    <ThemedText type="smallBold" style={styles.updateTitle}>{update.title}</ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary" style={styles.updateSubtitle}>
                      {update.subtitle}
                    </ThemedText>
                  </View>

                  <ThemedText type="caption" themeColor="textSecondary" style={styles.updateTime}>
                    {update.time}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colorPalette.background,
  },
  safeArea: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(15),
    paddingTop: vs(4),
    paddingBottom: vs(8),
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  welcomePrefix: {
    fontFamily: 'CormorantGaramond_400Regular',
    fontSize: 16,
    color: colorPalette.primaryText,
  },
  welcomeName: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 16,
    color: colorPalette.primaryText,
  },
  sizePill: {
    backgroundColor: colorPalette.surface,
    borderWidth: 1,
    borderColor: colorPalette.border,
    borderRadius: s(8),
    paddingHorizontal: s(12),
    paddingVertical: vs(5),
  },
  sizePillText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12.5,
    color: colorPalette.primaryText,
  },
  headerDivider: {
    height: 1,
    backgroundColor: colorPalette.border,
    marginHorizontal: s(15),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: vs(16),
    paddingBottom: vs(40),
    gap: vs(24),
  },
  section: {
    gap: vs(10),
  },
  sectionHeader: {
    paddingHorizontal: s(15),
    gap: 2,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 17,
    color: colorPalette.primaryText,
  },
  sectionSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12.5,
    color: colorPalette.secondaryText,
  },
  carouselContent: {
    paddingHorizontal: s(15),
    gap: s(14),
  },
  // Banner
  bannerWrapper: {
    marginHorizontal: s(15),
    borderRadius: s(14),
    overflow: 'hidden',
    minHeight: vs(84),
  },
  bannerContent: {
    paddingHorizontal: s(18),
    paddingVertical: vs(14),
    gap: vs(4),
  },
  bannerTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 18,
    color: colorPalette.surface,
  },
  bannerBody: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    lineHeight: 17,
    color: 'rgba(255, 255, 255, 0.92)',
  },

  // Trending Card
  trendingCard: {
    marginHorizontal: s(15),
    backgroundColor: colorPalette.surface,
    borderRadius: s(14),
    borderWidth: 1,
    borderColor: colorPalette.border,
    padding: s(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
  },
  trendingThumbnail: {
    width: s(62),
    height: s(62),
    borderRadius: s(10),
    backgroundColor: colorPalette.primary + '1a',
    overflow: 'hidden',
  },
  trendingThumbImage: {
    width: '100%',
    height: '100%',
  },
  trendingInfo: {
    flex: 1,
    gap: vs(3),
  },
  trendingTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 15,
    color: colorPalette.primaryText,
  },
  trendingSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11.5,
    color: colorPalette.secondaryText,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(4),
  },
  avatarCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colorPalette.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 8.5,
    color: colorPalette.surface,
  },
  avatarMoreText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 10.5,
    color: colorPalette.secondaryText,
    marginLeft: s(6),
  },

  // Updates
  updatesList: {
    paddingHorizontal: s(15),
    gap: vs(8),
  },
  updateCard: {
    backgroundColor: colorPalette.surface,
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: colorPalette.border,
    paddingVertical: vs(12),
    paddingHorizontal: s(14),
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
  },
  updateIconBox: {
    width: s(36),
    height: s(36),
    borderRadius: s(8),
    backgroundColor: colorPalette.secondary + '1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateTextCol: {
    flex: 1,
    gap: 2,
  },
  updateTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  updateSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11.5,
    color: colorPalette.secondaryText,
  },
  updateTime: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 10.5,
    color: colorPalette.secondaryText,
  },
});
