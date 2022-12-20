import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PopoverComponent } from './Popover';

const PopoverMeta: ComponentMeta<typeof PopoverComponent> = {
  title: 'Popover',
  component: PopoverComponent,
  argTypes: {},
  args: {},
};

export default PopoverMeta;

type PopoverStory = ComponentStory<typeof PopoverComponent>;

export const Basic: PopoverStory = () => <PopoverComponent />;
