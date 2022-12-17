import React from 'react';
import { PopperProvider } from './PopperContext';
// import type { IPopperProps, IScrollContentProps } from './types';
import { StyleSheet, View } from 'react-native';
import { useOverlayPosition } from '@react-native-aria/overlays';

const Popper = (
  props: any & {
    triggerRef: any;
    onClose: any;
    setOverlayRef?: (overlayRef: any) => void;
  }
) => {
  const overlayRef = React.useRef(null);

  const { overlayProps, rendered, arrowProps, placement } = useOverlayPosition({
    targetRef: props.triggerRef,
    overlayRef,
    shouldFlip: props.shouldFlip,
    crossOffset: props.crossOffset,
    offset: props.offset,
    placement: props.placement as any,
    containerPadding: 0,
    onClose: props.onClose,
    shouldOverlapWithTrigger: props.shouldOverlapWithTrigger,
  });

  const overlayStyle = React.useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          ...overlayProps.style,
          // To handle translucent android StatusBar
          // marginTop: Platform.select({ android: top, default: 0 }),
          opacity: rendered ? 1 : 0,
          position: 'absolute',
        },
      }),
    [rendered, overlayProps.style]
  );

  React.useEffect(() => {
    props.setOverlayRef && props.setOverlayRef(overlayRef);
  }, [overlayRef, props, props.setOverlayRef]);

  return (
    <PopperProvider
      triggerRef={props.triggerRef}
      onClose={props.onClose}
      arrowProps={arrowProps}
      setOverlayRef={props.setOverlayRef}
      placement={placement}
      // @ts-ignore
      arrowHeight={16}
      arrowWidth={16}
    >
      <View ref={overlayRef} collapsable={true} style={overlayStyle.overlay}>
        {props.children}
      </View>
    </PopperProvider>
  );
};

export default Popper;
