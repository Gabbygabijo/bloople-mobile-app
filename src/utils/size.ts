// utils/size.ts
import { Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');
const isTablet = Math.min(width, height) >= 768;

// Adjust the factor to control how much smaller things should be on iPad
// Lower factor = less scaling on tablets
const tabletFactor = 0.3; // Experiment with values between 0.2-0.5

export const s = (size: number) => {
  const scaled = scale(size);
  return isTablet ? moderateScale(size, tabletFactor) : scaled;
};

export const fs = (size: number) => {
  const scaled = moderateScale(size);
  return isTablet ? moderateScale(size, tabletFactor) : scaled;
};

export const vs = (size: number) => {
  const scaled = verticalScale(size);
  return isTablet ? moderateScale(size, tabletFactor) : scaled;
};

export const ms = moderateScale;