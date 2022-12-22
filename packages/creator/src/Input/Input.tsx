import React, { forwardRef } from 'react';

// import { useHover } from "@react-native-aria/interactions";
// import type { InputProps } from './types';
import { useInput } from './InputContext';

export const Input = (StyledInput: any) =>
  forwardRef(
    ({
      children,
      //   isDisabled,
      //   isInvalid,
      //   isReadOnly,
      //   isRequired,
      // isFullWidth,
      onKeyPress,
      type = 'text',
      ...props
    }: any) => {
      const {
        isDisabled,
        isReadOnly,
        handleFocus,
        isFocused,
        resolveContextChildrenStyle,
      } = useInput('InputContext');

      const { ancestorStyle } = StyledInput.config;
      let styledObject = {};

      ancestorStyle?.forEach((consumer: any) => {
        if (resolveContextChildrenStyle[consumer]) {
          styledObject = [styledObject, resolveContextChildrenStyle[consumer]];
        }
      });

      return (
        <StyledInput
          states={{
            focus: isFocused,
          }}
          secureTextEntry={type === 'password'}
          accessible
          editable={isDisabled || isReadOnly ? false : true}
          onKeyPress={(e: any) => {
            e.persist();
            onKeyPress && onKeyPress(e);
          }}
          onFocus={(e: any) => {
            handleFocus(
              true,
              props?.onFocus ? () => props?.onFocus(e) : () => {}
            );
          }}
          onBlur={(e: any) => {
            handleFocus(
              false,
              props?.onBlur ? () => props?.onBlur(e) : () => {}
            );
          }}
          {...props}
          //   ref={inputRef}
          ancestorStyle={styledObject}
        >
          {children}
        </StyledInput>
      );
    }
  );
