import { Pressable, Image } from '@gluestack/ui';
import React from 'react';

import Wrapper from '../Wrapper';

export const Example = ({ ...props }) => {
  return (
    <Wrapper>
      <Pressable
        onPress={() => console.log('Hello')}
        sx={{ style: { bg: 'red.500', p: 12 } }}
      >
        <Image
          sx={{
            style: {
              w: 100,
              h: 100,
              borderRadius: 9999,
              borderColor: '$green.500',
              borderWidth: 4,
            },
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        />
      </Pressable>
    </Wrapper>
  );
};