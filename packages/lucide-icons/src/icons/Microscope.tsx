import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M6 18h8" />
      <Path d="M3 22h18" />
      <Path d="M14 22a7 7 0 1 0 0-14h-1" />
      <Path d="M9 14h2" />
      <Path d="M8 6h4" />
      <Path d="M13 10V6.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V10c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2Z" />
    </StyledSvg>
  );
};
Icon.displayName = 'Microscope';
export const Microscope = React.memo(Icon);
