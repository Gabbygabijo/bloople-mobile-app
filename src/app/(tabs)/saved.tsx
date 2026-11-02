import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ProductCard, type ProductItem } from '@/components/cards/ProductCard';
import PlainLayout from '@/components/layouts/PlainLayout';
import { colorPalette, Containers } from '@/constants/styles';
import { s, vs } from '@/utils/size';

type SavedTabType = 'Want' | 'Own' | 'Love' | "Didn't work";

const TABS: SavedTabType[] = ['Want', 'Own', 'Love', "Didn't work"];

interface SavedProductItem extends ProductItem {
  feedbackReason?: string;
}

const SAVED_DATA: Record<SavedTabType, SavedProductItem[]> = {
  Want: [
    {
      id: 's1',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£38',
      matchScore: '94% match',
      image: require('@/assets/images/products/burgundy_lace_bra.jpg'),
    },
    {
      id: 's2',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£38',
      matchScore: '94% match',
      image: require('@/assets/images/products/Full-Coverage-T-Shirt-Bra.png'),
    },
    {
      id: 's3',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£38',
      matchScore: '94% match',
      image: require('@/assets/images/products/burgundy_lace_bra.jpg'),
    },
  ],
  Own: [
    {
      id: 's4',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£54',
      matchScore: 'Owned',
      image: require('@/assets/images/products/burgundy_lace_bra.jpg'),
    },
    {
      id: 's5',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£65',
      matchScore: 'Owned',
      image: require('@/assets/images/products/white_tshirt_bra.jpg'),
    },
  ],
  Love: [
    {
      id: 's6',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£54',
      matchScore: 'Loved',
      image: require('@/assets/images/products/Full-Coverage-T-Shirt-Bra.png'),
    },
    {
      id: 's7',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£65',
      matchScore: 'Loved',
      image: require('@/assets/images/products/burgundy_lace_bra.jpg'),
    },
  ],
  "Didn't work": [
    {
      id: 's8',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£54',
      matchScore: 'Owned',
      image: require('@/assets/images/products/nude_plunge_bra.jpg'),
      feedbackReason: 'Too tight, poor support',
    },
    {
      id: 's9',
      brand: 'Curvy Kate',
      title: 'Full Coverage T-Shirt Bra',
      price: '£65',
      matchScore: 'Owned',
      image: require('@/assets/images/products/white_tshirt_bra.jpg'),
      feedbackReason: 'Too tight, poor support',
    },
  ],
};

export default function SavedScreen() {
  const [activeTab, setActiveTab] = useState<SavedTabType>('Want');

  const currentItems = SAVED_DATA[activeTab];

  const renderTopRightBadge = (tab: SavedTabType) => {
    switch (tab) {
      case 'Want':
        return <Ionicons name="bookmark" size={16} color={colorPalette.primary} />;
      case 'Own':
        return <Ionicons name="checkmark-circle-outline" size={16} color={colorPalette.primary} />;
      case 'Love':
        return <Ionicons name="heart" size={16} color={colorPalette.primary} />;
      case "Didn't work":
        return <Ionicons name="ban-outline" size={16} color="#706970" />;
      default:
        return null;
    }
  };

  return (
    <PlainLayout
      title="Saved"
      subTitle="Keep track of what you want, own, love, and what didn't work."
    >
      <View style={Containers.defaultContainer}>
        {/* ── 1. Tab Selector Row ── */}
        <View style={styles.tabsRow}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                activeOpacity={0.75}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── 2. Content: Empty State or 2-Column Product Grid ── */}
        {currentItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptySubtitle}>
              Products you save while exploring will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.productsGrid}>
            {currentItems.map((product) => (
              <View key={product.id} style={styles.productCardWrapper}>
                <ProductCard
                  product={product}
                  style={styles.cardItem}
                  topRightBadge={renderTopRightBadge(activeTab)}
                  footerNode={
                    product.feedbackReason ? (
                      <View style={styles.feedbackTag}>
                        <Ionicons name="alert-circle" size={11} color="#B94A58" />
                        <Text style={styles.feedbackTagText} numberOfLines={1}>
                          {product.feedbackReason}
                        </Text>
                      </View>
                    ) : null
                  }
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
        )}
      </View>
    </PlainLayout>
  );
}

const styles = StyleSheet.create({
  // ── Tabs ──
  tabsRow: {
    flexDirection: 'row',
    gap: s(6),
    marginTop: vs(14),
    marginBottom: vs(16),
  },
  tabButton: {
    flex: 1,
    height: vs(34),
    borderRadius: s(8),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E1E4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(4),
  },
  tabButtonActive: {
    backgroundColor: colorPalette.primary,
    borderColor: colorPalette.primary,
  },
  tabButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: colorPalette.primaryText,
  },
  tabButtonTextActive: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#FFFFFF',
  },

  // ── Empty State ──
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: vs(340),
    paddingHorizontal: s(24),
  },
  emptyTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: s(24),
    lineHeight: s(32),
    color: colorPalette.primaryText,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: colorPalette.secondaryText,
    textAlign: 'center',
    marginTop: vs(8),
    maxWidth: s(240),
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

  // ── Didn't Work Tag ──
  feedbackTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FCEEEF',
    paddingHorizontal: s(6),
    paddingVertical: vs(3),
    borderRadius: s(6),
    marginTop: vs(4),
  },
  feedbackTagText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 9,
    color: '#B94A58',
    flex: 1,
  },
});
