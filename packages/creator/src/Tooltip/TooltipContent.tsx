import React, { forwardRef } from 'react';
import { Platform } from 'react-native';

export const TooltipContent = (StyledTooltipContent: any) =>
  forwardRef(({ children, ...props }: any, ref: any) => {
    return (
      <StyledTooltipContent
        ref={ref}
        {...props}
        accessibilityRole={Platform.OS === 'web' ? 'tooltip' : undefined}
      >
        {children}
      </StyledTooltipContent>
    );
  });
