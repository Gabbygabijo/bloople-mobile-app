import { WelcomeScreen } from '@/components/welcome-screen';
import { useBloopleApi } from '@/state/BloopleApiContext';
import { Redirect, router } from 'expo-router';
import { useState } from 'react';

export default function Index() {
  const { connected, profile } = useBloopleApi();
  // useEffect(() => {
  //   if (connected && profile && profile.version > 0) router.replace('/(tabs)');
  // }, [connected, profile]);
  // if (!connected) return <LocalConnectionScreen />;
  // if (profile && profile.version > 0) return null;

  // Temporary toggle: set to true to test dashboard, false to test welcome/onboarding
  const [isLogin, setIsLogin] = useState(false);
  if (isLogin) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <WelcomeScreen
      onGetStarted={() => {
        router.push('/onboarding');
      }}
    />
  );
}
