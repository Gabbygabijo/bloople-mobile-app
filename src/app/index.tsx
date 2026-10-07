import { WelcomeScreen } from '@/components/welcome-screen';
import { router } from 'expo-router';

export default function Index() {
  return (
    <WelcomeScreen 
      onGetStarted={() => {
        router.push('/onboarding');
      }} 
    />
  );
}
