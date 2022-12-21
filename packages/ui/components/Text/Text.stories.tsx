import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Example as BasicExample } from './Text';
import { Example as SizeExample } from './Sizes';

const MyTextMeta: ComponentMeta<typeof BasicExample> = {
  title: 'Text',
  component: BasicExample,
  argTypes: {
    fontSize: {
      control: {
        type: 'select',
        options: [
          '$xs',
          '$sm',
          '$md',
          '$lg',
          '$xl',
          '$2xl',
          '$3xl',
          '$4xl',
          '$5xl',
          '$6xl',
        ],
      },
    },
    fontWeight: {
      control: {
        type: 'select',
        options: [
          '$hairline',
          '$thin',
          '$light',
          '$normal',
          '$medium',
          '$semibold',
          '$bold',
          '$extrabold',
          '$black',
          '$extraBlack',
        ],
      },
    },
  },
  args: {
    text: 'Hello world',
    fontSize: '$md',
    fontWeight: '$medium',
    sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
  },
};

export default MyTextMeta;

type MyCustomTextStory = ComponentStory<typeof BasicExample>;
type MySizeTextStory = ComponentStory<typeof SizeExample>;

export const Basic: MyCustomTextStory = (args) => <BasicExample {...args} />;

export const Sizes: MySizeTextStory = (args) => <SizeExample {...args} />;
