import React, { createContext, forwardRef } from 'react';
import { useFocus, useHover, useIsPressed } from '../ReactNativeAria';
import { useFocusRing } from '@react-native-aria/focus';

function composeEventHandlers<E>(
  originalEventHandler?: null | ((event: E) => void),
  ourEventHandler?: (event: E) => void
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    ourEventHandler?.(event);
  };
}

export const IconButtonContext = createContext<any>({});

const IconButon = (StyledIconButton: any) =>
  forwardRef(({ children, isDisabled, ...props }: any, ref: any) => {
    let { focusProps: focusRingProps }: any = useFocusRing();
    const { pressableProps, isPressed } = useIsPressed();
    let { isFocused, focusProps } = useFocus();
    const { isHovered, hoverProps }: any = useHover();

    return (
      <StyledIconButton
        ref={ref}
        {...props}
        states={{
          hover: isHovered,
          focus: isFocused,
          active: isPressed,
          disabled: isDisabled,
        }}
        disabled={isDisabled}
        onPressIn={composeEventHandlers(
          props?.onPressIn,
          pressableProps.onPressIn
        )}
        onPressOut={composeEventHandlers(
          props?.onPressOut,
          pressableProps.onPressOut
        )}
        // @ts-ignore - web only
        onHoverIn={composeEventHandlers(props?.onHoverIn, hoverProps.onHoverIn)}
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
        {({ resolveContextChildrenStyle }: any) => {
          return (
            <IconButtonContext.Provider
              value={{
                resolveContextChildrenStyle: resolveContextChildrenStyle,
              }}
            >
              {children}
            </IconButtonContext.Provider>
          );
        }}
      </StyledIconButton>
    );
  });

export default IconButon;
