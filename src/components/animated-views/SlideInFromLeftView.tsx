import { useTheme } from '@/hooks/use-theme';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ThemedViewProps } from '../themed-view';

export default function SlideInFromLeftView({ 
  style, 
  lightColor, 
  darkColor, 
  type,
  ...otherProps 
}: ThemedViewProps) {
  const theme = useTheme();
  const backgroundColor = theme[type ?? 'background'];
  
  // Start off-screen to the left
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position off-screen left
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start fully transparent

  useEffect(() => {
    // Parallel animation for sliding and fading
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0, // Slide to final position (0 = normal position)
        speed: 20,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade to fully opaque
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [slideAnim, fadeAnim]);

  return (
    <Animated.View 
      style={[
        { 
          backgroundColor,
          transform: [
            { translateX: slideAnim }, // Slide from left
          ],
          opacity: fadeAnim, // Fade in
        }, 
        style
      ]} 
      {...otherProps} 
    />
  );
}