import React from 'react';
import { StyledSvg } from '../StyledSvg';
import { Path, Polyline } from 'react-native-svg';
const Icon = (props: any) => {
  return (
    <StyledSvg {...props}>
      <Path d="M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
      <Polyline points="14 2 14 8 20 8" />
      <Path d="M2.97 13.12c-.6.36-.97 1.02-.97 1.74v3.28c0 .72.37 1.38.97 1.74l3 1.83c.63.39 1.43.39 2.06 0l3-1.83c.6-.36.97-1.02.97-1.74v-3.28c0-.72-.37-1.38-.97-1.74l-3-1.83a1.97 1.97 0 0 0-2.06 0l-3 1.83Z" />
      <Path d="m7 17-4.74-2.85" />
      <Path d="m7 17 4.74-2.85" />
      <Path d="M7 17v5" />
    </StyledSvg>
  );
};
Icon.displayName = 'FileBox';
export const FileBox = React.memo(Icon);
