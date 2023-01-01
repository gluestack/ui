import { Text } from '@gluestack/ui';
import { ComponentStory } from '@storybook/react-native';
import Wrapper from '../Wrapper';
type OverriddenStory = ComponentStory<typeof Text>;

export const Overridden: OverriddenStory = ({ size, ...props }) => {
  const textDecorationLines = [
    'none',
    'underline',
    'line-through',
    'underline line-through',
  ];

  return (
    <Wrapper>
      <Text
        sx={{
          style: {
            fontStyle: 'italic',
          },
        }}
      >
        Italic
      </Text>
      <Text
        sx={{
          style: {
            fontWeight: 'bold',
          },
        }}
      >
        bold
      </Text>
      {textDecorationLines.map((textDecorationLine: any) => (
        <Text sx={{ style: { textDecorationLine: `${textDecorationLine}` } }}>
          {textDecorationLine}
        </Text>
      ))}
    </Wrapper>
  );
};
