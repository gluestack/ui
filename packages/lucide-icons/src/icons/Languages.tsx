import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="m5 8 6 6" />
      <Path d="m4 14 6-6 2-3" />
      <Path d="M2 5h12" />
      <Path d="M7 2h1" />
      <Path d="m22 22-5-10-5 10" />
      <Path d="M14 18h6" />
    </StyledSvg>
  );
};
Icon.displayName = 'Languages';
export const Languages = React.memo(Icon);
