import { Text } from 'react-native';
import { styled } from '@gluestack/ui-styled';

export default styled(
  Text,
  {
    baseStyle: {
      style: { color: '$text800' },
      state: {
        hover: {
          style: {
            bg: '$amber100',
          },
        },
      },
    },
    sizes: {
      xs: {
        style: {
          h: '$1/3',
        },
      },
    },
    variants: {
      primary: {
        style: {
          bg: '$red100',
        },
      },
      secondary: {
        style: {
          backgroundColor: '$amber100',
        },
        colorMode: {
          light: {
            style: {
              fontFamily: '$body',
            },
          },
        },
      },
    },
  },
  { ancestorStyle: ['_text'] }
);
