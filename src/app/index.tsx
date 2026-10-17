import { WelcomeScreen } from '@/components/welcome-screen';
import { LocalConnectionScreen } from '@/components/LocalConnectionScreen';
import { useBloopleApi } from '@/state/BloopleApiContext';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { connected, profile } = useBloopleApi();
  useEffect(() => {
    if (connected && profile && profile.version > 0) router.replace('/(tabs)');
  }, [connected, profile]);
  if (!connected) return <LocalConnectionScreen />;
  if (profile && profile.version > 0) return null;
  return (
    <WelcomeScreen 
      onGetStarted={() => {
        router.push('/onboarding');
      }} 
    />
  );
}
