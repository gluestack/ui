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
    isInvalid: {
      type: 'boolean',
    },
    isDisabled: {
      type: 'boolean',
    },
    isReadOnly: {
      type: 'boolean',
    },
  },
  args: {
    size: 'md',
    isInvalid: false,
    isDisabled: false,
    isReadOnly: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Radio** limits the selection from a series of options to only one.',
      },
    },
  },
};

export default MyRadioMeta;

// type MyRadioStory = ComponentStory<typeof MyRadio>;
type RadioGroupStory = ComponentStory<typeof RadioGroup>;

export const RadioGroupExample: RadioGroupStory = (args) => (
  <RadioGroup {...args} />
);
