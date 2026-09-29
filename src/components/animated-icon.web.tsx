import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const WELCOME_TEXT = 'Welcome to ';
const CHAR_INTERVAL_MS = 60;
const PRE_TYPING_DELAY_MS = 750;
const POST_TYPING_PAUSE_MS = 1100;
const FADE_OUT_MS = 480;

export interface AnimatedSplashOverlayProps {
  fontsLoaded?: boolean;
  onComplete?: () => void;
}

export function AnimatedSplashOverlay({
  fontsLoaded = true,
  onComplete,
}: AnimatedSplashOverlayProps) {
  const [visible, setVisible] = useState(true);
  const [typedChars, setTypedChars] = useState(0);

  const overlayOpacity = useSharedValue(1);
  const splashOpacity = useSharedValue(1);
  const welcomeOpacity = useSharedValue(0);

  const charCountRef = useRef(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!fontsLoaded) return;
    SplashScreen.hideAsync().catch(() => {});

    const t1 = setTimeout(() => {
      splashOpacity.value = withTiming(0, { duration: 280 });
      welcomeOpacity.value = withTiming(1, { duration: 280 });

      charCountRef.current = 0;
      intervalRef.current = setInterval(() => {
        charCountRef.current += 1;
        const count = charCountRef.current;
        setTypedChars(count);

        if (count >= WELCOME_TEXT.length) {
          clearInterval(intervalRef.current);
          const t2 = setTimeout(() => {
            overlayOpacity.value = withTiming(0, { duration: FADE_OUT_MS });
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

  const overlayAnim = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }));
  const splashAnim = useAnimatedStyle(() => ({ opacity: splashOpacity.value }));
  const welcomeAnim = useAnimatedStyle(() => ({ opacity: welcomeOpacity.value }));

  if (!visible) return null;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, overlayAnim]}>
      {/* Layer 1: Splash — logo only, centered */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.centered, splashAnim]}>
        <Image
          style={styles.splashLogo}
          source={require('@/assets/images/splash-icon.png')}
          contentFit="contain"
        />
      </Animated.View>

      {/* Layer 2: Welcome 1 — "Welcome to [logo]" */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.centered, welcomeAnim]}>
        <View style={styles.welcomeRow}>
          <Text style={styles.welcomeText}>{WELCOME_TEXT.slice(0, typedChars)}</Text>
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

export function AnimatedIcon() {
  return null;
}
