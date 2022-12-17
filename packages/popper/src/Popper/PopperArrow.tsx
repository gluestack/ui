import React from 'react';
import { View, ViewStyle } from 'react-native';
import { usePopperContext } from './PopperContext';
import { getArrowStyles, popperDefaultData } from './utils';

// This is an internal implementation of PopoverArrow
const PopperArrow = React.forwardRef(
  (
    {
      height = popperDefaultData.defaultArrowHeight,
      width = popperDefaultData.defaultArrowWidth,
      style,
      ...rest
    }: any,
    ref: any
  ) => {
    const { arrowProps, placement } = usePopperContext('Popper');
    const additionalStyles = React.useMemo(
      () => getArrowStyles({ placement: placement, height, width }),
      [placement, height, width]
    );

    const triangleStyle: ViewStyle = React.useMemo(
      () => ({
        position: 'absolute',
        width,
        height,
      }),
      [width, height]
    );

    const arrowStyles = React.useMemo(
      () => [arrowProps?.style, triangleStyle, additionalStyles, style],
      [triangleStyle, additionalStyles, arrowProps?.style, style]
    );

    return (
      <View
        ref={ref}
        style={arrowStyles}
        zIndex={1}
        {...arrowProps}
        {...rest}
        actualPlacement={placement}
      />
    );
  }
);

export default PopperArrow;
