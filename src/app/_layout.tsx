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
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
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
  const [onboarded, setOnboarded] = useState(false);

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    CormorantGaramond_400Regular,
    CormorantGaramond_700Bold,
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* ── Main app (always mounted, revealed once onboarding is done) ── */}
      <AppTabs />

      {/* ── Welcome 2 overlay (z-index 500) ── */}
      {!onboarded && (
        <WelcomeScreen onGetStarted={() => setOnboarded(true)} />
      )}

      {/* ── Splash + Welcome 1 overlay (z-index 1000, highest) ── */}
      <AnimatedSplashOverlay fontsLoaded={fontsLoaded ?? false} />
    </ThemeProvider>
  );
}
