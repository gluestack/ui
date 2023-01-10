import React from 'react';
import { Avatar, Badge, Box, HStack, Pressable, Text } from '@gluestack/ui';
import { Circle } from './icons';
const userImage = require('../../../assets/jane.png');

function Reviews() {
  return (
    <Box px="$32" py={50}>
      <HStack>
        <Badge
          variant="info-subtle"
          borderRadius={100}
          borderWidth={1}
          borderColor="$blue800"
          color="$blue800"
          px="$6"
          py="$2"
          fontWeight="$bold"
          fontSize="$xs"
        >
          TESTIMONIAL
        </Badge>
      </HStack>
      <HStack>
        <Text
          fontWeight="$bold"
          fontSize="$5xl"
          color="$black"
          mt="$3"
          mb={100}
        >
          Uno Reviews
        </Text>
      </HStack>
      <HStack space="xl" mb={60}>
        <Box
          borderWidth={1}
          borderColor="$coolGray100"
          borderRadius={10}
          py="$12"
          px="$10"
          flex="1"
        >
          <HStack>
            <Badge
              variant="outline"
              borderColor="$trueGray300"
              borderRadius="$full"
              px="$4"
              py="$2"
            >
              Restaurant
            </Badge>
          </HStack>
          <HStack>
            <Text
              mt="$6"
              mb="$12"
              fontWeight="$semibold"
              fontSize="$2xl"
              color="$darkText800"
              flex="1"
            >
              Sociable on as carriage my position weddings raillery consider.
              Peculiar trifling absolute and wandered vicinity property yet.
            </Text>
          </HStack>
          <HStack space="md">
            <Avatar width={60} h={60}>
              <Avatar.Image source={userImage} />
            </Avatar>
            <Box>
              <Text
                fontWeight="$semibold"
                fontSize="$lg"
                color="$darkText800"
                mb="$1"
              >
                Jane Cooper
              </Text>
              <Text color="#B7B7B7" fontSize="$sm" fontWeight="$normal">
                Company B
              </Text>
            </Box>
          </HStack>
        </Box>
        {/*  */}
        <Box
          borderWidth={1}
          borderColor="$coolGray100"
          borderRadius={10}
          py="$12"
          px="$10"
          flex="1"
        >
          <HStack>
            <Badge
              variant="outline"
              borderColor="$trueGray300"
              borderRadius="$full"
              px="$4"
              py="$2"
            >
              Restaurant
            </Badge>
          </HStack>
          <HStack>
            <Text
              mt="$6"
              mb="$12"
              fontWeight="$semibold"
              fontSize="$2xl"
              color="$darkText800"
              flex="1"
            >
              Sociable on as carriage my position weddings raillery consider.
              Peculiar trifling absolute and wandered vicinity property yet.
            </Text>
          </HStack>
          <HStack space="md">
            <Avatar width={60} h={60}>
              <Avatar.Image source={userImage} />
            </Avatar>
            <Box>
              <Text
                fontWeight="$semibold"
                fontSize="$lg"
                color="$darkText800"
                mb="$1"
              >
                Jane Cooper
              </Text>
              <Text color="#B7B7B7" fontSize="$sm" fontWeight="$normal">
                Company B
              </Text>
            </Box>
          </HStack>
        </Box>
      </HStack>
      <HStack justifyContent="center" space="sm">
        <Pressable>
          <Circle color="#4169E0" />
        </Pressable>
        <Pressable>
          <Circle color="#E7E7E7" />
        </Pressable>
        <Pressable>
          <Circle color="#E7E7E7" />
        </Pressable>
      </HStack>
    </Box>
  );
}

export default Reviews;
