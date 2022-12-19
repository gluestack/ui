// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { styled as xyz } from '@gluestack/ui-styled';

const Box = xyz(
  View,
  {
    baseStyle: {
      style: {
        bg: '$blue500',
        p: '$3',
      },
      state: {
        hover: {
          style: {
            bg: '$red300',
          },
        },
      },
    },
    variants: {
      greenBox: {
        style: {
          bg: '$red500',
        },
        state: {
          hover: {
            style: {
              bg: '$red100',
            },
          },
        },
      },
    },
  },
  {}
);

export default function App() {
  return (
    <View style={styles.container}>
      <Box
      // variant="greenBox"
      // states={{
      //   hover: false,
      // }}
      // sx={{
      //   state: {
      //     hover: {
      //       style: {
      //         bg: "$red500",
      //       },
      //     },
      //   },
      // }}
      >
        Hello Box
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
