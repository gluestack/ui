import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Text, Center } from '@gluestack/ui';
import Wrapper from '../Wrapper';

const TextMeta: ComponentMeta<typeof Text> = {
  title: 'TYPOGRAPHY/Text',
  component: Text,
  argTypes: {
    size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
      ],
      description: 'The size of font',
      defaultValue: 'md',
    },
    fontStyle: {
      control: 'select',
      options: ['normal', 'italic'],
      description: 'Font Style',
      defaultValue: 'normal',
    },
    fontWeight: {
      control: 'select',
      options: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'normal',
        'bold',
      ],
      description: 'Font weight',
      defaultValue: 'normal',
    },
    textAlign: {
      control: 'select',
      options: ['auto', 'left', 'right', 'center', 'justify'],
      description: 'Text align',
      defaultValue: 'auto',
    },
    textDecorationLine: {
      control: 'select',
      options: ['none', 'underline', 'line-through', 'underline line-through'],
    },
    textTransform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
    },
  },
  args: {
    text: 'Hello world',
    size: 'md',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 0,
    textAlign: 'auto',
    textDecorationLine: 'none',
    textTransform: 'none',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Text** allows the rendering of text and paragraphs within an interface.',
      },
    },
  },
};

export default TextMeta;
import { PlayGround } from './PlayGround';
import { Sizes } from './Size';
import { Overridden } from './Overridden';

export { PlayGround, Sizes, Overridden };
