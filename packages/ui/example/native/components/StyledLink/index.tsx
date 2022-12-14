import { styled } from '@gluestack/styled';
import { Pressable } from 'react-native';

export default styled(
  Pressable,
  {
    baseStyle: {
      style: {
        backgroundColor: '$primary.500',
      },
    },
  },
  {}
);