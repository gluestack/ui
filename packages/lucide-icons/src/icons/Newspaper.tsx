import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <Path d="M18 14h-8" />
      <Path d="M15 18h-5" />
      <Path d="M10 6h8v4h-8V6Z" />
    </StyledSvg>
  );
};
Icon.displayName = 'Newspaper';
export const Newspaper = React.memo(Icon);
