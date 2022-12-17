import React from 'react';
import { Tooltip, Text, Box, Button } from '@gluestack/ui';
import Wrapper from '../Wrapper';

export const Example = ({ ...props }) => {
  const targetRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Wrapper>
      <Button
        ref={targetRef}
        onHoverIn={() => {
          setIsOpen(true);
        }}
        onHoverOut={() => {
          setIsOpen(false);
        }}
        sx={{ style: { bg: '$red500' } }}
      >
        <Text sx={{ style: { bg: '$red500' } }}>hello</Text>
      </Button>
      <Tooltip isOpen={isOpen} triggerRef={targetRef}>
        <Tooltip.Arrow />
        <Tooltip.Content sx={{ style: { bg: '$red500' } }}>
          <Box>
            <Text>dhhd</Text>
          </Box>
        </Tooltip.Content>
      </Tooltip>
    </Wrapper>
  );
};
