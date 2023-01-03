import { View } from 'react-native';
import { styled } from '@gluestack/ui-styled';

export default styled(
  View,
  {
    baseStyle: {
      style: {
        fontSize: '$xs',
        textTransform: 'uppercase',
        color: '$text500',
      },
      colorMode: {
        dark: {
          style: {
            color: '$text400',
          },
        },
      },
    },
  },
  {}
);
