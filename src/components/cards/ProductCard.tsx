import { Image, type ImageSource } from 'expo-image';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

export interface ProductItem {
  id: string;
  brand: string;
  title: string;
  price: string;
  matchScore: string;
  image: ImageSource | string | number;
}

export interface ProductCardProps {
  product: ProductItem;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ProductCard({ product, onPress, style }: ProductCardProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, style]}
      activeOpacity={0.8}
      {...(onPress ? { onPress } : {})}
    >
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <View style={styles.details}>
        <ThemedText type="caption" style={styles.brand}>
          {product.brand}
        </ThemedText>
        <ThemedText type="heading3" numberOfLines={1} style={styles.title}>
          {product.title}
        </ThemedText>
        <View style={styles.priceRow}>
          <ThemedText style={styles.price}>{product.price}</ThemedText>
          <ThemedText style={styles.matchBadge}>{product.matchScore}</ThemedText>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    width: s(145),
    backgroundColor: colorPalette.surface,
    borderRadius: s(16),
    borderWidth: 1,
    borderColor: colorPalette.border,
    overflow: 'hidden',
    padding: s(8)
  },
  imageContainer: {
    height: vs(108),
    backgroundColor: colorPalette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(8),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    backgroundColor: colorPalette.secondary + '1A',
    padding: s(11),
    gap: vs(3),
    borderRadius: s(12)
  },
  brand: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 8,
    color: colorPalette.primaryText,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    color: colorPalette.primaryText,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: colorPalette.primaryText,
  },
  matchBadge: {
    fontSize: 8,
    color: colorPalette.success,
  },
});

export default ProductCard;
