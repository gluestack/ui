import { styled } from '@gluestack/ui-styled';
import { config } from './../ui.config';
import { Pressable } from 'react-native';

export default styled(
  Pressable,
  {
    baseStyle: {
      style: {
        bg: '$primary500',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        px: 12,
        py: 10,
        color: '$white',
        outlineWidth: 0,
      },
      platform: {
        web: {
          state: {
            focusVisible: {
              style: {
                outlineWidth: 0,
                boxShadow: `${config?.tokens?.colors.primary400} 0px 0px 0px 2px`,
              },
            },
          },
        },
      },
      state: {
        hover: {
          style: { bg: '$primary700' },
        },
        disabled: {
          style: {
            // @ts-ignore
            opacity: '0.4',
          },
        },
        active: {
          style: { bg: '$primary900' },
        },
      },
      colorMode: {
        dark: {
          platform: {
            web: {
              state: {
                focusVisible: {
                  style: {
                    outlineWidth: 0,
                    boxShadow: `${config?.tokens?.colors.primary500} 0px 0px 0px 2px`,
                  },
                },
              },
            },
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
          color: '$primary900',
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
          borderColor: '$primary900',
          color: '$primary900',
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
        colorMode: {
          dark: {
            style: {
              borderColor: '$primary500',
              color: '$primary500',
            },
            descendants: {
              _text: {
                style: {
                  color: '$primary500',
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
                      color: '$muted900',
                    },
                  },
                },
              },
              active: {
                style: {
                  bg: '$primary300', //replace it with alpha token "$primary600:alpha20 when supported"
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
        },
      },
      ghost: {
        style: {
          bg: 'transparent',
          color: '$primary900',
        },
        descendants: {
          _text: {
            style: {
              color: '$primary600',
            },
          },
        },
        colorMode: {
          dark: {
            descendants: {
              _text: {
                style: {
                  color: '$primary500',
                },
              },
            },
          },
        },
        state: {
          hover: {
            style: {
              bg: '$primary100',
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
              bg: '$primary200', //replace it with alpha token "$primary600:alpha20 when supported"
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
    descendantStyle: ['_text'],
  }
);
