import { styled } from '@gluestack/ui-styled';
import { Pressable } from 'react-native';

export default styled(
  Pressable,
  {
    baseStyle: {
      style: {
        justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        bg: '$amber400',
        // p: '$4',
      },
    },
  },
  {}
);