import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <Path d="M8 19v1" />
      <Path d="M8 14v1" />
      <Path d="M16 19v1" />
      <Path d="M16 14v1" />
      <Path d="M12 21v1" />
      <Path d="M12 16v1" />
    </StyledSvg>
  );
};
Icon.displayName = 'CloudDrizzle';
export const CloudDrizzle = React.memo(Icon);
