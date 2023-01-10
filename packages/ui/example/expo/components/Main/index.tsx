import React from 'react';
import { Box } from '@gluestack/ui';
import Hero from './Hero';
import Second from './Second';
import Third from './Third';
import Platform from './Platform';
import Reviews from './Reviews';
import Department from './Department';

function Main() {
  return (
    <Box maxWidth="1440">
      <Hero />
      <Second />
      <Third />
      <Platform />
      <Department />
      <Reviews />
    </Box>
  );
}

export default Main;
