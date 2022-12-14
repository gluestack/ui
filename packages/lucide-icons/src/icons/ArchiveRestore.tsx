import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path, Rect } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Rect x="2" y="4" width="20" height="5" rx="2" />
      <Path d="M12 13v7" />
      <Path d="m9 16 3-3 3 3" />
      <Path d="M4 9v9a2 2 0 0 0 2 2h2" />
      <Path d="M20 9v9a2 2 0 0 1-2 2h-2" />
    </StyledSvg>
  );
};
Icon.displayName = 'ArchiveRestore';
export const ArchiveRestore = React.memo(Icon);
