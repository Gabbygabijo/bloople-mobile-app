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
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
// AppTabs moved to (tabs)/_layout.tsx
import { WelcomeScreen } from '@/components/welcome-screen';

// Keep the native splash visible until our custom overlay takes over
SplashScreen.preventAutoHideAsync();

/**
 * Root layout — orchestrates the onboarding flow:
 *
 *   [Native splash]
 *       ↓  (fonts loaded)
 *   [AnimatedSplashOverlay]  ← logo → "Welcome to [logo]" typewriter → fade out
 *       ↓  (overlay fades, revealing WelcomeScreen beneath)
 *   [WelcomeScreen]          ← hero image + "Get Started" CTA
 *       ↓  (user taps Get Started)
 *   [AppTabs]                ← main app
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
      {/* ── Main app Stack (handles file-based routing) ── */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* ── Welcome 2 overlay (z-index 500) ── */}
        <WelcomeScreen onGetStarted={() => {
          router.push('/onboarding/about-you');
        }} />

      {/* ── Splash + Welcome 1 overlay (z-index 1000, highest) ── */}
      <AnimatedSplashOverlay fontsLoaded={fontsLoaded ?? false} />
    </ThemeProvider>
  );
}
