import { styled } from '@gluestack/ui-styled';
import { H1 } from '@expo/html-elements';

export default styled(
  H1,
  {
    baseStyle: {
      style: {
        color: '$text900',
        fontWeight: 'bold',
        lineHeight: 20,
      },
      colorMode: {
        dark: {
          style: { color: '$text50' },
        },
      },
    },
    sizes: {
      '4xl': {
        style: {
          fontSize: 60,
          letterSpacing: 0.8,
        },
      },
      '3xl': {
        style: {
          fontSize: 48,
          letterSpacing: 0.8,
        },
      },
      '2xl': {
        style: {
          fontSize: 36,
        },
      },
      'xl': {
        style: {
          fontSize: 30,
        },
      },
      'lg': {
        style: {
          fontSize: 24,
        },
      },
      'md': {
        style: {
          fontSize: 20,
        },
      },
      'sm': {
        style: {
          fontSize: 16,
        },
      },
      'xs': {
        style: {
          fontSize: 14,
        },
      },
    },
    defaultProps: {
      size: 'lg',
    },
  },
  {}
);
