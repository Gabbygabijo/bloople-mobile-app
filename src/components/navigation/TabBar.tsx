import { Tabs } from 'expo-router';
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';
import ActiveHomeIcon from '../../assets/svgs/tab-icons/ActiveHomeIcon';
import ActiveProfileIcon from '../../assets/svgs/tab-icons/ActiveProfileIcon';
import ActiveSavedIcon from '../../assets/svgs/tab-icons/ActiveSavedIcon';
import ActiveSearchIcon from '../../assets/svgs/tab-icons/ActiveSearchIcon';
import ComminityIcon from '../../assets/svgs/tab-icons/ComminityIcon';
import HomeIcon from '../../assets/svgs/tab-icons/HomeIcon';
import ProfileIcon from '../../assets/svgs/tab-icons/ProfileIcon';
import SavedIcon from '../../assets/svgs/tab-icons/SavedIcon';
import SearchIcon from '../../assets/svgs/tab-icons/SearchIcon';

type TabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];

interface TabItemConfig {
  label: string;
  Icon: React.ComponentType<SvgProps>;
  ActiveIcon: React.ComponentType<SvgProps>;
  isCenter?: boolean;
}

const TAB_CONFIG: Record<string, TabItemConfig> = {
  index: {
    label: 'Home',
    Icon: HomeIcon,
    ActiveIcon: ActiveHomeIcon,
  },
  discover: {
    label: 'Discover',
    Icon: SearchIcon,
    ActiveIcon: ActiveSearchIcon,
  },
  community: {
    label: 'Community',
    Icon: ComminityIcon,
    ActiveIcon: ComminityIcon,
    isCenter: true,
  },
  saved: {
    label: 'Saved',
    Icon: SavedIcon,
    ActiveIcon: ActiveSavedIcon,
  },
  profile: {
    label: 'Profile',
    Icon: ProfileIcon,
    ActiveIcon: ActiveProfileIcon,
  },
};

export function TabBar({
  state,
  descriptors,
  emitter,
  navigateToTab,
  insets: propInsets,
}: TabBarProps) {
  const contextInsets = useSafeAreaInsets();
  const insets = propInsets ?? contextInsets;
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: bottomPadding }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] || {
          label: options.title || route.name,
          Icon: HomeIcon,
          ActiveIcon: ActiveHomeIcon,
        };

        const onPress = () => {
          const event = emitter.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigateToTab(route.key);
          }
        };

        const onLongPress = () => {
          emitter.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // ── Elevated Center Action Tab (Community) ──
        if (config.isCenter) {
          const CenterIcon = isFocused ? config.ActiveIcon : config.Icon;
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
                <CenterIcon width={s(32)} height={s(32)} />
              </TouchableOpacity>
            </View>
          );
        }

        const TabIcon = isFocused ? config.ActiveIcon : config.Icon;

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
            <TabIcon width={s(24)} height={s(24)} />
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
    minHeight: Platform.OS === 'ios' ? vs(76) : vs(62),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vs(8),
  },
  centerTabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: s(60),
    height: s(60),
    borderRadius: s(30),
    backgroundColor: colorPalette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(-24),
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  centerButtonActive: {
    backgroundColor: '#DEC7D3',
    ...Platform.select({
      ios: {
        shadowColor: colorPalette.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});

export default TabBar;
