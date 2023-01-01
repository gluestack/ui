import { Text, Center } from '@gluestack/ui';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import Wrapper from '../Wrapper';
type TextStory = ComponentStory<typeof Text>;

export const PlayGround: TextStory = ({
  size,
  fontStyle,
  fontWeight,
  text,
  letterSpacing,
  lineHeight,
  textAlign,
  textDecorationLine,
  textTransform,
  textShadowColor,
  textShadowOffset,
  textShadowRadius,
  ...props
}) => {
  return (
    <Center>
      <Text
        sx={{
          style: {
            fontSize: `$${size}`,
            fontStyle: `${fontStyle}`,
            fontWeight: `${fontWeight}`,
            letterSpacing: letterSpacing,
            lineHeight: `${lineHeight}`,
            textAlign: `${textAlign}`,
            textDecorationLine: `${textDecorationLine}`,
            textTransform: `${textTransform}`,
            textShadowColor: `${textShadowColor}`,
            textShadowOffset: textShadowOffset,
            textShadowRadius: textShadowRadius,
            width: '100%',
          },
        }}
        {...props}
      >
        {text}
      </Text>
    </Center>
  );
};
