import { Text } from '@gluestack/ui';
import React from 'react';

export const Example = ({ ...props }) => {
  return (
    <Text
      sx={{
        style: {
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
        },
      }}
    >
      {props.text}
    </Text>
  );
};
