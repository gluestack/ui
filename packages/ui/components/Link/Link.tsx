import { Link } from '@gluestack/ui';
import React from 'react';
import { Text } from 'react-native';

export const Example = ({ ...props }) => {
  return (
    <Link href="https://nativebase.io" isExternal={props.isExternal}>
      {props.text}
    </Link>
  );
};
