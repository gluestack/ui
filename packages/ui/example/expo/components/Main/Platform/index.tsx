import React, { useState } from 'react';
import { Box, Button, HStack, Image, Pressable, Text } from '@gluestack/ui';
// import Video from './Video';
import MapComponent from './MapComponent';
const videoImage = require('../../../assets/video.png');

function Platform() {
  const [user, setUser] = useState('candidate');
  const [process, setProcess] = useState('jobWalkin');
  return (
    <Box px="$32">
      <Box alignItems="center">
        <HStack p={10} bg="$trueGray200" borderRadius={10} space="md" mb={50}>
          <Button
            bg={user === 'candidate' ? '$blue600' : 'transparent'}
            variant="unstyled"
            borderRadius="$lg"
            px="$20"
            py="$5"
            onPress={() => setUser('candidate')}
          >
            <Button.Text
              fontSize="$md"
              fontWeight="$semibold"
              color={user === 'candidate' ? '$white' : '$darkText'}
            >
              Candidate
            </Button.Text>
          </Button>
          <Button
            bg={user !== 'candidate' ? '$blue600' : 'transparent'}
            variant="unstyled"
            borderRadius="$lg"
            px="$20"
            py="$5"
            onPress={() => setUser('employers')}
          >
            <Button.Text
              fontSize="$md"
              fontWeight="$semibold"
              color={user !== 'candidate' ? '$white' : '$darkText'}
            >
              Employers
            </Button.Text>
          </Button>
        </HStack>
      </Box>
      <HStack alignItems="center" mb={100}>
        <Box flex="1" mr={50} pr="$20">
          <Text
            fontWeight="$bold"
            fontSize="$5xl"
            color="$black"
            mb="$6"
            w="50%"
          >
            <Text color="$blue500" fontWeight="$bold" fontSize="$5xl">
              Modern
            </Text>{' '}
            Platform to Find Jobs
          </Text>
          <Text
            fontWeight="$normal"
            fontSize="$lg"
            mb="$6"
            color="$textDark500"
          >
            Unojob has 4 main features to make it easier for you to find workers
            that match your company. Easy, Friendly. Impactly Employers are able
            to fil positions fast with high quality candidates.
          </Text>
          <Text
            fontWeight="$normal"
            fontSize="$lg"
            mb="$6"
            color="$textDark500"
          >
            Unojobs is free to all candidates. We believe that a job is a key
            requirement and should be accessible to all.
          </Text>
        </Box>
        {/* <Video /> */}
        <Image source={videoImage} width={300} height={200} />
      </HStack>
      <HStack mb="$16">
        <Pressable
          sx={{
            state: {
              hover: {
                style: { borderBottomWidth: 1, marginTop: -8 },
              },
            },
          }}
          mr="$16"
          fontSize="$lg"
          fontWeight="$semibold"
          borderBottomWidth={process === 'jobWalkin' ? 1 : 0}
          marginTop={process === 'jobWalkin' ? -8 : 0}
          color={process === 'jobWalkin' ? '$black' : '#707070'}
          onPress={() => setProcess('jobWalkin')}
        >
          Job Walkin
        </Pressable>
        <Pressable
          sx={{
            state: {
              hover: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
              active: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
            },
          }}
          mr="$16"
          fontSize="$lg"
          fontWeight="$semibold"
          borderBottomWidth={process === 'easyInteractions' ? 1 : 0}
          marginTop={process === 'easyInteractions' ? -8 : 0}
          color={process === 'easyInteractions' ? '$black' : '#707070'}
          onPress={() => setProcess('easyInteractions')}
        >
          Easy Interactions
        </Pressable>
        <Pressable
          sx={{
            state: {
              hover: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
              active: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
            },
          }}
          mr="$16"
          borderBottomWidth={process === 'videoResume' ? 1 : 0}
          marginTop={process === 'videoResume' ? -8 : 0}
          color={process === 'videoResume' ? '$black' : '#707070'}
          fontSize="$lg"
          fontWeight="$semibold"
          onPress={() => setProcess('videoResume')}
        >
          Video Resume
        </Pressable>
        <Pressable
          sx={{
            state: {
              hover: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
              active: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
            },
          }}
          mr="$16"
          borderBottomWidth={process === 'fees' ? 1 : 0}
          marginTop={process === 'fees' ? -8 : 0}
          color={process === 'fees' ? '$black' : '#707070'}
          fontSize="$lg"
          fontWeight="$semibold"
          onPress={() => setProcess('fees')}
        >
          Fee’s
        </Pressable>
        <Pressable
          sx={{
            state: {
              hover: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
              active: {
                style: { borderBottomWidth: 1, marginTop: -8, color: '$black' },
              },
            },
          }}
          mr="$16"
          borderBottomWidth={process === 'fast' ? 1 : 0}
          marginTop={process === 'fast' ? -8 : 0}
          color={process === 'fast' ? '$black' : '#707070'}
          fontSize="$lg"
          fontWeight="$semibold"
          onPress={() => setProcess('fast')}
        >
          Fast
        </Pressable>
      </HStack>
      <HStack borderRadius="2xl" bg="$trueGray100" p={50} alignItems="center">
        <MapComponent />
        <Box flex="1" pl="$12">
          <Text fontSize="sm" fontWeight="$bold" color="$lightBlue600">
            Features
          </Text>
          <Text
            mt="$3"
            mb="$6"
            fontSize="$4xl"
            fontWeight="$bold"
            color="#111111"
          >
            Job Walkins
          </Text>
          <Text fontSize="md" fontWeight="$normal" color="#707070">
            Why go far away, when the job you want can be right around the
            corner. Our mapping tool makes it easy to find jobs closest to where
            you live. No more travelling far away.
          </Text>
          <HStack mt={30}>
            <Button
              bg="$blue600"
              borderRadius={8}
              px="$5"
              py="$2"
              sx={{
                state: {
                  hover: {
                    style: { bg: '$blue700' },
                  },
                  active: {
                    style: { bg: '$blue800' },
                  },
                },
              }}
            >
              <Button.Text fontSize="$md" fontWeight="$semibold" color="$white">
                Get Started
              </Button.Text>
            </Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}

export default Platform;
