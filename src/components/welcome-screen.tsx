import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

/**
 * Welcome Screen 2 — shown after the splash/typewriter animation.
 * Rendered as an absolute full-screen overlay that fades out when
 * the user taps "Get Started".
 */
export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const opacity = useSharedValue(1);

  const handleGetStarted = () => {
    opacity.value = withTiming(0, {
      duration: 320,
      easing: Easing.out(Easing.quad),
    });
    setTimeout(onGetStarted, 360);
  };

  const containerAnim = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, containerAnim]}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>

        {/* ── Logo ── */}
        <View style={styles.logoRow}>
          <Image
            style={styles.logo}
            source={require('@/assets/images/splash-icon.png')}
            contentFit="contain"
          />
        </View>

        {/* ── Hero image ── */}
        <View style={styles.heroContainer}>
          <Image
            style={styles.heroImage}
            source={require('@/assets/images/getstarted-image.png')}
            contentFit="contain"
          />
        </View>

        {/* ── Body copy ── */}
        <View style={styles.textBlock}>
          <Text style={styles.headline}>
            Let's find your perfect fit and build your Fit-DNA.
          </Text>
          <Text style={styles.subtitle}>
            Tell us a little about you and we'll personalise your recommendations & fit advice.
          </Text>
        </View>

        {/* ── Push CTA to bottom ── */}
        <View style={styles.spacer} />

        {/* ── CTA ── */}
        <View style={styles.ctaBlock}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.82}
          >
            <Text style={styles.buttonLabel}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.caption}>Takes about 2-3 minutes.</Text>
        </View>

      </SafeAreaView>
    </Animated.View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const BACKGROUND = '#FBF8F4';
const TEXT_DARK = '#142029';
const TEXT_MUTED = '#706970';
const BUTTON_BG = '#7B3565'; // deep plum/mauve — Bloople brand

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND,
    zIndex: 500,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
  },

  // Logo
  logoRow: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 138,
    height: 61,
  },

  // Hero
  heroContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  heroImage: {
    width: '100%',
    height: 290,
  },

  // Text
  textBlock: {
    marginTop: 22,
    gap: 10,
  },
  headline: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 30,
    lineHeight: 38,
    color: TEXT_DARK,
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    lineHeight: 22,
    color: TEXT_MUTED,
  },

  // Layout
  spacer: {
    flex: 1,
  },

  // CTA
  ctaBlock: {
    paddingBottom: 12,
    gap: 14,
    alignItems: 'center',
  },
  button: {
    backgroundColor: BUTTON_BG,
    borderRadius: 14,
    height: 56,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  caption: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: TEXT_MUTED,
    textAlign: 'center',
  },
});
