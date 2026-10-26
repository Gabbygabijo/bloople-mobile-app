import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colorPalette, Containers } from '@/constants/styles';
import { s, vs } from '@/utils/size';

interface CommunityUsernameStepProps {
  initialUsername?: string;
  onContinue: (data: { communityUsername: string }) => void;
  onBack?: () => void;
}

export function CommunityUsernameStep({
  initialUsername = '',
  onContinue,
  onBack,
}: CommunityUsernameStepProps) {
  const [username, setUsername] = useState(initialUsername);

  const isGlassSupported =
    (Platform.OS === 'ios' || Platform.OS === 'macos') &&
    parseInt(String(Platform.Version), 10) >= 26;

  const handleContinue = () => {
    const cleaned = username.trim().replace(/^@/, '');
    if (cleaned) {
      onContinue({ communityUsername: cleaned });
    }
  };

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            stickyHeaderHiddenOnScroll
            stickyHeaderIndices={[0]}
          >
            {/* ── Top Navigation Bar ── */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={onBack}
                style={styles.backButtonWrapper}
                activeOpacity={0.7}
              >
                {isGlassSupported ? (
                  <GlassView glassEffectStyle="clear" style={styles.backButtonInner}>
                    <Ionicons
                      name="chevron-back"
                      size={20}
                      color={colorPalette.primaryText}
                    />
                  </GlassView>
                ) : (
                  <View
                    style={[styles.backButtonInner, { backgroundColor: '#FFFFFF' }]}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={20}
                      color={colorPalette.primaryText}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* ── Heading ── */}
            <ThemedText type="heading2" style={styles.title}>
              Choose your community username
            </ThemedText>

            {/* ── Input with @ Prefix ── */}
            <View style={styles.inputContainer}>
              <Text style={styles.atSymbol}>@</Text>
              <TextInput
                style={styles.textInput}
                value={username}
                onChangeText={(text) => setUsername(text.replace(/^@/, ''))}
                placeholder="username"
                placeholderTextColor="#A89EA4"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* ── Caption ── */}
            <Text style={styles.caption}>
              Your username is what other members will see. You don't need to use your real name.
            </Text>
          </ScrollView>

          {/* ── Bottom CTA ── */}
          <View style={styles.bottomBar}>
            <ActionButton
              btnText="Continue"
              onPress={handleContinue}
              disabled={!username.trim()}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  topBar: {
    paddingTop: s(8),
    paddingBottom: s(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonWrapper: {
    zIndex: 10,
  },
  backButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    ...Containers.defaultContainer,
    paddingBottom: vs(32),
  },
  title: {
    color: colorPalette.primaryText,
    marginBottom: vs(24),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E1E4',
    borderRadius: s(10),
    minHeight: 52,
    paddingHorizontal: s(16),
  },
  atSymbol: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    color: colorPalette.secondaryText,
    marginRight: s(6),
  },
  textInput: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: colorPalette.primaryText,
    height: '100%',
    paddingVertical: 14,
  },
  caption: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    lineHeight: 19,
    color: colorPalette.secondaryText,
    marginTop: vs(10),
  },
  bottomBar: {
    ...Containers.defaultContainer,
    paddingBottom: vs(12),
    paddingTop: vs(8),
  },
});
