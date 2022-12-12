import React from "react";
import { config } from "./nativebase.config";
import { Platform, StyleSheet } from "react-native";
import type {
  ConfigType,
  IStates,
  state,
  StylePropsConfig,
  SxProps,
  ThemeType,
} from "./types";
import { isNil, omit, omitBy, pick } from "lodash";

function resolveAliasesFromConfig(config: any, props: any) {
  let aliasResolvedProps: any = {};
  Object.keys(props).map((key) => {
    if (config.aliases[key]) {
      aliasResolvedProps[config.aliases[key]] = props[key];
    } else {
      aliasResolvedProps[key] = props[key];
    }
  });
  return aliasResolvedProps;
}

function resolveTokensFromConfig(config: any, props: any) {
  const newProps: any = {};
  Object.keys(props).map((prop: any) => {
    let value = props[prop];

    if (typeof value === "string" && value.startsWith("$")) {
      const tempValue = value.substring(1);
      if (tempValue.includes(".")) {
        const [token, variant] = tempValue.split(".");
        newProps[prop] = config[token]?.[variant];
      } else {
        newProps[prop] = config[tempValue];
      }
    } else {
      // TODO: Add support for prop value that are not string/number.. From NB core uSSPR
      // newProps[prop] = typeof value === "number" ? value : parseInt(value);
      newProps[prop] = value;
    }
  });

  return newProps;
}

function applyStylesBasedOnSpecificty(
  specificityMap: any,
  stylesheetObj: any,
  resolvedCompThemeStyle: any
) {
  return specificityMap.map((key: any) => {
    return [resolvedCompThemeStyle[key], stylesheetObj[key]];
  });
}

function resolvedTokenization(props: any, config: any) {
  let aliasedResolvedProps = resolveAliasesFromConfig(config, props);
  let newProps = resolveTokensFromConfig(config, aliasedResolvedProps);
  return newProps;
}

const resolveSxRecursive = (
  sx: SxProps = {},
  config: StylePropsConfig,
  states: IStates,
  colorMode: string,
  styleSheetsObj: any,
  resolveDecendantStyles: any,
  parent: any = ""
) => {
  Object.keys(sx).forEach((key) => {
    if (key === "style") {
      let resolvedStyle = resolvedTokenization(sx?.style, config);

      if (parent && parent != "style") {
        if (styleSheetsObj[parent]) {
          styleSheetsObj[parent].push(resolvedStyle);
        } else {
          styleSheetsObj[parent] = [resolvedStyle];
        }
      } else {
        if (styleSheetsObj?.style) {
          styleSheetsObj.style.push(resolvedStyle);
        } else {
          styleSheetsObj.style = [resolvedStyle];
        }
      }
    } else {
      if (key === "state") {
        if (states) {
          const stateObject: any = Object.keys(states);

          stateObject.forEach((state: state) => {
            //@ts-ignore
            console.log(state, sx[key][state], "IState");

            //@ts-ignore
            if (states[state] && sx[key][state]) {
              resolveSxRecursive(
                //@ts-ignore
                sx[key][state],
                config,
                states,
                colorMode,
                styleSheetsObj,
                resolveDecendantStyles,
                key
              );
            }
          });
        }
      } else if (key === "platform") {
        const platformKey = Platform.OS;
        //@ts-ignore
        if (sx[key][platformKey]) {
          resolveSxRecursive(
            //@ts-ignore
            sx[key][platformKey],
            config,
            states,
            colorMode,
            styleSheetsObj,
            resolveDecendantStyles,
            key
          );
        }
      } else if (key === "colorMode") {
        //@ts-ignore
        if (sx[key][colorMode]) {
          resolveSxRecursive(
            //@ts-ignore
            sx[key][colorMode],
            config,
            states,
            colorMode,
            styleSheetsObj,
            resolveDecendantStyles,
            key
          );
        }
      } else if (key === "descendants") {
        //@ts-ignore
        const descendantsArray: any = Object.keys(sx[key]);
        //@ts-ignore
        Object.keys(sx[key]).forEach((descKey) => {
          let decendantStyle = [] as any;
          resolveSxRecursive(
            //@ts-ignore
            sx[key][descKey],
            config,
            states,
            colorMode,
            decendantStyle,
            resolveDecendantStyles,
            parent
          );
          if (!resolveDecendantStyles[descKey]) {
            resolveDecendantStyles[descKey] = {};
          }
          if (resolveDecendantStyles[descKey]) {
            if (parent && parent != "style") {
              if (resolveDecendantStyles[descKey][parent]) {
                resolveDecendantStyles[descKey][parent].push(
                  decendantStyle[parent]
                );
              } else {
                resolveDecendantStyles[descKey][parent] = [
                  decendantStyle[parent],
                ];
              }
            } else {
              if (resolveDecendantStyles[descKey]?.style) {
                resolveDecendantStyles[descKey].style.push(
                  decendantStyle.style
                );
              } else {
                resolveDecendantStyles[descKey].style = [decendantStyle.style];
              }
            }
          }
        });
      }
    }
  });
  return styleSheetsObj;
};

function resolveSx(
  { sx, variant, size, colorMode, states }: any,
  compTheme: any
) {
  let styleSheetsObj = [] as any;

  let resolvedDecendantStyles = {} as any;
  let resolvedCompThemeStyle = [] as any;
  resolveSxRecursive(
    compTheme.baseStyle,
    config,
    states,
    colorMode,
    resolvedCompThemeStyle,
    resolvedDecendantStyles
  );

  // Resolve variants:
  if (variant) {
    resolveSxRecursive(
      compTheme.variants[variant],
      config,
      states,
      colorMode,
      styleSheetsObj,
      resolvedDecendantStyles
    );
  }
  // Resolve size:
  if (size) {
    resolveSxRecursive(
      compTheme.sizes[size],
      config,
      states,
      colorMode,
      styleSheetsObj,
      resolvedDecendantStyles
    );
  }
  let tokenResolvedProps;
  if (sx) {
    const { ...remainingSx } = sx;
    resolveSxRecursive(
      remainingSx,
      config,
      states,
      colorMode,
      styleSheetsObj,
      resolvedDecendantStyles
    );
  }

  let mergedDecendantStylesBasedOnSpecificity = {} as any;

  Object.keys(resolvedDecendantStyles).forEach((descendant) => {
    mergedDecendantStylesBasedOnSpecificity[descendant] = {};
    mergedDecendantStylesBasedOnSpecificity[descendant] =
      applyStylesBasedOnSpecificty(
        ["style", "colorMode", "platform", "state"],
        resolvedDecendantStyles[descendant],
        {}
      );
  });
  return {
    styleSheetsObj: applyStylesBasedOnSpecificty(
      ["style", "colorMode", "platform", "state"],
      styleSheetsObj,
      resolvedCompThemeStyle
    ),
    resolveContextChildrenStyle: mergedDecendantStylesBasedOnSpecificity,
  };
}

// Wont work in nested resolution of pseudo props
function resolveContextChildrenStyle(config: any, theme: any, props: any) {
  let resolvedStyle = {} as any;

  if (config?.forwardStyle) {
    let forwardStyle = new Array(config?.forwardStyle);
    forwardStyle.map((key) => {
      resolvedStyle[key] = resolveSx(props, theme[key]);
    });
  }
  return resolvedStyle;
}

export function omitUndefined(obj: any) {
  return omitBy(obj, isNil);
}

export function extractInObject(parent: any, values: Array<string>) {
  return [
    omitUndefined(pick(parent, values)),
    omitUndefined(omit(parent, values)),
  ];
}

const UTILITY_PROPS_MAP: any = {
  state: {
    _hover: "hover",
    _active: "active",
    _focus: "focus",
  },
  platform: {
    _web: "web",
    _android: "android",
    _ios: "ios",
  },
  colorMode: {
    _light: "light",
    _dark: "dark",
  },
};

const ignoredComponentProps = [
  "children",
  "onPress",
  "onBlur",
  "onFocus",
  "onHoverIn",
  "onHoverOut",
  "onPressIn",
  "onPressOut",
];

function resolveUtilityProps(sxProps: any = {}, utilityProps: any) {
  Object.keys(utilityProps).forEach((property) => {
    if (UTILITY_PROPS_MAP.state[property]) {
      if (sxProps?.state?.[UTILITY_PROPS_MAP.state[property]]?.style) {
        sxProps.state[UTILITY_PROPS_MAP.state[property]].style = {
          ...utilityProps[property],
          ...sxProps.state[UTILITY_PROPS_MAP.state[property]]?.style,
        };
      } else {
        sxProps.state[UTILITY_PROPS_MAP.state[property]] = {
          style: { ...utilityProps[property] },
        };
      }
      delete utilityProps[property];
    }
    if (UTILITY_PROPS_MAP.platform[property]) {
      if (sxProps?.platform?.[UTILITY_PROPS_MAP.platform[property]]?.style) {
        sxProps.platform[UTILITY_PROPS_MAP.platform[property]].style = {
          ...utilityProps[property],
          ...sxProps.platform[UTILITY_PROPS_MAP.platform[property]]?.style,
        };
      } else {
        sxProps.platform[UTILITY_PROPS_MAP.platform[property]] = {
          style: { ...utilityProps[property] },
        };
      }
      delete utilityProps[property];
    }
    if (UTILITY_PROPS_MAP.colorMode[property]) {
      if (sxProps?.colorMode?.[UTILITY_PROPS_MAP.colorMode[property]]?.style) {
        sxProps.colorMode[UTILITY_PROPS_MAP.colorMode[property]].style = {
          ...utilityProps[property],
          ...sxProps.colorMode[UTILITY_PROPS_MAP.colorMode[property]]?.style,
        };
      } else {
        sxProps.colorMode[UTILITY_PROPS_MAP.colorMode[property]] = {
          style: { ...utilityProps[property] },
        };
      }
      delete utilityProps[property];
    }
  });
  // return sxProps;
}

function utilityPropsResolution(
  sxProps: any = {},
  utilityProps: any,
  config?: any
) {
  const [ignoredProps, cleanIncomingProps] = extractInObject(
    utilityProps,
    ignoredComponentProps.concat(config?.ignoreProps || [])
  );

  resolveUtilityProps(sxProps, cleanIncomingProps);

  if (sxProps.style) {
    sxProps.style = { ...cleanIncomingProps, ...sxProps?.style };
  } else {
    sxProps.style = { ...cleanIncomingProps };
  }

  console.log(sxProps, ignoredProps, "&&&&&");

  return [sxProps, ignoredProps];
}

export function styled<P>(
  Component: React.ComponentType<P> & SxProps,
  theme: ThemeType,
  compConfig: ConfigType
) {
  let NewComp = (properties: any, ref: any) => {
    let mergedProps = {
      ...theme?.defaultProps,
      ...properties,
    };

    let { children, sx, variant, size, states, colorMode, ...props } =
      mergedProps;

    // const [modifiedSxProps, ignoredProps] = utilityPropsResolution(sx, props);

    // console.log(
    //   modifiedSxProps,
    //   ignoredProps,
    //   "modifiedSxPropsWithUtilityProps"
    // );

    const newStyle = resolveSx(
      {
        sx,
        variant,
        states,
        colorMode: colorMode ?? "light",
        size,
      },
      theme
    );

    console.log(newStyle, "***");
    console.log("Changed", sx, props);

    const styleSheetObj = StyleSheet.create(newStyle.styleSheetsObj);

    return (
      <Component style={styleSheetObj} {...props} ref={ref}>
        {typeof children === "function"
          ? children({
              resolveContextChildrenStyle: newStyle.resolveContextChildrenStyle,
            })
          : children}
      </Component>
    );
  };

  let StyledComp = React.forwardRef(NewComp);
  // @ts-ignore
  StyledComp.config = compConfig;
  return StyledComp;
}
