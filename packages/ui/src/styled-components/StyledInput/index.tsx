import { styled } from '@gluestack/ui-styled';
import { TextInput } from 'react-native';

export default styled(
  TextInput,
  {
    baseStyle: {
      style: {
        px: '$4',
        py: '$3',
        color: '$darkText',
      },

      state: {
        focus: {
          style: {
            outlineColor: '$primary600',
          },
        },
      },
    },
  },
  { ancestorStyle: ['_input'] }
);
