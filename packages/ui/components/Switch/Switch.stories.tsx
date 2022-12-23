import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import React, { useState } from 'react';
import { Switch, Center } from '@gluestack/ui';
import Wrapper from '../Wrapper';

const SwitchMeta: ComponentMeta<typeof Switch> = {
  title: 'Switch',
  component: Switch,
  argTypes: {
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
    isEnabled: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: {
    isDisabled: false,
    isEnabled: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'The **Switch** provides an alternative to the Checkbox component. It also allows a user to switch between enabled or disabled states.',
      },
    },
  },
};

export default SwitchMeta;

type Switch = ComponentStory<typeof Switch>;

export const Basic: Switch = ({
  isDisabled,
  isEnabled: isEnabledProp,
  ...props
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  React.useEffect(() => {
    if (!isDisabled) setIsEnabled(isEnabledProp);
  }, [isEnabledProp]);
  return (
    <Wrapper>
      <Center sx={{ style: { flex: 1 } }}>
        <Switch
          value={isEnabled}
          onValueChange={(val) => setIsEnabled(val)}
          isDisabled={isDisabled}
        />
      </Center>
    </Wrapper>
  );
};
