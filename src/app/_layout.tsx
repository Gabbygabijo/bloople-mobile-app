import {
  CormorantGaramond_400Regular,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
// AppTabs moved to (tabs)/_layout.tsx
import { BloopleApiProvider } from '@/state/BloopleApiContext';

// Keep the native splash visible until our custom overlay takes over
SplashScreen.preventAutoHideAsync();

/**
 * Root layout — orchestrates the onboarding flow:
 *
 *   [Native splash]
 *       ↓  (fonts loaded)
 *   [AnimatedSplashOverlay]  ← logo → "Welcome to [logo]" typewriter → fade out
 *       ↓
 *   [Local connection] → [Welcome] → [Fit-DNA onboarding] → [Home summary]
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    CormorantGaramond_400Regular,
    CormorantGaramond_700Bold,
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <BloopleApiProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <AnimatedSplashOverlay fontsLoaded={fontsLoaded ?? false} />
      </BloopleApiProvider>
    </ThemeProvider>
  );
}
