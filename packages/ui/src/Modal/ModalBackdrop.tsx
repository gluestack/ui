import React, { forwardRef } from 'react';
import { Fade } from '../Transitions';
import { UIContext } from '../UIProvider';
import { ModalContext } from './Context';
import { StyleSheet } from 'react-native';

const ModalHeader = ({ children, ...props }: any, ref: any) => {
  const { StyledModalBackdrop } = React.useContext(UIContext);
  const { visible } = React.useContext(ModalContext);
  return (
    <Fade in={visible} style={StyleSheet.absoluteFill}>
      <StyledModalBackdrop ref={ref} {...props}>
        {children}
      </StyledModalBackdrop>
    </Fade>
  );
};

export default forwardRef(ModalHeader);