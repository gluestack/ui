import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Example as BasicExample } from './Link';

const MyLinkMeta: ComponentMeta<typeof BasicExample> = {
  title: 'Link',
  component: BasicExample,
  argTypes: {
    isExternal: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    text: 'Click here',
    isExternal: false,
  },
};

export default MyLinkMeta;

type MyCustomLinkStory = ComponentStory<typeof BasicExample>;

export const Basic: MyCustomLinkStory = (args) => <BasicExample {...args} />;
