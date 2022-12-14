import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M10.083 9A6.002 6.002 0 0 1 16 4a4.243 4.243 0 0 0 6 6c0 2.22-1.206 4.16-3 5.197" />
      <Path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" />
      <Path d="M11 20v2" />
      <Path d="M7 19v2" />
    </StyledSvg>
  );
};
Icon.displayName = 'CloudMoonRain';
export const CloudMoonRain = React.memo(Icon);
