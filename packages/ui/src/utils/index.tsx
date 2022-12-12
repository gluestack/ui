// import { get, isNil, omit, omitBy, pick, set } from "lodash";

import { extractInObject } from "./extractInObject";
import { omitUndefined } from "./omitUndefined";

// const UTILITY_PROPS_MAP: any = {
//   state: {
//     _hover: "hover",
//     _active: "active",
//     _focus: "focus",
//   },
//   platform: {
//     _web: "web",
//     _android: "android",
//     _ios: "ios",
//   },
//   colorMode: {
//     _light: "light",
//     _dark: "dark",
//   },
// };

// const ignoredComponentProps = [
//   "children",
//   "onPress",
//   "onBlur",
//   "onFocus",
//   "onHoverIn",
//   "onHoverOut",
//   "onPressIn",
//   "onPressOut",
//   "variant",
// ];

// function resolveUtilityProps(
//   sxProps: any = {},
//   utilityProps: any,
//   parent: any = []
// ) {
//   Object.keys(utilityProps).forEach((property) => {
//     if (property.startsWith("_")) {
//       if (UTILITY_PROPS_MAP.state[property]) {
//         parent.push("state");
//         parent.push(UTILITY_PROPS_MAP.state[property]);
//       } else if (UTILITY_PROPS_MAP.platform[property]) {
//         parent.push("platfrom");
//         parent.push(UTILITY_PROPS_MAP.platform[property]);
//       } else if (UTILITY_PROPS_MAP.colorMode[property]) {
//         parent.push("colorMode");
//         parent.push(UTILITY_PROPS_MAP.colorMode[property]);
//       }
//       resolveUtilityProps(sxProps, utilityProps[property], parent);
//       delete utilityProps[`_${parent[parent.length - 1]}`];
//       parent.pop();
//       parent.pop();
//     } else {
//       if (parent.length === 0) {
//         sxProps.style[property] =
//           sxProps.style[property] ?? utilityProps[property];
//       } else {
//         parent.push("style");
//         parent.push(property);
//         set(sxProps, parent, get(sxProps, parent) ?? utilityProps[property]);
//         parent.pop();
//         parent.pop();
//       }
//     }
//   });

//   console.log(sxProps, "sxProps");
// }

// // function resolveUtilityProps1(
// //   sxProps: any = {},
// //   utilityProps: any,
// //   parent: any = ""
// // ) {
// //   Object.keys(utilityProps).forEach((property) => {
// //     if (Object.keys(utilityProps[property]).length === 1) {
// //       if (parent === "") {
// //         sxProps.style = {
// //           [property]: utilityProps[property],
// //           ...sxProps?.style,
// //         };
// //       }
// //       return;
// //     }
// //     if (UTILITY_PROPS_MAP.state[property]) {
// //       if (sxProps?.state?.[UTILITY_PROPS_MAP.state[property]]?.style) {
// //         sxProps.state[UTILITY_PROPS_MAP.state[property]].style = {
// //           ...utilityProps[property],
// //           ...sxProps.state[UTILITY_PROPS_MAP.state[property]]?.style,
// //         };
// //       } else {
// //         sxProps.state[UTILITY_PROPS_MAP.state[property]] = {
// //           style: { ...utilityProps[property] },
// //         };
// //       }
// //       delete utilityProps[property];
// //     }
// //     if (UTILITY_PROPS_MAP.platform[property]) {
// //       if (sxProps?.platform?.[UTILITY_PROPS_MAP.platform[property]]?.style) {
// //         sxProps.platform[UTILITY_PROPS_MAP.platform[property]].style = {
// //           ...utilityProps[property],
// //           ...sxProps.platform[UTILITY_PROPS_MAP.platform[property]]?.style,
// //         };
// //       } else {
// //         sxProps.platform[UTILITY_PROPS_MAP.platform[property]] = {
// //           style: { ...utilityProps[property] },
// //         };
// //       }
// //       delete utilityProps[property];
// //     }
// //     if (UTILITY_PROPS_MAP.colorMode[property]) {
// //       if (sxProps?.colorMode?.[UTILITY_PROPS_MAP.colorMode[property]]?.style) {
// //         sxProps.colorMode[UTILITY_PROPS_MAP.colorMode[property]].style = {
// //           ...utilityProps[property],
// //           ...sxProps.colorMode[UTILITY_PROPS_MAP.colorMode[property]]?.style,
// //         };
// //       } else {
// //         sxProps.colorMode[UTILITY_PROPS_MAP.colorMode[property]] = {
// //           style: { ...utilityProps[property] },
// //         };
// //       }
// //       delete utilityProps[property];
// //     }
// //   });
// //   // return sxProps;
// // }

// export function utilityPropsResolution(
//   sxProps: any = {},
//   utilityProps: any,
//   config?: any
// ) {
//   const [ignoredProps, cleanIncomingProps] = extractInObject(
//     utilityProps,
//     ignoredComponentProps.concat(config?.ignoreProps || [])
//   );

//   resolveUtilityProps(sxProps, cleanIncomingProps);

//   if (sxProps.style) {
//     sxProps.style = { ...cleanIncomingProps, ...sxProps?.style };
//   } else {
//     sxProps.style = { ...cleanIncomingProps };
//   }

//   console.log(sxProps, ignoredProps, "&&&&&");

//   return [sxProps, ignoredProps];
// }

export { omitUndefined, extractInObject };
