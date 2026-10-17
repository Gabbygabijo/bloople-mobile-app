import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import ActionButton from '@/components/buttons/ActionButton';
import { colorPalette } from '@/constants/styles';
import { useBloopleApi } from '@/state/BloopleApiContext';

export function LocalConnectionScreen() {
  const [token, setToken] = useState('');
  const [connecting, setConnecting] = useState(false);
  const { connect, connectError } = useBloopleApi();

  const handleConnect = async () => {
    if (!token.trim() || connecting) return;
    setConnecting(true);
    try {
      await connect(token);
    } catch {
      // The provider retains a readable connection error for this screen.
    } finally {
      setConnecting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <ThemedText type="heading2">Connect to Bloople local</ThemedText>
        <ThemedText>Run `make local-token` in backend and paste the demo token here. It stays in memory and expires after two hours.</ThemedText>
        <ThemedText style={styles.endpoint}>API: {process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8010'}</ThemedText>
        <TextInput
          value={token}
          onChangeText={setToken}
          placeholder="Paste local demo token"
          placeholderTextColor={colorPalette.secondaryText}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          style={styles.input}
          accessibilityLabel="Local demo account token"
        />
        {connectError ? <ThemedText style={styles.error}>{connectError}</ThemedText> : null}
        <ActionButton
          btnText="Connect"
          disabled={!token.trim() || connecting}
          isLoading={connecting}
          onPress={handleConnect}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#FBF8F4', paddingHorizontal: 28 },
  content: { gap: 16 },
  endpoint: { fontSize: 12 },
  input: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: '#D8D0C8',
    borderRadius: 8,
    padding: 12,
    color: colorPalette.primaryText,
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
  },
  error: { color: '#A33333' },
});
