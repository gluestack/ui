import { Pressable } from 'react-native';
import { styled } from '@gluestack/ui-styled';

export default styled(
  Pressable,
  {
    baseStyle: {
      style: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
        p: '$2',
        // @ts-ignore
        bg: 'transparent',
        rounded: '$sm',
      },
      state: {
        hover: {
          style: {
            bg: '$muted200',
          },
        },
        active: {
          style: {
            bg: '$muted300',
          },
        },
        focusVisible: {
          style: {
            bg: '$muted400',
          },
        },
      },
      platform: {
        web: {
          style: {
            // @ts-ignore
            outlineWidth: 0,
          },
        },
      },
    },
  },
  {}
);
