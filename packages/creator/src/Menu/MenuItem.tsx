import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-native-aria/focus';
import { useMenuItem } from './useMenu';
import { mergeRefs } from '../utils';
import { useMenu } from './MenuContext';
import { useFocus, useHover, useIsPressed } from '../ReactNativeAria';
import { Text } from 'react-native';

function composeEventHandlers<E>(
  originalEventHandler?: null | ((event: E) => void),
  ourEventHandler?: (event: E) => void
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    ourEventHandler?.(event);
  };
}

const MenuItem = (StyledMenuItem: any) =>
  forwardRef(
    ({ children, isDisabled, onPress, textValue, ...props }: any, ref: any) => {
      const { closeOnSelect, onClose } = useMenu('MenuContext');
      const menuItemRef = React.useRef<any>(null);
      const mergedRef = mergeRefs([menuItemRef, ref]);

      const [textContent, setTextContent] = React.useState('');

      const { focusProps: focusRingProps }: any = useFocusRing();
      const { pressableProps, isPressed } = useIsPressed();
      const { isFocused, focusProps } = useFocus();
      const { isHovered, hoverProps }: any = useHover();

      React.useEffect(() => {
        const menuItem = menuItemRef.current;
        if (menuItem) {
          setTextContent((menuItem.textContent ?? '').trim());
        }
      }, [children]);

      const menuItemProps = useMenuItem({
        textValue: textValue ?? textContent,
        ref: menuItemRef,
      });

      return (
        <StyledMenuItem
          {...menuItemProps}
          ref={mergedRef}
          disabled={isDisabled}
          accessibilityState={{
            disabled: isDisabled,
            hover: isHovered,
            focus: isFocused,
            active: isPressed,
          }}
          onPress={(e: any) => {
            if (!isDisabled) {
              onPress && onPress(e);
              if (closeOnSelect) {
                onClose && onClose();
              }
            }
          }}
          states={{
            hover: isHovered,
            focus: isFocused,
            active: isPressed,
            disabled: isDisabled,
          }}
          {...props}
          onPressIn={composeEventHandlers(
            props?.onPressIn,
            pressableProps.onPressIn
          )}
          onPressOut={composeEventHandlers(
            props?.onPressOut,
            pressableProps.onPressOut
          )}
          // @ts-ignore - web only
          onHoverIn={composeEventHandlers(
            props?.onHoverIn,
            hoverProps.onHoverIn
          )}
          // @ts-ignore - web only
          onHoverOut={composeEventHandlers(
            props?.onHoverOut,
            hoverProps.onHoverOut
          )}
          // @ts-ignore - web only
          onFocus={composeEventHandlers(
            composeEventHandlers(props?.onFocus, focusProps.onFocus),
            focusRingProps.onFocus
          )}
          // @ts-ignore - web only
          onBlur={composeEventHandlers(
            composeEventHandlers(props?.onBlur, focusProps.onBlur),
            focusRingProps.onBlur
          )}
        >
          <Text>{children}</Text>
        </StyledMenuItem>
      );
    }
  );

export default MenuItem;
