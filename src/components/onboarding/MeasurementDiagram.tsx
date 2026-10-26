import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

interface MeasurementDiagramProps {
  mode: 'underbust' | 'overbust';
  onToggleMode?: (mode: 'underbust' | 'overbust') => void;
}

export function MeasurementDiagram({
  mode,
  onToggleMode,
}: MeasurementDiagramProps) {
  const isUnderbust = mode === 'underbust';

  const imageSource = isUnderbust
    ? require('../../assets/images/under-bust.png')
    : require('../../assets/images/over-bust.png');

  return (
    <View style={styles.cardContainer}>
      {/* Top Right Label */}
      <Text style={styles.badgeText}>
        {isUnderbust ? 'UNDER-BUST' : 'OVER-BUST'}
      </Text>

      {/* Diagram Image */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onToggleMode?.(isUnderbust ? 'overbust' : 'underbust')}
        style={styles.imageWrapper}
      >
        <Image
          source={imageSource}
          style={styles.image}
          contentFit="contain"
          transition={200}
        />
      </TouchableOpacity>

      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        <TouchableOpacity
          onPress={() => onToggleMode?.('underbust')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={[styles.dot, isUnderbust && styles.activeDot]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onToggleMode?.('overbust')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={[styles.dot, !isUnderbust && styles.activeDot]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FAF6F2',
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: '#ECE4DE',
    paddingVertical: vs(12),
    paddingHorizontal: s(12),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: vs(180),
    width: '100%',
    position: 'relative',
  },
  badgeText: {
    position: 'absolute',
    top: vs(12),
    right: s(14),
    color: colorPalette.primaryText,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    fontFamily: 'Manrope_700Bold',
    zIndex: 1,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(8),
  },
  image: {
    width: '100%',
    height: vs(150),
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(6),
    marginTop: vs(6),
  },
  dot: {
    width: s(5),
    height: s(5),
    borderRadius: s(2.5),
    backgroundColor: '#D1C9CD',
  },
  activeDot: {
    backgroundColor: colorPalette.primary,
    width: s(6),
    height: s(6),
    borderRadius: s(3),
  },
});
