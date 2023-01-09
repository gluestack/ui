import React from 'react';
import { Box, Button, HStack, Image, Text } from '@gluestack/ui';
const iphoneImage = require('./iphone.png');

const Third = () => {
  return (
    <Box px="$32">
      <Box alignItems="center" mb="72px">
        {/* bordserRadius */}
        <Button bg="#4169E0" px="$6" py="$2" borderRadius="100px" mb="$3">
          <Button.Text color="$white" fontWeight="$bold" fontSize="$full">
            OUR SERVICE
          </Button.Text>
        </Button>
        <Text fontWeight="$bold" fontSize="$5xl">
          Available on{' '}
          <Text color="#4169E0" fontWeight="$bold" fontSize="$5xl">
            Web & Phone
          </Text>{' '}
          App
        </Text>
      </Box>
      <HStack space="lg" mb={100}>
        {/*  */}
        <HStack
          bg="#4169E0"
          borderRadius="$2xl"
          flex="1"
          mr="$16"
          pr="$10"
          space="2xl"
          style={{
            boxShadow: '5px 10px 54px -30px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Box pt="$7" pl="$10" width="50%" mr="$12">
            <Text fontWeight="bold" fontSize="$2xl" color="$white" mb="$4">
              I’m Employer
            </Text>
            <Text fontWeight="normal" fontSize="$lg" color="$white" mb="$3">
              Let’s start your new way of trading. You will learn anything from
              zero with us. connect with.
            </Text>
            <Text fontWeight="normal" fontSize="$sm" color="$white" mb="$8">
              Web App Available. Mobile App coming soon.
            </Text>
            <Button bg="$white">
              <Button.Text fontWeight="$semibold" fontSize="$md" color="$black">
                Register
              </Button.Text>
            </Button>
          </Box>

          <Image
            source={iphoneImage}
            width={206}
            height={353}
            mt={-30}
            mb={0}
          />
        </HStack>
        {/*  */}
        <HStack
          //   bg="#4169E0"
          borderWidth={1}
          borderColor="$coolGray100"
          borderRadius="$2xl"
          flex="1"
          mr="$16"
          pr="$10"
          space="2xl"
          //   style={{
          //     boxShadow: '3px 44px 54px -50px rgba(0, 0, 0, 0.3)',
          //   }}
        >
          <Box pt="$7" pl="$10" width="50%" mr="$12">
            <Text fontWeight="bold" fontSize="$2xl" color="$black" mb="$4">
              I’m Employer
            </Text>
            <Text fontWeight="normal" fontSize="$lg" color="#707070" mb="$3">
              Let’s start your new way of trading. You will learn anything from
              zero with us. connect with.
            </Text>
            <Text fontWeight="normal" fontSize="$sm" color="#707070" mb="$8">
              Web App Available. Mobile App coming soon.
            </Text>
            <Button bg="$blue600">
              <Button.Text fontWeight="$semibold" fontSize="$md" color="$white">
                Register
              </Button.Text>
            </Button>
          </Box>

          <Image
            source={iphoneImage}
            width={206}
            height={353}
            mt={-30}
            mb={0}
          />
        </HStack>
        {/*  */}
      </HStack>
    </Box>
  );
};

export default Third;
