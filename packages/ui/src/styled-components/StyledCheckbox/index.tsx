import { Pressable } from 'react-native';
import { styled } from '@gluestack/ui-styled';

export default styled(
  Pressable,
  {
    baseStyle: {
      style: {
        p: 8,
        // bg: '$blue900',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // @ts-ignore
      },
    },
  },
  {}
);
