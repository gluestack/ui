// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// console.log("hello here");
import { Button, ButtonText, Heading } from "@gluestack/ui";
// import { ButtonExpo } from "./button-expo";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        bg="$red.500"
        _hover={{
          bg: "$primary.300",
          h: "100",
          px: "$4",
          py: "$3",
          _ios: {
            bg: "$primary.300",
            p: "$5",
            h: "$9",
          },
          _android: {
            bg: "$primary.400",
          },
        }}
        _focus={{
          bg: "$red.500",
          _light: {
            bg: "$red.600",
          },
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
                bg: "$red.800",
                p: "100",
              },
            },
          },
        }}
        onPress={() => console.log("Hellllllllo")}
        variant="blueBox"
      >
        <ButtonText>Click me</ButtonText>
      </Button>
      <Heading>Heading</Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
