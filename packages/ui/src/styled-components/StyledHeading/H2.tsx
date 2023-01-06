import { styled } from '@gluestack/ui-styled';
import { H2 } from '@expo/html-elements';

export default styled(
  H2,
  {
    baseStyle: {
      style: {
        color: '$text900',
        fontWeight: 'bold',
        fontSize: '$3xl',
        lineHeight: '$md',
      },
      colorMode: {
        dark: {
          style: { color: '$text50' },
        },
      },
    },
    // sizes: {
    // '4xl': {
    // style: {
    // fontSize: '$6xl',
    // letterSpacing: '$xl',
    // lineHeight: '$md',
    // },
    // },
    // '3xl': {
    // style: {
    // fontSize: '$5xl',
    // letterSpacing: '$xl',
    // lineHeight: '$md',
    // },
    // },
    // '2xl': {
    // style: {
    // fontSize: '$4xl',
    // lineHeight: '$md',
    // },
    // },
    // 'xl': {
    // style: {
    // fontSize: '$3xl',
    // lineHeight: '$md',
    // },
    // },
    // 'lg': {
    // style: {
    // fontSize: '$2xl',
    // lineHeight: '$md',
    // },
    // },
    // 'md': {
    // style: {
    // fontSize: '$xl',
    // lineHeight: '$md',
    // },
    // },
    // 'sm': {
    // style: {
    // fontSize: '$md',
    // lineHeight: '$md',
    // },
    // },
    // 'xs': {
    // style: {
    // fontSize: '$sm',
    // lineHeight: '$md',
    // },
    // },
    // },
    // defaultProps: {
    // size: 'lg',
    // },
  },
  {}
);
