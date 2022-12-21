import { FormControl, Input, WarningIcon, Center } from '@gluestack/ui';
import React from 'react';

export const Example = () => {
  return (
    <>
      <FormControl isInvalid={true} isRequired={true}>
        {/* Label Message */}
        <FormControl.Label>
          <FormControl.Label.Text>Enter Your name</FormControl.Label.Text>
        </FormControl.Label>

        <Input.Root>
          <Input />
        </Input.Root>

        {/* Helper Text */}
        <FormControl.Helper>
          <FormControl.Helper.Text>
            Must be atleast 6 characters.
          </FormControl.Helper.Text>
        </FormControl.Helper>

        {/* Error Message */}
        <FormControl.Error>
          <FormControl.Error.Icon>
            <WarningIcon
              sx={{ style: { color: '$red500', height: '$3', width: '$3' } }}
            />
          </FormControl.Error.Icon>
          <FormControl.Error.Text>
            Atleast 6 characters are required.
          </FormControl.Error.Text>
        </FormControl.Error>
      </FormControl>
    </>
  );
};

// <FormControl isRequired>
//   <Stack mx="4">
//     <FormControl.Label>Password</FormControl.Label>
//     <Input type="password" defaultValue="12345" placeholder="password" />
//     <FormControl.HelperText>
//       Must be atleast 6 characters.
//     </FormControl.HelperText>
//     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//       Atleast 6 characters are required.
//     </FormControl.ErrorMessage>
//   </Stack>
// </FormControl>;
