import { styled } from '@gluestack/ui-styled';
import { View } from 'react-native';

export default styled(
  View,
  {
    baseStyle: {
      style: {
        height: '$1',
        width: '$10',
        bg: '$muted500',
        rounded: '$full',
      },
    },
  },
  {}
);
