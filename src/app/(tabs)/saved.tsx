import { StyleSheet } from 'react-native';

import PlainLayout from '@/components/layouts/PlainLayout';
import { ThemedView } from '@/components/themed-view';

export default function SavedScreen() {
  return (
    <PlainLayout
      title='Saved'
      subTitle='Your saved bras and recommendations will appear here.'>
      <ThemedView style={styles.container}>
       
    </ThemedView>
    </PlainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
});
