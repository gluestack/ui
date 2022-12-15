import { View } from 'react-native';
import { styled } from '@gluestack/ui-styled';
export default styled(
  View,
  {
    baseStyle: {
      style: {
        w: '100%',
        h: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bg: '$primary.500',
      },
      state: {
        checked: {
          state: {
            hover: {
              style: { bg: '$primary.600' },
            },
          },
        },
      },
    },
  },
  {}
);