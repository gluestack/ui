import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path, Rect } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Rect x="5" y="14" width="14" height="6" rx="2" />
      <Rect x="7" y="4" width="10" height="6" rx="2" />
      <Path d="M2 20h20" />
      <Path d="M2 10h20" />
    </StyledSvg>
  );
};
Icon.displayName = 'AlignVerticalDistributeEnd';
export const AlignVerticalDistributeEnd = React.memo(Icon);
