import React from 'react';
import { Box, Button, HStack, LinearGradient, Text } from '@gluestack/ui';
import { MobileImage } from '../images';
import Header from './Header';

function Hero() {
  return (
    <HStack>
      <Box px="$32" flex="1">
        <Header />
        <Box flex="1" justifyContent="center">
          <Text fontSize="$6xl" fontWeight="$semibold">
            The Platform for
          </Text>
          <Text fontSize="$6xl" fontWeight="$semibold" color="#4169E0">
            Modern{' '}
            <Text fontSize="$6xl" fontWeight="$semibold">
              Recruiting
            </Text>
          </Text>
          <Text
            fontSize="$lg"
            fontWieght="$normal"
            lineHeight="$xl"
            color="#707070"
            mb="$16"
          >
            The platform enabling teams to find, source, and automatically
            nurture talent.Laborum nisi nulla mollit proident enim sit dolor.
          </Text>
          <HStack>
            <Button variant="outline" px="$8" py="$3">
              <Button.Text color="$black" fontSize="$md" fontWeight="$semibold">
                Contact Sales
              </Button.Text>
            </Button>
          </HStack>
        </Box>
      </Box>
      {/* right */}
      <LinearGradient
        colors={['#4169E0', '#0091D8']}
        borderBottomLeftRadius="56px"
      >
        <Box pt="$6">
          <HStack justifyContent="flex-end" pr="$32" mb="$10">
            <Button bg="$white">
              <Button.Text color="$darkText">Login/Register</Button.Text>
            </Button>
          </HStack>
          <MobileImage />
        </Box>
      </LinearGradient>
    </HStack>
  );
}

export default Hero;
