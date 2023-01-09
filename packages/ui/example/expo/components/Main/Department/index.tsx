import React from 'react';
import { Box, Button, HStack, LinearGradient, Text } from '@gluestack/ui';

function Department() {
  return (
    <Box px="$32">
      <Box alignitems="center">
        <Text fontWeight="$bold" fontSize="$5xl" color="$textDark500" mb="$5">
          Job{' '}
          <Text fontWeight="$bold" fontSize="$5xl" color="$blue500">
            Departments
          </Text>
        </Text>

        <Text fontSize={22} fontWeight="$normal" color="#707070" mb={60}>
          We have jobs available in these departments
        </Text>
      </Box>
    </Box>
  );
}

export default Department;
