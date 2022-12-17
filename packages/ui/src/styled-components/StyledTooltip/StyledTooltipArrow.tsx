import { styled } from '@gluestack/ui-styled';
import { Popper } from '@gluestack/popper';
// import { View } from 'react-native';

export default styled(
  Popper.Arrow,
  {
    baseStyle: {
      style: {
        // @ts-ignore
        fontSize: 'sm',
        color: `text50`,
        borderColor: 'blue',
      },
    },
  },
  {
    // ancestorStyle: ['_text']
  }
);
