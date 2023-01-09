// import { StatusBar } from "expo-status-bar";
// @ts-nocheck
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { styled, StyledProvider } from '@gluestack/ui-styled';

import { Button, GluestackUIProvider, config } from '@gluestack/ui';
import {
  set as setColorMode,
  get as getColorMode,
  onChange,
} from '@gluestack/color-mode';
import Navbar from './components/Navbar';
import Main from './components/Main';

window['setColorMode'] = setColorMode;
window['getColorMode'] = getColorMode;

onChange((colorMode) => {
  //console.log('color mode', colorMode);
  if (colorMode === 'dark') {
    document.body.classList.remove('gs-light');
    document.body.classList.add('gs-dark');
  } else if (colorMode === 'light') {
    document.body.classList.remove('gs-dark');
    document.body.classList.add('gs-light');
  } else {
    document.body.classList.remove('gs-light');
    document.body.classList.remove('gs-dark');
  }
});

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Navbar />
      <Main />
    </GluestackUIProvider>
  );
}
