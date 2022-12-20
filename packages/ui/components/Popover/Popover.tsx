import React from 'react';
import { Popover, Center, Button, Text, CloseIcon } from '@gluestack/ui';
import Wrapper from '../Wrapper';

export const PopoverComponent = () => {
  // return <div>Hello</div>;
  return (
    <Wrapper>
      <Popover
        placement="right"
        trigger={(triggerProps: any) => {
          return (
            <Center>
              <Button {...triggerProps}>
                <Button.Text>Delete Customer</Button.Text>
              </Button>
            </Center>
          );
        }}
      >
        <Popover.Backdrop />
        <Popover.Content>
          <Popover.Arrow />
          <Popover.CloseButton>
            <CloseIcon />
          </Popover.CloseButton>
          <Popover.Header>
            <Text variant="ModalHeader">Delete Customer</Text>
          </Popover.Header>
          <Popover.Body>
            <Text>
              This will remove all data relating to Alex. This action cannot be
              reversed. Deleted data can not be recovered.
            </Text>
          </Popover.Body>
          <Popover.Footer>
            <Button variant="outline">Cancel</Button>
            <Button variant="solid">Delete</Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Wrapper>
  );
};
