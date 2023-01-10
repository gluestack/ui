import React from 'react';
import { Box, Center, HStack, Image, Text, Pressable } from '@gluestack/ui';

const keyBoardOpenImage = require('../../../assets/keyboard-open.png');

function Department() {
  return (
    <Box px="$32" mt="$32">
      <Box alignitems="center">
        <Text fontWeight="$bold" fontSize="$5xl" mb="$5" textAlign="center">
          Job Departments
        </Text>
        <Text
          fontSize={22}
          fontWeight="$normal"
          color="#707070"
          mb={60}
          textAlign="center"
        >
          We have jobs available in these departments
        </Text>

        <HStack space="md" flexWrap="wrap">
          {/* wrap with Link component */}
          {Array.apply(null, Array(14)).map(() => {
            return (
              <Pressable
                sx={{
                  state: {
                    focus: {
                      style: {
                        boxShadow: 'none',
                      },
                    },
                  },
                }}
              >
                <Box
                  bg="$white"
                  mt="$4"
                  borderRadius={10}
                  py="$9"
                  px="$5"
                  style={{
                    boxShadow: '0px 8px 18px rgba(23, 23, 37, 0.06)',
                  }}
                >
                  <Box alignItems="center">
                    <Center borderRadius="$full" bg="#4169e00d" p="$4" mb="$5">
                      <Image
                        source={keyBoardOpenImage}
                        width={30}
                        height={30}
                      />
                    </Center>
                  </Box>
                  <Text fontSize="$md" fontWeight="$bold" color="#111111">
                    Tech-Software Development and Engineering
                  </Text>
                </Box>
              </Pressable>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
}

export default Department;
