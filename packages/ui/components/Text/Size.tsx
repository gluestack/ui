import { Text, Center } from '@gluestack/ui';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import Wrapper from '../Wrapper';
type SizeTextStory = ComponentStory<typeof Text>;

export const Sizes: SizeTextStory = ({ size, ...props }) => {
  const sizes = [
    'xs',
    'sm',
    'md',
    'xl',
    'lg',
    '3xl',
    '2xl',
    '4xl',
    '5xl',
    '6xl',
  ];
  return (
    <Wrapper>
      {sizes.map((size: any) => (
        <Text sx={{ style: { fontSize: `$${size}` } }}>{size}</Text>
      ))}
    </Wrapper>
  );
};
