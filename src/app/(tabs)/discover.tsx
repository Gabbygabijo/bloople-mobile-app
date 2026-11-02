import { StyleSheet } from 'react-native';

import PlainLayout from '@/components/layouts/PlainLayout';
import { ThemedView } from '@/components/themed-view';

export default function DiscoverScreen() {
  return (
    <PlainLayout 
    title='Discover' 
    subTitle='Browse bras and styles tailored to your Fit-DNA.'>
      <ThemedView style={styles.container}>
        
      </ThemedView>
    </PlainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
