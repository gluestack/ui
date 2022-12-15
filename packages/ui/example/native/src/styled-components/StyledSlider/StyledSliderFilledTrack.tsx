import { styled } from '@gluestack/ui-styled';
import { View } from 'react-native';

export default styled(
  View,
  {
    baseStyle: {
      style: { bg: '$primary.500', h: '100%' },

      descendants: {},
    },
  },
  {}
);