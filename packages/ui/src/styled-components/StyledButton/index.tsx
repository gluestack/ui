import { styled } from '@gluestack/ui-styled';
import { Pressable } from 'react-native';

export default styled(
  Pressable,
  {
    baseStyle: {
      style: {
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      platform: {
        web: {
          style: {
            //@ts-ignore
            cursor: 'pointer',
            userSelect: 'none',
          },
        },
      },
      state: {
        hover: {
          style: {
            bg: '$primary800',
          },
        },
        disabled: {
          style: {
            // @ts-ignore
            opacity: '0.4',
          },
        },
      },
    },

    variants: {
      solid: {
        style: {
          bg: '$primary600',
        },
        descendants: {
          _text: {
            style: {
              color: '$text50',
            },
          },
        },
        state: {
          hover: {
            style: {
              bg: '$primary700',
            },
          },
          active: {
            style: {
              bg: '$primary800',
            },
          },
        },
      },
      subtle: {
        style: {
          bg: '$primary100',
        },
        descendants: {
          _text: {
            style: {
              color: '$primary900',
            },
          },
        },
        state: {
          hover: {
            style: {
              bg: '$primary200',
            },
          },
          active: {
            style: {
              bg: '$primary300',
            },
          },
        },
      },
      outline: {
        style: {
          //@ts-ignore
          bg: 'transparent',
          borderWidth: 1,
          borderColor: '$trueGray.300',
        },
        descendants: {
          _text: {
            style: {
              color: '$primary600',
            },
          },
        },
        state: {
          hover: {
            style: {
              bg: '$primary400', //replace it with alpha token "$primary600:alpha10 when supported"
              // backgroundOpacity: '0.1',
            },
            descendants: {
              _text: {
                style: {
                  color: '$muted100',
                },
              },
            },
          },
          active: {
            style: {
              bg: '$primary500', //replace it with alpha token "$primary600:alpha20 when supported"
            },
            descendants: {
              _text: {
                style: {
                  color: '$muted100',
                },
              },
            },
          },
        },
      },
      ghost: {
        descendants: {
          _text: {
            style: {
              color: '$primary600',
            },
          },
        },
        state: {
          hover: {
            style: {
              bg: '$primary400', //replace it with alpha token "$primary600:alpha10 when supported"
            },
            descendants: {
              _text: {
                style: {
                  color: '$text100',
                },
              },
            },
          },
          active: {
            style: {
              bg: '$primary500', //replace it with alpha token "$primary600:alpha20 when supported"
            },
            descendants: {
              _text: {
                style: {
                  color: '$text50',
                },
              },
            },
          },
        },
      },
    },
    sizes: {
      xs: {
        style: {
          px: '$3',
          py: '$2',
        },
        descendants: {
          _text: {
            style: {
              fontSize: 10,
            },
          },
        },
      },
      sm: {
        style: {
          px: '$3',
          py: '$2',
        },
        descendants: {
          _text: {
            style: {
              fontSize: 12,
            },
          },
        },
      },
      md: {
        style: {
          px: '$3',
          py: '$2.5',
        },
        descendants: {
          _text: {
            style: {
              fontSize: 14,
            },
          },
        },
      },
      lg: {
        style: {
          px: '$3',
          py: '$3',
        },
        descendants: {
          _text: {
            style: {
              fontSize: 16,
            },
          },
        },
      },
    },

    defaultProps: {
      size: 'md',
      variant: 'solid',
    },
  },
  {
    descendentStyle: ['_text'],
  }
);
