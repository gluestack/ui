import React, { forwardRef } from 'react';
// import type { ViewProps } from 'react-native';
import { InputProvider } from './InputContext';
import { useHover } from '@react-native-aria/interactions';

export const InputRoot = (StyledInputRoot: any) =>
  forwardRef(
    ({
      children,
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired,
      ...props
    }: any) => {
      const inputRef = React.useRef();
      const { isHovered } = useHover({}, inputRef);
      const [isFocused, setIsFocused] = React.useState(false);
      const handleFocus = (focusState: boolean, callback: any) => {
        setIsFocused(focusState);
        callback();
      };
      console.log(isFocused);
      return (
        <StyledInputRoot
          states={{
            hover: isHovered,
            focus: isFocused,
            disabled: isDisabled,
            invalid: isInvalid,
            readonly: isReadOnly,
            required: isRequired,
          }}
          {...props}
          ref={inputRef}
        >
          {({ resolveContextChildrenStyle }: any) => {
            return (
              <InputProvider
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                isFocused={isFocused}
                isReadOnly={isReadOnly}
                isRequired={isRequired}
                inputRef={inputRef}
                handleFocus={handleFocus}
                resolveContextChildrenStyle={resolveContextChildrenStyle}
              >
                {children}
              </InputProvider>
            );
          }}
        </StyledInputRoot>
      );
    }
  );
