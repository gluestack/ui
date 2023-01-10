import React from 'react';
import { Box, HStack, Text, Button } from '@gluestack/ui';

function Navbar() {
  return (
    <Box>
      <HStack
        alignItems="center"
        h="16"
        justifyContent="space-between"
        maxWidth="1152"
        width="100%"
        bg="$black"
        px="$32"
        py="$3"
      >
        <Text color="$white" fontSize="$xl" fontWeight="$semibold">
          {/* fontSize="32" is not working */}
          UnoJob becomes the fastest growing platform for Modern Recruiting
        </Text>
        {/* add code for text linear gradient */}
        <Button variant="unstyled">
          <Text color="$white" fontSize="$md" mr="$2">
            Read More
          </Text>
          <svg
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.941693 12.279C0.815026 12.279 0.688359 12.2324 0.588359 12.1324C0.395026 11.939 0.395026 11.619 0.588359 11.4257L4.93503 7.07904C5.25503 6.75904 5.25503 6.23904 4.93503 5.91904L0.588359 1.57237C0.395026 1.37904 0.395026 1.05904 0.588359 0.865703C0.781693 0.67237 1.10169 0.67237 1.29503 0.865703L5.64169 5.21237C5.98169 5.55237 6.17503 6.01237 6.17503 6.49904C6.17503 6.9857 5.98836 7.4457 5.64169 7.7857L1.29503 12.1324C1.19503 12.2257 1.06836 12.279 0.941693 12.279Z"
              fill="white"
            />
          </svg>
        </Button>
      </HStack>
    </Box>
  );
}

export default Navbar;
