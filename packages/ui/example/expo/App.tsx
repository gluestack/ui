// import { StatusBar } from "expo-status-bar";
// @ts-nocheck
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import { styled, StyledProvider } from '@gluestack/ui-styled';
// import { createConfig } from '@gluestack/ui-styled';
// createConfig(config);
// onReady((config) => {
//   console.log(config);
// });

// import MyButton from './styled-components/StyledButton/index';
// import MyButtonText from './styled-components/StyledButton/StyledButtonText';
import { Button, GluestackUIProvider, config } from '@gluestack/ui';
import {
  set as setColorMode,
  get as getColorMode,
  onChange,
} from '@gluestack/color-mode';

window['setColorMode'] = setColorMode;
window['getColorMode'] = getColorMode;

onChange((colorMode) => {
  //console.log('color mode', colorMode);
  if (colorMode === 'dark') {
    document.body.classList.remove('gs-light');
    document.body.classList.add('gs-dark');
  } else if (colorMode === 'light') {
    document.body.classList.remove('gs-dark');
    document.body.classList.add('gs-light');
  } else {
    document.body.classList.remove('gs-light');
    document.body.classList.remove('gs-dark');
  }
});

// export const useHover = () => {
//   const [isHovered, setHovered] = useState(false);
//   return {
//     hoverProps: {
//       onHoverIn: () => setHovered(true),
//       onHoverOut: () => setHovered(false),
//     },
//     isHovered,
//   };
// };

// export const useFocus = () => {
//   const [isFocused, setFocused] = useState(false);
//   return {
//     focusProps: {
//       onFocus: () => setFocused(true),
//       onBlur: () => setFocused(false),
//     },
//     isFocused,
//   };
// };

// export const useIsPressed = () => {
//   const [isPressed, setIsPressed] = useState(false);
//   return {
//     pressableProps: {
//       onPressIn: () => setIsPressed(true),
//       onPressOut: () => setIsPressed(false),
//     },
//     isPressed,
//   };
// };

// function composeEventHandlers<E>(
//   originalEventHandler?: null | ((event: E) => void),
//   ourEventHandler?: (event: E) => void
// ) {
//   return function handleEvent(event: E) {
//     originalEventHandler?.(event);
//     ourEventHandler?.(event);
//   };
// }

// function hexToRgba(hex, alpha) {
//   let r, g, b;
//   if (hex.length === 4) {
//     r = '0x' + hex[1] + hex[1];
//     g = '0x' + hex[2] + hex[2];
//     b = '0x' + hex[3] + hex[3];
//   } else if (hex.length === 7) {
//     r = '0x' + hex[1] + hex[2];
//     g = '0x' + hex[3] + hex[4];
//     b = '0x' + hex[5] + hex[6];
//   }
//   return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + alpha.toString() + ')';
// }

// const MyButton = styled(
//   Pressable,
//   {
//     baseStyle: {
//       style: {
//         bg: '$red500:alpha-50',
//         p: '$3',
//         shadow: '$4',
//       },

//       // colorMode: {
//       //   dark: {
//       //     style: {
//       //       bg: 'aqua',
//       //     },
//       //   },
//       // },
//       // queries: [
//       //   {
//       //     condition: '$md',
//       //     value: {
//       //       style: {
//       //         bg: 'blue',
//       //       },
//       //       state: {
//       //         hover: {
//       //           style: {
//       //             bg: 'aqua',
//       //           },
//       //           // hover: {
//       //           //   style: {
//       //           //     bg: 'red',
//       //           //   },
//       //           // },

//       //           // colorMode: {
//       //           //   dark: {
//       //           //     style: {
//       //           //       bg: 'purple',
//       //           //     },
//       //           //   },
//       //           //   light: {
//       //           //     style: {
//       //           //       bg: 'aqua',
//       //           //     },
//       //           //   },
//       //           // },
//       //           // state: {
//       //           //   hover: {
//       //           //     style: {
//       //           //       bg: '$yellow500',
//       //           //     },
//       //           //   },
//       //           // },
//       //         },
//       //       },
//       //     },
//       //   },
//       // ],

//       // state: {
//       //   hover: {
//       //     style: {
//       //       bg: '$green500',
//       //     },
//       //     // state: {
//       //     //   focus: {
//       //     //     style: {
//       //     //       bg: 'purple',
//       //     //     },
//       //     //   },
//       //     // },
//       //   },
//       // },

//       // state: {
//       //   hover: {
//       //     style: {
//       //       bg: 'yellow',
//       //     },

//       //     // hover: {
//       //     //   style: {
//       //     //     bg: 'yellow',
//       //     //   },
//       //     //   hover: {
//       //     //     style: {
//       //     //       bg: 'yellow',
//       //     //     },
//       //     //     hover: {
//       //     //       style: {
//       //     //         bg: 'aqua',
//       //     //       },
//       //     //     },
//       //     //   },
//       //     // },
//       //     descendants: {
//       //       _text: {
//       //         style: {
//       //           color: 'purple',
//       //         },
//       //       },
//       //     },
//       //   },

//       //   active: {
//       //     style: {
//       //       bg: '',
//       //     },
//       //   },
//       // },
//       // descendants: {
//       //   _text: {
//       //     style: {
//       //       color: 'white',
//       //     },
//       //   },
//       // },
//     },
//     // variants: {
//     //   greenBox: {
//     //     style: {
//     //       bg: '$green500',
//     //     },
//     //     state: {
//     //       hover: {
//     //         style: {
//     //           bg: '$green600',
//     //         },
//     //       },
//     //       active: {
//     //         style: {
//     //           bg: '$green700',
//     //         },
//     //       },
//     //     },
//     //     queries: [
//     //       {
//     //         condition: '$md',
//     //         value: {
//     //           style: {
//     //             bg: '$blue500',
//     //           },
//     //           state: {
//     //             hover: {
//     //               style: {
//     //                 bg: '$green500',
//     //               },
//     //               state: {
//     //                 focus: {
//     //                   style: {
//     //                     bg: 'purple',
//     //                   },
//     //                 },
//     //               },
//     //             },
//     //           },
//     //           colorMode: {
//     //             dark: {
//     //               style: {
//     //                 bg: '$red500',
//     //               },
//     //             },
//     //             light: {
//     //               style: {
//     //                 bg: '$blue500',
//     //               },
//     //             },
//     //           },
//     //         },
//     //       },
//     //     ],
//     //   },
//     //   // blueBox: {
//     //   //   style: {
//     //   //     bg: '$yellow500',
//     //   //   },
//     //   //   // colorMode: {
//     //   //   //   dark: {
//     //   //   //     style: {
//     //   //   //       bg: '$yellow100',
//     //   //   //     },
//     //   //   //   },
//     //   //   // },
//     //   //   // state: {
//     //   //   //   hover: {
//     //   //   //     style: {
//     //   //   //       bg: '$yellow600',
//     //   //   //     },
//     //   //   //   },
//     //   //   //   active: {
//     //   //   //     style: {
//     //   //   //       bg: '$yellow700',
//     //   //   //     },
//     //   //   //   },
//     //   //   // },
//     //   // },
//     // },
//     // sizes: {
//     //   // small: {
//     //   //   style: {
//     //   //     p: '$10',
//     //   //   },
//     //   // },
//     //   large: {
//     //     style: {
//     //       px: '$20',
//     //       py: '$10',
//     //     },
//     //     state: {
//     //       hover: {
//     //         style: {
//     //           bg: 'pink',
//     //         },
//     //       },
//     //     },
//     //   },
//     // },
//   },
//   {
//     descendantStyle: ['_text'],
//     DEBUG: 'BUTTON_STYLED',
//     resolveProps: ['colors'],
//   },
//   {
//     propertyTokenMap: {
//       colors: 'colors',
//       opacity: 'opacity',
//     },
//     propertyResolver: {
//       colors: (value, resolver) => {
//         if (Array.isArray(value)) {
//           let res = value.map((color) => {
//             return resolver(color);
//           });
//           return res;
//         }
//         return value;
//       },
//       backgroundColor: (rawValue: string, resolver) => {
//         if (rawValue.includes(':alpha-')) {
//           let opacity = resolver(rawValue.split(':alpha-')[1], 'opacity');
//           let value = rawValue.split(':alpha-')[0];
//           return hexToRgba(resolver(value), opacity);
//         } else {
//           return resolver(rawValue);
//         }
//       },
//     },
//   }
// );

// const MyButtonText = styled(Text, {}, { ancestorStyle: ['_text'] });

// function Button() {
//   const { pressableProps, isPressed } = useIsPressed();
//   let { isFocused, focusProps } = useFocus();
//   const { isHovered, hoverProps }: any = useHover();

//   return (
//     <MyButton
//       size="large"
//       colors={['$red400', '$blue400']}
//       // backgroundColor123="red"
//       // colorMode="dark"
//       states={{
//         hover: isHovered,
//         focus: isFocused,
//         active: isPressed,
//       }}
//       sx={{
//         style: {
//           marginBottom: '$4',
//         },
//         // style: {
//         //   backgroundColor: 'pink',
//         // },
//         // state: {
//         //   hover: {
//         //     style: {
//         //       backgroundColor: 'orange',
//         //     },
//         //   },
//         // },
//         descendants: {
//           _text: {
//             style: {
//               color: 'red',
//             },
//             state: {
//               hover: {
//                 style: {
//                   backgroundColor: 'orange',
//                 },
//               },
//             },
//           },
//         },
//       }}
//       onPressIn={composeEventHandlers(pressableProps.onPressIn)}
//       onPressOut={composeEventHandlers(pressableProps.onPressOut)}
//       // @ts-ignore - web only
//       onHoverIn={composeEventHandlers(hoverProps.onHoverIn)}
//       // @ts-ignore - web only
//       onHoverOut={composeEventHandlers(hoverProps.onHoverOut)}
//       // @ts-ignore - web only
//       onFocus={composeEventHandlers(composeEventHandlers(focusProps.onFocus))}
//       // @ts-ignore - web only
//       onBlur={composeEventHandlers(composeEventHandlers(focusProps.onBlur))}
//       // sx={{
//       //   state: {
//       //     hover: {
//       //       style: {
//       //         bg: "$red.500",
//       //       },
//       //     },
//       //   },
//       // }}
//     >
//       <MyButtonText>Hello World</MyButtonText>
//     </MyButton>
//   );
// }

export default function App() {
  return (
    <div>
      <GluestackUIProvider config={config}>
        <Button>
          <Button.Text>sdmnvcshvfduv</Button.Text>
        </Button>
      </GluestackUIProvider>
    </div>
  );
  // return (
  //   <StyledProvider config={config}>
  //     <View style={styles.container}>
  //       <Button />
  //     </View>
  //   </StyledProvider>
  // );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyWrap: 'wrap',
    flexDirection: 'column',
  },
  container1: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    backgroundColor: 'red',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  container2: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  container3: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  container4: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  container5: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  container6: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container7: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  container8: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  container9: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  container10: {
    backgroundColor: 'white',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
