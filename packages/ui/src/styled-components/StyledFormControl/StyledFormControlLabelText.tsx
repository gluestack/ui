import { styled } from '@gluestack/ui-styled';
import { Text } from 'react-native';

export default styled(
  Text,
  {
    baseStyle: {
      style: {
        //@ts-ignore
        fontSize: '$sm',
        //@ts-ignore
        fontWeight: '$medium',
        color: '$text500',
      },
      colorMode: {
        style: {
          color: '$text400',
        },
      },
    },
  },
  {}
);
