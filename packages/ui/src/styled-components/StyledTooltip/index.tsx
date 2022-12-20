import { styled } from '@gluestack/ui-styled';
import { View } from 'react-native';

export default styled(
  View,
  {
    baseStyle: {
      style: {
        py: '$1',
        px: '$2',
        rounded: 'sm',
        bg: `$muted800`,
      },
    },
  },
  {}
);
