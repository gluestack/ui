import React, { forwardRef } from 'react';
import { useRadio } from './RadioProvider';

export const RadioIndicator = (StyledRadioIndicator: any) =>
  forwardRef(({ children, ...props }: any) => {
    const {
      isChecked,
      isDisabled,
      isFocusVisible,
      isInvalid,
      isHovered,
      resolveContextChildrenStyle,
    } = useRadio('RadioContext');

    const { ancestorStyle } = StyledRadioIndicator.config;
    let styledObject = {};

    ancestorStyle?.forEach((consumer: any) => {
      if (resolveContextChildrenStyle[consumer]) {
        styledObject = [styledObject, resolveContextChildrenStyle[consumer]];
      }
    });

    return (
      <StyledRadioIndicator
        states={{
          checked: isChecked,
          focusVisible: isFocusVisible,
          disabled: isDisabled,
          invalid: isInvalid,
          hover: isHovered,
        }}
        ancestorStyle={styledObject}
        {...props}
      >
        {children}
      </StyledRadioIndicator>
    );
  });
