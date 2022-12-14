import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M9 18h6" />
      <Path d="M10 22h4" />
      <Path d="m2 2 20 20" />
      <Path d="M9 2.804A6 6 0 0 1 18 8a4.65 4.65 0 0 1-1.03 3" />
      <Path d="M8.91 14a4.61 4.61 0 0 0-1.41-2.5C6.23 10.23 6 9 6 8a6 6 0 0 1 .084-1" />
    </StyledSvg>
  );
};
Icon.displayName = 'LightbulbOff';
export const LightbulbOff = React.memo(Icon);
