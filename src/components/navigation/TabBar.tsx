import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';
import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';

type TabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];

interface TabItemConfig {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  isCenter?: boolean;
}

const TAB_CONFIG: Record<string, TabItemConfig> = {
  index: {
    label: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  discover: {
    label: 'Discover',
    icon: 'search-outline',
    activeIcon: 'search',
  },
  community: {
    label: 'Community',
    icon: 'people-outline',
    activeIcon: 'people',
    isCenter: true,
  },
  saved: {
    label: 'Saved',
    icon: 'bookmark-outline',
    activeIcon: 'bookmark',
  },
  profile: {
    label: 'Profile',
    icon: 'person-outline',
    activeIcon: 'person',
  },
};

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: bottomPadding }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] || {
          label: options.title || route.name,
          icon: 'ellipse-outline',
          activeIcon: 'ellipse',
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // ── Elevated Center Action Tab ──
        if (config.isCenter) {
          return (
            <View key={route.key} style={styles.centerTabWrapper}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={config.label}
                onPress={onPress}
                onLongPress={onLongPress}
                activeOpacity={0.85}
                style={[
                  styles.centerButton,
                  isFocused && styles.centerButtonActive,
                ]}
              >
                <Ionicons
                  name={isFocused ? config.activeIcon : config.icon}
                  size={s(26)}
                  color={colorPalette.primary}
                />
              </TouchableOpacity>
            </View>
          );
        }

        const activeColor = colorPalette.primary;
        const inactiveColor = colorPalette.secondaryText;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={config.label}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            style={styles.tabItem}
          >
            <Ionicons
              name={isFocused ? config.activeIcon : config.icon}
              size={s(22)}
              color={isFocused ? activeColor : inactiveColor}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? activeColor : inactiveColor },
                isFocused && styles.tabLabelActive,
              ]}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colorPalette.surface,
    borderTopWidth: 1,
    borderTopColor: colorPalette.border,
    paddingTop: vs(8),
    height: Platform.OS === 'ios' ? vs(84) : vs(68),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    lineHeight: 14,
  },
  tabLabelActive: {
    fontFamily: 'Manrope_700Bold',
  },
  centerTabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: s(54),
    height: s(54),
    borderRadius: s(27),
    backgroundColor: colorPalette.surface,
    borderWidth: 1.5,
    borderColor: colorPalette.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(-22),
    ...Platform.select({
      ios: {
        shadowColor: colorPalette.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  centerButtonActive: {
    backgroundColor: '#FAF2F5',
    borderColor: colorPalette.primary,
  },
});
export default TabBar;
