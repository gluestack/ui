import React from 'react';
import { Button } from '@gluestack/ui';

export const Example = ({ ...props }) => {
  return (
    <Button sx={{ style: { bg: '$red500' } }} {...props} isDisabled={true}>
      <Button.Text>Hello</Button.Text>
    </Button>
  );
};
