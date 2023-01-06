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
        color: '$white',
      },
      state: {
        checked: {
          state: {
            hover: {
              style: { color: '$white' },
            },
          },
        },
        disabled: {
          style: { opacity: 0.6 },
        },
      },
    },
  },
  {}
);
