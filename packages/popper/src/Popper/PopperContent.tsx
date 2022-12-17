import React from 'react';
import { View, StyleSheet } from 'react-native';
import { usePopperContext } from './PopperContext';
import { getContainerStyle } from './utils';

const PopperContent = React.forwardRef(
  ({ children, style, arrowHeight, arrowWidth, ...rest }: any, ref: any) => {
    const { placement: placement, setOverlayRef } = usePopperContext('Popper');
    const overlayRef = React.useRef(null);

    React.useEffect(() => {
      setOverlayRef && setOverlayRef(overlayRef);
    }, [overlayRef, setOverlayRef]);

    const containerStyle = React.useMemo(
      () =>
        getContainerStyle({
          placement,
          arrowHeight,
          arrowWidth,
        }),
      [arrowHeight, arrowWidth, placement]
    );

    return (
      <View
        style={StyleSheet.flatten([containerStyle, style])}
        {...rest}
        ref={ref}
      >
        {children}
      </View>
    );
  }
);

export default PopperContent;
