import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// ─── Timings ────────────────────────────────────────────────────────────────
const PRE_TYPING_DELAY_MS = 750; // pause after splash before typing starts
const CHAR_INTERVAL_MS = 60; // ms between each character
const POST_TYPING_PAUSE_MS = 1100; // pause after full text is typed
const CROSS_FADE_MS = 280; // splash → welcome1 cross-fade duration
const FADE_OUT_MS = 480; // overlay fade-out duration

const WELCOME_TEXT = 'Welcome to ';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface AnimatedSplashOverlayProps {
  /** Pass true once custom fonts are loaded, so we wait before hiding the
   *  native splash and starting the animation. */
  fontsLoaded?: boolean;
  /** Called after the overlay fully fades out, revealing the underlying screen. */
  onComplete?: () => void;
}

// ─── AnimatedSplashOverlay ───────────────────────────────────────────────────
export function AnimatedSplashOverlay({
  fontsLoaded = true,
  onComplete,
}: AnimatedSplashOverlayProps) {
  const [visible, setVisible] = useState(true);
  const [typedChars, setTypedChars] = useState(0);

  // Shared values for animation
  const overlayOpacity = useSharedValue(1); // entire overlay
  const splashOpacity = useSharedValue(1); // "logo only" layer
  const welcomeOpacity = useSharedValue(0); // "Welcome to [logo]" layer

  const charCountRef = useRef(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  // React 19 requires an initial value for useRef
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!fontsLoaded) return;

    // Hide native splash — our custom overlay takes over
    SplashScreen.hideAsync().catch(() => {});

    // Step 1 — pause on splash, then begin welcome animation
    const t1 = setTimeout(() => {
      // Cross-fade: splash layer → welcome1 layer
      splashOpacity.value = withTiming(0, {
        duration: CROSS_FADE_MS,
        easing: Easing.in(Easing.quad),
      });
      welcomeOpacity.value = withTiming(1, {
        duration: CROSS_FADE_MS,
        easing: Easing.out(Easing.quad),
      });

      // Step 2 — start typewriter
      charCountRef.current = 0;
      intervalRef.current = setInterval(() => {
        charCountRef.current += 1;
        const count = charCountRef.current;
        setTypedChars(count);

        if (count >= WELCOME_TEXT.length) {
          clearInterval(intervalRef.current);

          // Step 3 — pause, then fade out the overlay
          const t2 = setTimeout(() => {
            overlayOpacity.value = withTiming(0, {
              duration: FADE_OUT_MS,
              easing: Easing.in(Easing.quad),
            });

            const t3 = setTimeout(() => {
              setVisible(false);
              onComplete?.();
            }, FADE_OUT_MS + 50);
            timerRefs.current.push(t3);
          }, POST_TYPING_PAUSE_MS);
          timerRefs.current.push(t2);
        }
      }, CHAR_INTERVAL_MS);
    }, PRE_TYPING_DELAY_MS);

    timerRefs.current.push(t1);

    return () => {
      timerRefs.current.forEach(clearTimeout);
      timerRefs.current = [];
      clearInterval(intervalRef.current);
    };
  }, [fontsLoaded]);

  const overlayAnim = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));
  const splashAnim = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
  }));
  const welcomeAnim = useAnimatedStyle(() => ({
    opacity: welcomeOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, overlayAnim]}>
      {/* ── Layer 1: Splash — just the logo, centered ── */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.centered, splashAnim]}>
        <Image
          style={styles.splashLogo}
          source={require('@/assets/images/splash-icon.png')}
          contentFit="contain"
        />
      </Animated.View>

      {/* ── Layer 2: Welcome 1 — "Welcome to [logo]" row, centered ── */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.centered, welcomeAnim]}>
        <View style={styles.welcomeRow}>
          <Text style={styles.welcomeText}>
            {WELCOME_TEXT.slice(0, typedChars)}
          </Text>
          <Image
            style={styles.welcomeLogo}
            source={require('@/assets/images/splash-icon.png')}
            contentFit="contain"
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#FBF8F4',
    zIndex: 1000,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 165,
    height: 73,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  welcomeText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 30,
    color: '#142029',
    includeFontPadding: false,
  },
  welcomeLogo: {
    width: 148,
    height: 66,
  },
});

// ─── AnimatedIcon (stub — kept for import compatibility) ─────────────────────
export function AnimatedIcon() {
  return null;
}
