import React from 'react';
import { Box, HStack, Text } from '@gluestack/ui';
import { CompanyIcon } from './images';

function Second() {
  return (
    <Box px="$32" mb="$16" mt={60}>
      <Text fontWeight="$semibold" fontSize="$2xl" color="$black" mb="$6">
        Trusted by Great Company
      </Text>
      <HStack>
        <CompanyIcon />
        <CompanyIcon />
        <CompanyIcon />
        <CompanyIcon />
        <CompanyIcon />
      </HStack>
    </Box>
  );
}

export default Second;
