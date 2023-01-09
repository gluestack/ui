import React from 'react';
import {
  Box,
  Button,
  HStack,
  LinearGradient,
  Link,
  Pressable,
  Text,
} from '@gluestack/ui';
import Hero from './Hero';
import Second from './Second';
import Third from './Third';
import Platform from './Platform';

function Main() {
  return (
    <Box maxWidth="1440">
      <Hero />
      <Second />
      <Third />
      <Platform />
    </Box>
  );
}

export default Main;
