import React, { forwardRef } from 'react';
import { useIsPressed, useHover, useFocus } from '../ReactNativeAria';
import { usePopover } from './PopoverContext';
import { useFocusRing } from '@react-native-aria/focus';
import { composeEventHandlers } from '../utils';

const PopoverCloseButton = (StyledPopoverCloseButton: any) =>
  forwardRef(({ children, isDisabled, ...props }: any, ref: any) => {
    const { onClose } = usePopover('PopoverContext');
    const { hoverProps, isHovered } = useHover();
    const { pressableProps, isPressed } = useIsPressed();
    const { focusProps, isFocused } = useFocus();
    const { focusProps: focusRingProps }: any = useFocusRing();

    const {
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onFocus,
      onBlur,
      ...resolvedProps
    } = props;

    return (
      <StyledPopoverCloseButton
        accessibilityRole="button"
        states={{
          hover: isHovered,
          focus: isFocused,
          active: isPressed,
          disabled: isDisabled,
        }}
        ref={ref}
        disabled={isDisabled}
        onPressIn={composeEventHandlers(onPressIn, pressableProps.onPressIn)}
        onPressOut={composeEventHandlers(onPressOut, pressableProps.onPressOut)}
        // @ts-ignore - web only
        onHoverIn={composeEventHandlers(onHoverIn, hoverProps.onHoverIn)}
        // @ts-ignore - web only
        onHoverOut={composeEventHandlers(onHoverOut, hoverProps.onHoverOut)}
        // @ts-ignore - web only
        onFocus={composeEventHandlers(
          composeEventHandlers(onFocus, focusProps.onFocus),
          focusRingProps.onFocus
        )}
        // @ts-ignore - web only
        onBlur={composeEventHandlers(
          composeEventHandlers(onBlur, focusProps.onBlur),
          focusRingProps.onBlur
        )}
        onPress={onClose}
        {...resolvedProps}
      >
        {children}
      </StyledPopoverCloseButton>
    );
  });

export default PopoverCloseButton;
