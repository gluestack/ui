import { styled } from '@gluestack/ui-styled';
import { View } from 'react-native';

export default styled(
  View,
  {
    baseStyle: {
      style: {
        position: 'absolute',
        borderRadius: 9999,
        zIndex: -1,
      },

      descendants: {},
    },
  },
  {}
);
