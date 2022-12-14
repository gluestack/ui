import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Circle as _Circle, Path } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M4 11a9 9 0 0 1 9 9" />
      <Path d="M4 4a16 16 0 0 1 16 16" />
      <_Circle cx="5" cy="19" r="1" />
    </StyledSvg>
  );
};
Icon.displayName = 'Rss';
export const Rss = React.memo(Icon);
