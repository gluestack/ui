import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { RadioGroup } from './RadioGroup';

const MyRadioMeta: ComponentMeta<typeof RadioGroup> = {
  title: 'Radio',
  component: RadioGroup,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
  args: {
    size: 'md',
  },
};

export default MyRadioMeta;

// type MyRadioStory = ComponentStory<typeof MyRadio>;
type RadioGroupStory = ComponentStory<typeof RadioGroup>;

export const RadioGroupExample: RadioGroupStory = (args) => (
  <RadioGroup {...args} />
);
