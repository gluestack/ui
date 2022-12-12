import { Link } from "solito/link";
import React from "react";
import { Button, ButtonText, Heading } from "@gluestack/ui";
import { Text } from "react-native";

export function DocsHeading() {
  return (
    <>
      <Link href="/">
        <Text>{"< Go back"}</Text>
      </Link>
      <Heading>Hello form Heading version 1.2</Heading>
    </>
  );
}
