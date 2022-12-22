import {
  Stagger,
  HamburgerIcon,
  AddIcon,
  HStack,
  Button,
  Center,
} from '@gluestack/ui';

import React, { useState } from 'react';
/* eslint-disable no-console */
export const Example = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <>
      <Stagger
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
          translateY: 34,
        }}
        animate={{
          translateY: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            mass: 0.8,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
        exit={{
          translateY: 34,
          scale: 0.5,
          opacity: 0,
          transition: {
            duration: 100,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
      >
        <Center>
          <Button
            sx={{
              style: {
                mb: '$4',
                borderRadius: 999,
                bg: '$indigo500',
              },
            }}
          >
            <HamburgerIcon sx={{ style: { w: 20, h: 20 } }} />
          </Button>
          <Button
            sx={{
              style: {
                mb: '$4',
                borderRadius: 999,
                bg: '$yellow500',
              },
            }}
          >
            <AddIcon sx={{ style: { w: 20, h: 20 } }} />
          </Button>
          <Button
            sx={{
              style: {
                mb: '$4',
                borderRadius: 999,
                bg: '$info500',
              },
            }}
          >
            <HamburgerIcon sx={{ style: { w: 20, h: 20 } }} />
          </Button>
          <Button
            sx={{
              style: {
                mb: '$4',
                borderRadius: 999,
                bg: '$warning500',
              },
            }}
          >
            <HamburgerIcon sx={{ style: { w: 20, h: 20 } }} />
          </Button>
        </Center>
      </Stagger>
      <Center>
        <Button
          onPress={() => setIsOpen(!isOpen)}
          sx={{
            style: {
              borderRadius: 999,
            },
            size: 'lg',
          }}
        >
          <Button.Text>Click</Button.Text>
        </Button>
      </Center>
    </>
  );
};
