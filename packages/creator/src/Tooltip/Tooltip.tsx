import React, { forwardRef } from 'react';
import { useControllableState, useKeyboardDismissable } from '../hooks';
import { PresenceTransition } from '../Transitions';
import { StyleSheet } from 'react-native';
import { OverlayContainer } from '@react-native-aria/overlays';
import { useFloating, offset, flip, shift } from '@floating-ui/react';
import { PopperProvider } from '../Popper/PopperContext';

const Tooltip = (StyledTooltip: any) =>
  forwardRef(
    (
      {
        children,
        placement = 'bottom',
        onOpen,
        onClose,
        isOpen: isOpenProp,
        defaultIsOpen = false,
        trigger,
        ...props
      }: any,
      ref: any
    ) => {
      const [isOpen, setIsOpen] = useControllableState({
        value: isOpenProp,
        defaultValue: defaultIsOpen,
        onChange: (value) => {
          value ? onOpen && onOpen() : onClose && onClose();
        },
      });

      const handleOpen = React.useCallback(() => {
        setIsOpen(true);
      }, [setIsOpen]);

      const handleClose = React.useCallback(() => {
        setIsOpen(false);
      }, [setIsOpen]);

      const updatedTrigger = (reference: any) => {
        return trigger(
          {
            ref: reference,
            onHoverIn: handleOpen,
            onHoverOut: handleClose,
          },
          { open: isOpen }
        );
      };

      const { x, y, reference, floating, strategy } = useFloating({
        placement: placement,
        middleware: [offset(10), flip(), shift()],
      });

      useKeyboardDismissable({
        enabled: isOpen,
        callback: () => setIsOpen(false),
      });

      return (
        <>
          {updatedTrigger(reference)}
          <OverlayContainer>
            <PresenceTransition
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 150 } }}
              exit={{ opacity: 0, transition: { duration: 100 } }}
              visible={isOpen}
              style={StyleSheet.absoluteFill}
            >
              <StyledTooltip {...props} ref={ref}>
                <PopperProvider
                  value={{
                    x: x,
                    y: y,
                    strategy: strategy,
                    floating: floating,
                    handleClose: handleClose,
                  }}
                >
                  {children}
                </PopperProvider>
              </StyledTooltip>
            </PresenceTransition>
          </OverlayContainer>
        </>
      );
    }
  );

export { Tooltip };
