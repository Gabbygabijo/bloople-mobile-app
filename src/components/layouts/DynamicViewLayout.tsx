import { colorPalette, Containers, isGlassSupported } from '@/constants/styles';
import { s } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

interface DynamicViewLayoutProp {
  children?: React.ReactNode;
  title?: string;
  backHandler?: () => void;
  rightHandler?: React.JSX.Element;
  footer?: React.ReactNode;
}

const DynamicViewLayout: React.FC<DynamicViewLayoutProp> = ({
  backHandler,
  children,
  title,
  rightHandler,
  footer,
}) => {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: footer ? 24 : 40 }}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
        >
          <View style={Containers.defaultContainer}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={backHandler || (() => router.back())} style={styles.backButtonWrapper} activeOpacity={0.7}>
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
              <ThemedText type='defaultSemiBold' style={styles.titleText}>{title}</ThemedText>
              <View>
                {rightHandler}
              </View>
            </View>
          </View>

          <ThemedView style={styles.InnerContainer}>
            {children}
          </ThemedView>
        </ScrollView>
        {footer}
      </SafeAreaView>
    </ThemedView>
  )
}

export default DynamicViewLayout

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colorPalette.background,
  },
  scrollView: {
    flex: 1,
  },
  InnerContainer: {
    ...Containers.defaultContainer
  },
  topBar: {
    paddingTop: s(8),
    paddingBottom: s(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  titleText: {
    color: colorPalette.primaryText
  }
})