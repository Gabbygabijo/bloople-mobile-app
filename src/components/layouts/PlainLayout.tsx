import { colorPalette, Containers } from '@/constants/styles'
import { s } from '@/utils/size'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '../themed-text'
import { ThemedView } from '../themed-view'

interface PlainLayoutProp {
  children: React.ReactNode;
  title: string;
  subTitle?: string
}
const PlainLayout = ({ children, title, subTitle }: PlainLayoutProp) => {
  return (
    <ThemedView
      style={styles.root}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[0]}
        >
          <View style={Containers.defaultContainer}>
            <View style={styles.topContainer}>
              <ThemedText type='defaultSemiBold'>{title}</ThemedText>
              {subTitle && <ThemedText
                type='caption'
                style={styles.subTitle}
              >{subTitle}</ThemedText>}
            </View>
          </View>
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
    gap: s(4)
  },
  subTitle: {
    color: colorPalette.secondaryText
  }
})