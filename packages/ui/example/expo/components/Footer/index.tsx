import React from 'react';
import { Box, HStack, Text, VStack, Divider, Image } from '@gluestack/ui';
import { TwitterIcon } from './icons';

const data = [
  {
    name: 'CANDIDATES',
    list: [
      {
        name: 'FAQ’s',
        link: '',
      },
      {
        name: 'Login',
        link: '',
      },
    ],
  },
  {
    name: 'EMPLOYERS',
    list: [
      {
        name: 'FAQ’s',
        link: '',
      },
      {
        name: 'Login',
        link: '',
      },
    ],
  },
  {
    name: 'ABOUT US',
    list: [
      {
        name: 'Home',
        link: '',
      },
      {
        name: 'Careers',
        link: '',
      },
    ],
  },
  {
    name: 'TALK TO US',
    list: [
      {
        name: '1800-123-2456',
        link: '',
      },
      {
        name: 'employersupport@unojob.in',
        link: '',
      },
      {
        name: 'candidatesupport@unojob.in',
        link: '',
      },
      {
        name: 'sales@hellojob.com',
        link: '',
      },
    ],
  },
  {
    name: 'CITIES',
    list: [
      {
        name: 'Delhi',
        link: '',
      },
      {
        name: 'Mumbai',
        link: '',
      },
      {
        name: 'Chennai',
        link: '',
      },
      {
        name: 'Hyderabad',
        link: '',
      },
    ],
  },
];

const isoImage = require('../../assets/iso.png');
const logo = require('../../assets/Logo_footer.png');
function Footer() {
  return (
    <Box px="$32" bg="#0C1A6B" pt={100}>
      <HStack justifyContent="space-between" pb={100}>
        <Box>
          {/* <Logo /> */}
          <Image source={logo} width={164} height={46} />
          <Text
            mt={30}
            mb="$4"
            fontSize="$sm"
            fontWeight="$semibold"
            color="$textLight300"
          >
            Certified by BSI ISO 27001
          </Text>
          {/* <ISOLogo /> */}
          <Image source={isoImage} width={85.38} height={40} />
        </Box>
        <HStack>
          {data.map((obj, index) => {
            return (
              <Box key={index} mr={70}>
                <Text fontWeight="$bold" fontSize="$md" color="$white" mb="$6">
                  {obj.name}
                </Text>
                <VStack space="md">
                  {obj.list.map((item, index) => (
                    <Text key={item.name + index} color="$textLight300">
                      {item.name}
                    </Text>
                  ))}
                </VStack>
              </Box>
            );
          })}
        </HStack>
      </HStack>
      <Divider opacity={0.2} />
      <HStack justifyContent="space-between" my="$10">
        <HStack space="md" alignItems="center">
          <Text fontSize="$sm" fontWeight="$medium" color="$white">
            © 2022 Unojob. Copyright and All rights reserved
          </Text>
          <Box w="$1" h="$1" borderRadius="$full" bg="$white" />
          <Text fontSize="$sm" fontWeight="$medium" color="$white">
            Term and Conditions
          </Text>
          <Box w="$1" h="$1" borderRadius="$full" bg="$white" />
          <Text fontSize="$sm" fontWeight="$medium" color="$white">
            Privacy Policy
          </Text>
        </HStack>
        <HStack>
          {/* wrap icons with Link */}
          <TwitterIcon />
          <TwitterIcon />
          <TwitterIcon />
          <TwitterIcon />
        </HStack>
      </HStack>
    </Box>
  );
}

export default Footer;
