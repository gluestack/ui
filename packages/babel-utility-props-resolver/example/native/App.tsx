// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { styled as xyz } from '@gluestack/styled';

const Box = xyz(
  View,
  {
    baseStyle: {
      style: {
        bg: '$primary.500',
        p: '$3',
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
          bg: '$red.500',
        },
        state: {
          hover: {
            style: {
              bg: '$red.100',
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
        color="$red.500"
        bg="$blue.500:alpha.50"
        rounded="$full"
        space="$5"
        _web={{
          bg: '$purple.500',
        }}
        _text={{
          color: '$black',
        }}
        _hover={{
          bg: '$primary.300',
          h: '100',
          px: '$4',
          py: '$3',
          _ios: {
            bg: '$primary.300',
            p: '$5',
            h: '$9',
            _light: {
              bg: '$yellow.400',
              _text: {
                color: '$red.500',
              },
            },
          },
          _android: {
            bg: '$primary.400',
          },
        }}
        _focus={{
          bg: '$red.500',
        }}
        // h={"100"}
        sx={{
          style: {
            // bg: "$secondary.600",
            // h: "100",
          },
          state: {
            hover: {
              style: {
                bg: '$red.800',
                p: '100',
              },
            },
          },
        }}
        onPress={() => console.log('Hellllllllo')}
        variant="blueBox"
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
