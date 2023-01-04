// import { StatusBar } from "expo-status-bar";
import { View } from 'react-native';
import React from 'react';
import { GluestackUIProvider } from '@gluestack/ui';
import { config } from './nb.config';
import SkeletonLayout from './components/SkeletonLayout';
// import { ButtonExpo } from "./button-expo";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <View style={{ flex: 1 }}>
        <SkeletonLayout />
      </View>
    </GluestackUIProvider>
  );
}
