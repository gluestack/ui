import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Heading } from '@gluestack/ui';
import Wrapper from '../Wrapper';

const MyHeadingMeta: ComponentMeta<typeof Heading> = {
  title: 'TYPOGRAPHY/Heading',
  component: Heading,
  argTypes: {
    onPress: { action: 'pressed the button' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
  },
  args: {
    text: `Heading `,
    size: 'xs',
  },
};

export default MyHeadingMeta;

type MyHeadingStory = ComponentStory<typeof Heading>;

export const Basic: MyHeadingStory = ({ ...props }) => {
  return (
    <Wrapper>
      <Heading size="xs">{props.text} H6</Heading>
      <Heading size="sm">{props.text} H5</Heading>
      <Heading size="md">{props.text} H4</Heading>
      <Heading size="lg">{props.text} H3</Heading>
      <Heading size="xl">{props.text} H2</Heading>
      <Heading size="2xl">{props.text} H1</Heading>
    </Wrapper>
  );
};
