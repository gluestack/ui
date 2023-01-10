import React from 'react';
import {
  Box,
  Button,
  HStack,
  LinearGradient,
  Text,
  Modal,
  CloseIcon,
  FormControl,
  Input,
  Image,
} from '@gluestack/ui';
// import { MobileImage } from '../images';
import Header from './Header';

const mobileImage = require('../../../assets/mobileImage.png');

function Hero() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
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
                <Button.Text
                  color="$black"
                  fontSize="$md"
                  fontWeight="$semibold"
                >
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
              <Button bg="$white" onPress={() => setShowModal(true)}>
                <Button.Text color="$darkText">Login/Register</Button.Text>
              </Button>
            </HStack>
            {/* <MobileImage /> */}
            <Image source={mobileImage} width={707} height={712} mb="$12" />
          </Box>
        </LinearGradient>
      </HStack>

      {/*  */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Backdrop />

        <Modal.Content>
          <Modal.CloseButton>
            <CloseIcon sx={{ style: { w: 16, h: 16 } }} />
          </Modal.CloseButton>
          <Modal.Header>
            <Text variant="modalHeader">Signin</Text>
          </Modal.Header>
          <Modal.Body minW="$16">
            <FormControl>
              <FormControl.Label>
                <FormControl.Label.Text>Email</FormControl.Label.Text>
              </FormControl.Label>

              <Input.Root>
                <Input type="text" placeholder="abc@gmail.com" />
              </Input.Root>
              {/* Label Message */}
              <FormControl.Label>
                <FormControl.Label.Text>Password</FormControl.Label.Text>
              </FormControl.Label>

              <Input.Root>
                <Input type="password" placeholder="password" />
              </Input.Root>

              {/* Helper Text */}
              <FormControl.Helper>
                <FormControl.Helper.Text>
                  Must be atleast 6 characters.
                </FormControl.Helper.Text>
              </FormControl.Helper>

              {/* Error Message */}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="solid"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Button.Text>Cancel</Button.Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Hero;
