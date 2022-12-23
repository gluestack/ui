import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Spinner, Box } from '@gluestack/ui';

const SpinnerMeta: ComponentMeta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
  argTypes: {},
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          '**Spinners** gives visual cues to actions that are processing or awaiting a course change or results.',
      },
    },
  },
};

export default SpinnerMeta;

type SpinnerStory = ComponentStory<typeof Spinner>;

export const Basic: SpinnerStory = ({ ...props }) => {
  return (
    <Box>
      <Spinner color="$primary500" />
    </Box>
  );
};
