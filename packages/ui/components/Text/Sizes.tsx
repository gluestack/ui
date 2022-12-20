import React from 'react';
import { Text, VStack } from '@gluestack/ui';

export const Example = ({ sizes, ...props }: any) => {
  return (
    <VStack>
      {sizes.map((size: any) => (
        <Text sx={{ style: { fontSize: size, fontWeight: props.fontWeight } }}>
          {size}
        </Text>
      ))}
    </VStack>
  );
};
