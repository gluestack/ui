import { View } from 'react-native';
import { styled } from '@gluestack/ui-styled';

export default styled(
  View,
  {
    baseStyle: {
      style: {
        justifyContent: 'center',
        alignItems: 'center',
        bg: 'transparent',
        borderColor: '$muted400',
        ml: '$2',
        borderWidth: 2,
        borderRadius: 999,
      },
      state: {
        hover: {
          style: {
            borderColor: '$primary700',
          },
        },
        invalid: {
          style: {
            borderColor: '$error600',
          },
        },
        disabled: {
          style: {
            opacity: 0.6,
          },
        },
        checked: {
          style: {
            borderColor: '$primary600',
          },
          state: {
            hover: {
              style: {
                borderColor: '$primary700',
              },
            },
            disabled: {
              style: {
                borderColor: '$primary600',
              },
            },
          },
        },
      },
    },
  },
  {
    ancestorStyle: ['_indicator'],
  }
);
