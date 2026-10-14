import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ActionButton from '@/components/buttons/ActionButton';
import { ThemedText } from '@/components/themed-text';
import { colorPalette } from '@/constants/styles';
import { s, vs } from '@/utils/size';

export interface DynamicBottomSheetButton {
  text: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface DynamicBottomSheetProps {
  /**
   * Controls visibility of the bottom sheet
   */
  visible: boolean;
  /**
   * Setter to update visibility when dismissed
   */
  setVisible?: (visible: boolean) => void;
  /**
   * Callback invoked when the sheet is dismissed (swipe, backdrop, or programmatically)
   */
  onClose?: () => void;
  /**
   * Optional title displayed at top
   */
  title?: string | React.ReactNode;
  /**
   * Optional description text below the title
   */
  description?: string | React.ReactNode;
  /**
   * Optional icon/image node displayed at top center
   */
  icon?: React.ReactNode;
  /**
   * Primary action button
   */
  primaryButton?: DynamicBottomSheetButton;
  /**
   * Secondary action button
   */
  secondaryButton?: DynamicBottomSheetButton;
  /**
   * Custom child content rendered inside the sheet
   */
  children?: React.ReactNode;
  /**
   * Fixed snap points (e.g. ['50%', '85%']). If omitted and enableDynamicSizing is not false, dynamically sizes to content.
   */
  snapPoints?: (string | number)[];
  /**
   * Dynamically size the sheet according to its content height.
   * Defaults to true unless fixed snapPoints are provided.
   */
  enableDynamicSizing?: boolean;
  /**
   * Enable swipe-down gesture to dismiss. Defaults to true.
   */
  enablePanDownToClose?: boolean;
  /**
   * When true, wraps content in BottomSheetScrollView for scrollable content.
   * Defaults to false for compact modals.
   */
  scrollable?: boolean;
  /**
   * Custom style for content container
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Custom style for the background sheet
   */
  backgroundStyle?: StyleProp<ViewStyle>;
  /**
   * Custom style for drag handle indicator
   */
  handleIndicatorStyle?: StyleProp<ViewStyle>;
  /**
   * Whether to show drag handle. Defaults to true.
   */
  showHandle?: boolean;
}

export type DynamicBottomSheetRef = BottomSheetModal;

export const DynamicBottomSheet = React.forwardRef<
  BottomSheetModal,
  DynamicBottomSheetProps
>(function DynamicBottomSheet(
  {
    visible,
    setVisible,
    onClose,
    title,
    description,
    icon,
    primaryButton,
    secondaryButton,
    children,
    snapPoints,
    enableDynamicSizing,
    enablePanDownToClose = true,
    scrollable = false,
    contentContainerStyle,
    backgroundStyle,
    handleIndicatorStyle,
    showHandle = true,
  },
  ref
) {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const internalRef = useRef<BottomSheetModal>(null);
  const wasVisibleRef = useRef(false);

  // Forward ref methods to parent if ref is provided
  useImperativeHandle(ref, () => internalRef.current as BottomSheetModal, []);

  // Determine dynamic sizing behavior:
  // If snapPoints is provided, default dynamic sizing to false unless explicitly true.
  // Otherwise default dynamic sizing to true so the modal cleanly wraps its content.
  const isDynamic = enableDynamicSizing ?? (snapPoints === undefined);

  const resolvedSnapPoints = useMemo(() => {
    if (isDynamic) {
      return undefined;
    }
    if (snapPoints) {
      return snapPoints;
    }
    return [Math.round(windowHeight * 0.5), Math.round(windowHeight * 0.85)];
  }, [isDynamic, snapPoints, windowHeight]);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        internalRef.current?.present();
      });
    } else if (wasVisibleRef.current) {
      internalRef.current?.dismiss();
    }
    wasVisibleRef.current = visible;
  }, [visible]);

  const handleDismiss = useCallback(() => {
    wasVisibleRef.current = false;
    setVisible?.(false);
    onClose?.();
  }, [setVisible, onClose]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
        pressBehavior="close"
      />
    ),
    []
  );

  const bottomPadding = Math.max(insets.bottom, vs(20));

  const content = (
    <View
      style={[
        styles.contentContainer,
        { paddingBottom: bottomPadding },
        contentContainerStyle,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      {title && (
        typeof title === 'string' ? (
          <ThemedText type="heading2" style={styles.titleText}>
            {title}
          </ThemedText>
        ) : (
          title
        )
      )}

      {description && (
        typeof description === 'string' ? (
          <Text style={styles.descriptionText}>{description}</Text>
        ) : (
          description
        )
      )}

      {children && <View style={styles.childrenContainer}>{children}</View>}

      {(primaryButton || secondaryButton) && (
        <View style={styles.buttonContainer}>
          {primaryButton && (
            <ActionButton
              btnText={primaryButton.text}
              onPress={primaryButton.onPress}
              disabled={primaryButton.disabled}
              isLoading={primaryButton.isLoading}
              bgColor={primaryButton.bgColor}
              textColor={primaryButton.textColor}
              borderColor={primaryButton.borderColor}
              borderWidth={primaryButton.borderWidth}
            />
          )}

          {secondaryButton && (
            <ActionButton
              btnText={secondaryButton.text}
              onPress={secondaryButton.onPress}
              disabled={secondaryButton.disabled}
              isLoading={secondaryButton.isLoading}
              bgColor={secondaryButton.bgColor ?? '#FFFFFF'}
              textColor={secondaryButton.textColor ?? colorPalette.primary}
              borderColor={secondaryButton.borderColor ?? colorPalette.border}
              borderWidth={secondaryButton.borderWidth ?? 1}
            />
          )}
        </View>
      )}
    </View>
  );

  return (
    <BottomSheetModal
      ref={internalRef}
      snapPoints={resolvedSnapPoints}
      enableDynamicSizing={isDynamic}
      enablePanDownToClose={enablePanDownToClose}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      handleComponent={showHandle ? undefined : () => null}
      handleIndicatorStyle={[styles.dragHandle, handleIndicatorStyle]}
      handleStyle={styles.handle}
      backgroundStyle={[styles.background, backgroundStyle]}
    >
      {scrollable ? (
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView>{content}</BottomSheetView>
      )}
    </BottomSheetModal>
  );
});

export default DynamicBottomSheet;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colorPalette.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    paddingTop: vs(12),
    paddingBottom: vs(4),
  },
  dragHandle: {
    width: s(48),
    height: 5,
    backgroundColor: '#D1C9CD',
    borderRadius: 999,
  },
  contentContainer: {
    paddingHorizontal: s(24),
    paddingTop: vs(12),
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: vs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: colorPalette.primaryText,
    marginBottom: vs(12),
  },
  descriptionText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colorPalette.secondaryText,
    textAlign: 'center',
    marginBottom: vs(28),
    lineHeight: 20,
  },
  childrenContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: vs(8),
    gap: vs(6),
  },
});
