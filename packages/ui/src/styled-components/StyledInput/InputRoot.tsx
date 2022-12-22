import { styled } from '@gluestack/ui-styled';
import { View } from 'react-native';

export default styled(
  View,
  {
    baseStyle: {
      style: {
        bg: '$white',
        borderWidth: 1,
        borderColor: '$muted300',
        borderRadius: 4,
        // bg: '$red100',
        // flexDirection: 'row',
      },

      state: {
        hover: {
          style: {
            borderColor: '$primary600',
          },
        },
        focus: {
          style: {
            // borderColor: '$primary600',
            // outlineColor: '$primary600',
            // bg: '$red200',
            // outline: 'none',
          },
        },
        disabled: {
          style: { bg: '$muted100' },
          // placeholderTextColor: '$muted700', color token is not getting resolved
          state: {
            hover: {
              style: { borderColor: '$muted300' },
            },
          },
        },
        invalid: {
          style: {
            borderColor: '$error600',
          },
        },
      },
    },
    variants: {
      rounded: {
        style: {
          borderRadius: 999,
        },
        descendants: {
          _input: {
            style: {
              borderRadius: 999,
            },
          },
        },
      },
      filled: {
        style: {
          borderWidth: 1,
          bg: '$muted100',
          borderColor: '$muted100',
        },
      },

      underlined: {
        style: {
          borderWidth: 0,
          borderRadius: 0,
          pl: '0',
          borderBottomWidth: 1,
        },
        state: {
          focus: {
            style: {
              shadowColor: '$primary500',
              shadowOffset: { width: 0, height: 1 },
            },
          },
        },
        descendants: {
          _input: {
            style: {
              outlineWidth: 0,
            },
          },
        },
      },
      unstyled: {
        style: {
          borderWidth: 0,
        },
        descendants: {
          _input: {
            style: {
              outlineWidth: 0,
            },
          },
        },
        state: {
          focus: {
            style: {
              bg: 'transparent',
            },
          },
        },
      },
    },
    sizes: {
      '2xl': { descendants: { _input: { style: { fontSize: 22 } } } },
      'xl': { descendants: { _input: { style: { fontSize: 20 } } } },
      'lg': { descendants: { _input: { style: { fontSize: 18 } } } },
      'md': { descendants: { _input: { style: { fontSize: 16 } } } },
      'sm': { descendants: { _input: { style: { fontSize: 14 } } } },
      'xs': { descendants: { _input: { style: { fontSize: 12 } } } },
    },
  },
  { descendentStyle: ['_input'] }
);
