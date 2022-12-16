import { styled } from '@gluestack/ui-styled';
import { View } from 'react-native';

export const StyledProgress = styled(
  View,
  {
    baseStyle: {
      style: {
        bg: '$primary100',
        h: '$4',
        borderRadius: 999,
      },
    },
  },
  {}
);