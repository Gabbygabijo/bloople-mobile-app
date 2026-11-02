import { colorPalette, Containers } from '@/constants/styles'
import { s, vs } from '@/utils/size'
import { ScrollView, StyleSheet, View } from 'react-native'
import { NativeSafeAreaViewProps, SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '../themed-text'
import { ThemedView } from '../themed-view'

interface PlainLayoutProp {
  children: React.ReactNode;
  title: string;
  subTitle?: string
  safeAreaEdges?: NativeSafeAreaViewProps['edges']
}
const PlainLayout = ({ children, title, subTitle, safeAreaEdges = ['left', 'right', 'top'] }: PlainLayoutProp) => {
  return (
    <ThemedView
      style={styles.root}
    >
      <SafeAreaView style={{ flex: 1 }} edges={safeAreaEdges} >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
        >
          <ThemedView style={Containers.defaultContainer}>
            <View style={styles.topContainer}>
              <ThemedText type='defaultSemiBold'>{title}</ThemedText>
              {subTitle && <ThemedText
                type='caption'
                style={styles.subTitle}
              >{subTitle}</ThemedText>}
            </View>
          </ThemedView>
          {children}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  )
}

export default PlainLayout

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flex: 1
  },
  topContainer: {
    gap: s(4),
    paddingVertical: vs(8)
  },
  subTitle: {
    color: colorPalette.secondaryText
  }
})