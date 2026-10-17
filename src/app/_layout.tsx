import {
  CormorantGaramond_400Regular,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <BloopleApiProvider>

            {/* ── Main app Stack (handles file-based routing) ── */}
            <Stack screenOptions={{ headerShown: false }} />

            {/* ── Welcome 2 overlay (z-index 500) ── */}
            {/* <WelcomeScreen
            onGetStarted={() => {
              router.push('/onboarding');
            }}
          /> */}

            {/* ── Splash + Welcome 1 overlay (z-index 1000, highest) ── */}
            <AnimatedSplashOverlay fontsLoaded={fontsLoaded ?? false} />
          </BloopleApiProvider>

        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
