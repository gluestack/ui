// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { styled, useToken } from '@gluestack/styled';

const Box = styled(
  View,
  {
    baseStyle: {
      style: {
        bg: '#000',
        p: 6,
        h: '$10',
        rounded: '$full',
      },
      state: {
        hover: {
          style: {
            bg: '$red.300',
          },
        },
      },
    },
    variants: {
      greenBox: {
        style: {
          bg: '$secondary.500',
        },
        state: {
          hover: {
            style: {
              bg: '$primary.600',
            },
          },
        },
      },
    },
  },
  {}
);

export default function App() {
  const padding = useToken('spacing', '$6');
  console.log(padding, 'x');

  return (
    <View style={styles.container}>
      <Box
        sx={{
          style: {
            px: padding,
          },
        }}
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
