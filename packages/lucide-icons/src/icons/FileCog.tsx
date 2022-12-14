import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Circle as _Circle, Path, Polyline } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M4 6V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" />
      <Polyline points="14 2 14 8 20 8" />
      <_Circle cx="6" cy="14" r="3" />
      <Path d="M6 10v1" />
      <Path d="M6 17v1" />
      <Path d="M10 14H9" />
      <Path d="M3 14H2" />
      <Path d="m9 11-.88.88" />
      <Path d="M3.88 16.12 3 17" />
      <Path d="m9 17-.88-.88" />
      <Path d="M3.88 11.88 3 11" />
    </StyledSvg>
  );
};
Icon.displayName = 'FileCog';
export const FileCog = React.memo(Icon);
