import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="about-you" />
      <Stack.Screen name="your-fit-1" />
      <Stack.Screen name="your-fit-2" />
    </Stack>
  );
}
