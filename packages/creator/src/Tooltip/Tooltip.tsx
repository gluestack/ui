import React, { forwardRef } from 'react';
import { useControllableState, useKeyboardDismissable } from '../hooks';
import { PresenceTransition } from '../Transitions';
import { StyleSheet } from 'react-native';
import { Overlay } from '../Overlay';

const Tooltip = (StyledTooltip: any) =>
  forwardRef(
    ({
      triggerRef,
      children,
      onClose,
      onOpen,
      defaultIsOpen,
      placement = 'bottom',
      offset,
      hasArrow = true,
      isOpen: isOpenProp,
    }: any) => {
      if (hasArrow && offset === undefined) {
        offset = 0;
      } else {
        offset = 6;
      }
      const [isOpen, setIsOpen] = useControllableState({
        value: isOpenProp,
        defaultValue: defaultIsOpen,
        onChange: (value) => {
          value ? onOpen && onOpen() : onClose && onClose();
        },
      });

      useKeyboardDismissable({
        enabled: isOpen,
        callback: () => setIsOpen(false),
      });

      return (
        <Overlay isOpen={isOpen} useRNModalOnAndroid unmountOnExit>
          <PresenceTransition visible={isOpen} style={StyleSheet.absoluteFill}>
            <StyledTooltip triggerRef={triggerRef} placement={placement}>
              {children}
            </StyledTooltip>
          </PresenceTransition>
        </Overlay>
      );
    }
  );

export { Tooltip };
