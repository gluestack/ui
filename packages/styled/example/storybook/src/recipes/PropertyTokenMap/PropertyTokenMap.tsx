import React from 'react';
import { TextInput } from 'react-native';
import { styled } from '@gluestack/ui-styled';
import { Wrapper } from '../../components/Wrapper';

const StyledInputProps = styled(
  TextInput,
  {
    baseStyle: {
      style: { p: '$4' },
    },
  },
  { resolveProps: ['placeholderTextColor'] },
  {
    propertyTokenMap: {
      placeholderTextColor: 'colors',
    },
  }
);

export function PropertyTokenMap() {
  return (
    <Wrapper>
      <StyledInputProps
        placeholder="Enter here"
        placeholderTextColor="$primary900"
      ></StyledInputProps>
    </Wrapper>
  );
}
