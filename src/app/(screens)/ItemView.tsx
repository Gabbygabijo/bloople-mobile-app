import DynamicViewLayout from '@/components/layouts/DynamicViewLayout'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { isGlassSupported } from '@/constants/styles'
import { GlassView } from 'expo-glass-effect'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import LoveIcon from '../../assets/svgs/LoveIcon'

const ItemView = () => {
  const { id } = useLocalSearchParams();
  return (
    <DynamicViewLayout
      rightHandler={
        <TouchableOpacity style={styles.topRightWrapper} activeOpacity={0.7}>
          {isGlassSupported ? (
            <GlassView glassEffectStyle="clear" style={styles.topRightInner}>
              <LoveIcon />
            </GlassView>
          ) : (
            <View style={[styles.topRightInner, { backgroundColor: '#FFFFFF' }]}>
              <LoveIcon />
            </View>
          )}
        </TouchableOpacity>}
    >
      <ThemedView
        style={{}}
      >
        <ThemedText>Hello{id}</ThemedText>
      </ThemedView>
    </DynamicViewLayout>
  )
}

export default ItemView

const styles = StyleSheet.create({
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
  }
})