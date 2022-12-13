// @ts-nocheck
import React from "react";
import { config } from "./nativebase.config";
import { StyleSheet as RNStyleSheet } from "react-native";
import { StyleSheet } from "@gluestack/css-injector";
import { pseudoResolveSx } from "./pseudoResolver";
import type {
  ConfigType,
  IStates,
  state,
  StylePropsConfig,
  SxProps,
  ThemeType,
} from "./types";

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
      let resolvedStyle =
        typeof sx.style === "string"
          ? sx.style
          : resolvedTokenization(sx?.style, config);
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
            // console.log(state, sx[key][state], "IState");

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
        const platformKey = "web";
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
  let styleSheetsIdsObj = {} as any;
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
  // console.log(styleSheetsObj, resolvedCompThemeStyle, "styleSheetsObj");
  return {
    styleSheetsObj: applyStylesBasedOnSpecificty(
      ["style", "colorMode", "platform", "state"],
      styleSheetsObj,
      resolvedCompThemeStyle
    ),
    styleSheetsIdsObj,
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

function applyIdsBasedOnProps(
  { states, colorMode, platform = "web" }: any,
  styleSheetsIdsObj: any
) {
  // console.log("platform", styleSheetsIdsObj);
  let ids = "" as any;
  const StatesKeys = Object.keys(states);
  StatesKeys.forEach((state) => {
    if (states[state]) {
      let tempstr = ids;
      // console.log("tempstr", styleSheetsIdsObj.state[state][0].id);

      ids = tempstr + styleSheetsIdsObj.state[state][0].id + " ";
    }
  });
  if (styleSheetsIdsObj.colorMode && styleSheetsIdsObj.colorMode[colorMode]) {
    let tempstr = ids;
    ids = tempstr + styleSheetsIdsObj.colorMode[colorMode][0].id + " ";
  }
  if (styleSheetsIdsObj.platform?.[0]) {
    let tempstr = ids;
    ids = tempstr + styleSheetsIdsObj.platform[0].id + " ";
  }

  // if (states[]) {
  //   ids["state"] = styleSheetsIdsObj.state;
  // }

  return ids;
}

const refTheme = {
  baseStyle: {
    style: {
      color: "red",
      backgroundColor: "blue",
      "&:hover": {
        color: "green",
      },
    },
    colorMode: {
      dark: {
        style: {
          color: "white",
          backgroundColor: "black",
        },
      },
    },
    platform: {
      web: {
        style: {
          color: "yellow",
        },
      },
    },
    state: {
      hover: {
        style: {
          color: "purple",
        },
      },
    },
  },
};

function createAllCombinationFromTwoArrays(variants: any, sizes: any) {
  let arr = [] as any;
  sizes.forEach((item2: any) => {
    arr.push({ size: item2 });
  });
  variants.forEach((item1: any) => {
    arr.push({ variant: item1 });
    sizes.forEach((item2: any) => {
      arr.push({ variant: item1, size: item2 });
    });
  });
  return arr;
}

function resolveTheme(
  theme: any,
  config: any,
  resolvedStyleIds: any,
  parentPath: string,
  resolvedTheme: any
) {
  const variants = Object.keys(theme.variants ?? {});
  const sizes = Object.keys(theme.sizes ?? {});
  // Got all the vriants and sizes of the Component
  let possibleCombinations = createAllCombinationFromTwoArrays(variants, sizes);
  // console.log(possibleCombinations, "variants, sizes");

  // loop over the combination and create the style sheet
  let resolvedCombinationStyles = {} as any;
  // console.log(createCombinationsOfObjectofBooleans(states));

  possibleCombinations.forEach((combination: any) => {
    resolvedCombinationStyles[
      (combination.variant ?? "") + (combination.size ?? "")
    ] = pseudoResolveSx(
      {
        ...combination,
        states: { hover: true, focus: true, pressed: true, focusVisible: true },
      },
      theme,
      config
    );
  });
  console.log(resolvedCombinationStyles, "resolvedCombinationStyles");

  Object.keys(theme).forEach((themeKey: string) => {
    if (themeKey === "style") {
      let resolvedStyle = resolvedTokenization(theme[themeKey], config);
      let styleId = StyleSheet.create({ comp: resolvedStyle });
      // @ts-ignore
      resolvedStyleIds[parentPath] = styleId.ids.comp;
      // @ts-ignore
      resolvedTheme["style"] = styleId.ids.comp;
    } else {
      resolveTheme(
        theme[themeKey],
        config,
        resolvedStyleIds,
        parentPath + "/" + themeKey,
        resolvedTheme[themeKey]
      );
    }
  });
  return resolvedTheme;
}

function checkIfPathIsSameTillLastLevel(path1: string, path2: string) {
  const path1Arr = path1.split("/");
  const path2Arr = path2.split("/");
  if (path1Arr.length !== path2Arr.length) {
    return false;
  }
  for (let i = 0; i < path1Arr.length - 1; i++) {
    if (path1Arr[i] !== path2Arr[i]) {
      return false;
    }
  }
  return true;
}

const STATE_KEYS_PRECEDENCE = {
  hover: 100,
  focus: 200,
  active: 400,
  focusVisible: 300,
};

function traverseSx(sx: any, parentPath: string, map: any) {
  Object.keys(sx).forEach((key: string) => {
    if (key === "style") {
      console.log(parentPath, "parentPath");

      if (parentPath.split("/")[parentPath.split("/").length - 2] === "state") {
        const pathKey = parentPath.startsWith("/")
          ? parentPath.slice(1)
          : parentPath;
        map[pathKey] = {
          style: sx[key],
          level: pathKey.split("/").length,
        };
      }
    } else {
      traverseSx(sx[key], parentPath + "/" + key, map);
    }
  });
}
function seggregateBasedOnLevelOfPath(map: any) {
  let levelMap = {} as any;
  Object.keys(map).forEach((key: string) => {
    if (levelMap[map[key].level]) {
      levelMap[map[key].level].push({ ...map[key], key });
    } else {
      levelMap[map[key].level] = [{ ...map[key], key }];
    }
  });
  let newMap = resolveStyleInMapAndInjectCSS(levelMap);
  // let newMap = levelMap;
  return newMap;
}
function removeSubArrayFromArray(arr: any, subArr: any) {
  if (subArr.length === 0) return [arr, []];
  let newArr = [] as any;
  let remNewArr = [] as any;
  arr.forEach((item: any) => {
    if (!subArr.includes(item.key)) {
      newArr.push(item);
    } else {
      remNewArr.push(item);
    }
  });

  return [newArr, remNewArr];
}

function createAllPossibleCombinationOfStringInAnArray(arr: any) {
  let combinations = [] as any;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let itemCombinations = item as any;
    for (let j = 0; j < arr.length; j++) {
      if (i !== j) {
        itemCombinations = itemCombinations + "/" + arr[j];
      }
    }
    combinations.push(itemCombinations);
  }
  return combinations;
}

function createCombinationsOfStatesBasedOnPrecendence(
  StatesArray: Array<string>,
  Precendence: Object,
  pathsArr: any
) {
  console.log(
    ">>>>> Paths Array Here!! inside createCombinationsOfStatesBasedOnPrecendence",
    StatesArray
  );

  let newStateArray = [] as any;
  let temp = {} as any;
  for (let i = 0; i < StatesArray.length; i++) {
    // let stateInd = StatesArray.findIndex(
    //   (node: any) => node.state === Precendence[i]
    // );
    // if (stateInd !== -1) {
    //   newStateArray.push(StatesArray[stateInd].path);
    // }
    temp[Precendence[StatesArray[i].state]] = StatesArray[i].path;
  }
  Object.keys(temp).forEach((key: string) => {
    newStateArray.push(temp[key]);
  });
  console.log(
    ">>>>>Temp Paths Array Here!! inside createCombinationsOfStatesBasedOnPrecendence",
    newStateArray,
    temp
  );

  let result = [] as any;
  for (let i = 0; i < newStateArray.length; i++) {
    for (let j = i; j < newStateArray.length; j++) {
      //   let i = j;
      //   let res = { style: {}, key: newStateArray[j].path.key, level: 0 };
      //   console.log("result", Precendence[newStateArray[i].state]);
      //   for (let k = j; k < newStateArray.length; k++) {

      //     if (
      //       Precendence[newStateArray[j].state] <
      //       Precendence[newStateArray[k].state]
      //     ) {
      //       res = {
      //         style: { ...res.style, ...newStateArray[k].path.style },
      //         key: res.key + "/" + newStateArray[k].path.key,
      //         level: (res.key + "/" + newStateArray[k].path).split("/").length,
      //       };
      //     }
      //   }
      //   result.push(res);
      // }

      let res = { style: [], key: "", level: 0 };
      for (let k = i; k <= j; k++) {
        res = {
          style:
            typeof newStateArray[k].style === "string" && res.style
              ? [...res.style, newStateArray[k].style]
              : { ...res.style, ...newStateArray[k].style },
          key: res.key + "/" + newStateArray[k].key,
          level: (res.key + "/" + newStateArray[k]).split("/").length,
        };
      }
      result.push(res);
    }
  }
  console.log(">>>>> Result Here!!", result);

  return result;
}

function createCombinationOfKeysFromPaths(paths: any, mergePaths: any) {
  let combinations = {} as any;
  let levels = Object.keys(paths);
  console.log(">>>>> Paths Here!!", mergePaths);

  levels.forEach((level: string) => {
    let pathsArr = [] as any;
    paths[level].forEach((path: any) => {
      pathsArr.push(path);
    });
    let levelCombinations = [] as any;
    let statesAvailable = [] as any;

    pathsArr.forEach((path: any) => {
      statesAvailable.push({
        state: path.key.split("/")[path.key.split("/").length - 1],
        path,
      });
    });
    console.log("pathsArr>>>>", statesAvailable);
    let statesCombinations = createCombinationsOfStatesBasedOnPrecendence(
      statesAvailable,
      STATE_KEYS_PRECEDENCE,
      pathsArr
    );
    // console.log("pathsArr>>>>", statesAvailable);
    combinations[level] = statesCombinations;
    console.log(statesCombinations, mergePaths, ">>>>>.@!!");
  });

  // return combinations;
  let finalCombinations = {} as any;
  Object.keys(combinations).forEach((level: string) => {
    finalCombinations[level] = [
      ...combinations[level],
      ...(mergePaths[level] ?? []),
    ];
  });
  // console.log(finalCombinations, mergePaths, ">>>>>.@!!");
  return finalCombinations;
}
function filterNonSamePaths(paths: any) {
  // return paths
  let filteredPaths = {} as any;
  let filteredRemPaths = {} as any;
  Object.keys(paths).forEach((level: string) => {
    let isSame = false;
    let sameLevelPaths = [...paths[level]];
    let Copy = [...paths[level]];
    let badPaths = {} as any;
    let badArray = [] as any;
    if (sameLevelPaths.length > 1) {
      for (let i = 0; i < sameLevelPaths.length; i++) {
        for (let j = i + 1; j < sameLevelPaths.length; j++) {
          if (
            checkIfPathIsSameTillLastLevel(
              sameLevelPaths[i].key,
              sameLevelPaths[j].key
            )
          ) {
            badPaths[sameLevelPaths[i].key] = false;
            badPaths[sameLevelPaths[j].key] = false;
            isSame = true;
          } else {
            badPaths[sameLevelPaths[i].key] = true;
            badPaths[sameLevelPaths[j].key] = true;
          }
        }
      }

      Object.keys(badPaths).forEach((path: string) => {
        if (badPaths[path]) {
          badArray.push(path);
        }
      });
      const [newArr, remArr] = removeSubArrayFromArray(
        sameLevelPaths,
        badArray
      );
      filteredPaths[level] = newArr;
      filteredRemPaths[level] = remArr;
    } else {
      console.log(sameLevelPaths, level, "sameLevelPaths");
      filteredPaths[level] = sameLevelPaths;
    }

    // if (!isSame) {
    //   filteredPaths.push(path);
    // }
  });
  console.log(filteredPaths, "filteredPaths");
  let filteredComb = createCombinationOfKeysFromPaths(
    filteredPaths,
    filteredRemPaths
  );
  console.log(filteredComb, "filteredComb");

  return filteredComb;
}
function traverseThroughThemeAndGenerateStateObj({ theme, stateMap }: any) {
  // Object.keys(theme).forEach((themeKey: string) => {
  //   if(themeKey === "baseStyle") {
  //     let map =
  //     traverseSx(theme[themeKey], parentPath, stateMap);
  //   }
  // });
  traverseSx(theme.baseStyle, "", stateMap);
  Object.keys(theme.variants ?? {}).forEach((variant: string) => {
    traverseSx(theme.variants[variant], variant, stateMap);
  });
  Object.keys(theme.sizes ?? {}).forEach((size: string) => {
    traverseSx(theme.sizes[size], size, stateMap);
  });
  // traverseSx(theme.baseStyle, parentPath, stateMap);
  // traverseSx(theme.baseStyle, parentPath, stateMap);
}
function cloneObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
function resolveStyleInMapAndInjectCSS(map: any) {
  let res = {} as any;
  Object.keys(map).forEach((level: string) => {
    let paths = [...map[level]];
    paths.forEach((path: any) => {
      // @ts-ignore
      path.style = StyleSheet.create(
        { box: resolvedTokenization(path.style, config) },
        "state"
      ).ids.box;
    });
    res[level] = paths;
    // style[styleKey] = styleObj;
  });
  return res;
}
function checkIfArrayContainsArray(superset: any, subset: any) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value: any) {
    return superset.indexOf(value) >= 0;
  });
}
// states=>["hover", "focus", "active", "disabled"]     style=>[{"style": ["cssinjected-517510ba"],"key": "/state/hover","level": 2}]
function validateStyleBasedOnState(style: any, states: Array<string>) {
  let res = false;
  // console.log("res1>>>", style, states);

  // styles.forEach((style: any) => {
  let styleKey = style.key;
  let styleKeyArr = styleKey.split("/");
  console.log(Object.keys(STATE_KEYS_PRECEDENCE), "res1");
  let styleKeyStates = styleKeyArr.filter((name: string) => {
    return Object.keys(STATE_KEYS_PRECEDENCE).includes(name);
  });
  // if (states.length === styleKeyStates) {
  //   if (checkIfArrayContainsArray(states, styleKeyStates)) {
  //     res = true;
  //   }
  // }
  if (checkIfArrayContainsArray(states, styleKeyStates)) {
    res = true;
  }
  // });

  return res;
}
function getArrayOfIdsFromMapBasedOnState(newMap: any, states: any) {
  let availablestates = Object.keys(states).map((state: string) =>
    states[state] ? state : ""
  );
  console.log(availablestates, states, "availablestates");

  let res = [] as any;
  Object.keys(newMap).forEach((level: string) => {
    let paths = [...newMap[level]];
    // validateStyleBasedOnState(paths, availablestates);
    paths.forEach((path: any) => {
      // availablestates.forEach((state: string) => {
      if (validateStyleBasedOnState(path, availablestates)) {
        res.push(path);
      }
      // });
    });
  });

  return res;
}

function getIdsFromMap(map: any) {
  let res = [] as any;
  map.forEach((path: string) => {
    if (Array.isArray(path.style)) {
      res.push(...path.style);
    }
    // paths.forEach((path: any) => {
    //   res.push(path);
    // });
  });

  return res;
}

export function styled<P>(
  Component: React.ComponentType<P>,
  theme: ThemeType,
  compConfig: ConfigType
) {
  let resolvedStyleIds = {} as any;
  let resolvedTheme = cloneObject(theme) as any;
  resolveTheme(theme, config, resolvedStyleIds, "theme", resolvedTheme);
  let stateMap = {} as any;
  traverseThroughThemeAndGenerateStateObj({ theme, stateMap });
  // console.log(stateMap, seggregateBasedOnLevelOfPath(stateMap), "stateMap");
  let newMap = filterNonSamePaths(seggregateBasedOnLevelOfPath(stateMap));
  console.log(newMap, "newMap");

  let NewComp = (properties: any, ref: any) => {
    let mergedProps = {
      ...theme?.defaultProps,
      ...properties,
    };

    let { children, sx, variant, size, states, colorMode, ...props } =
      mergedProps;
    // console.log("result", getArrayOfIdsFromMapBasedOnState(newMap, states));

    const newStyle = resolveSx(
      {
        sx,
        variant,
        states,
        colorMode: colorMode ?? "light",
        size,
      },
      resolvedTheme
    );
    // console.log(newStyle, "newStyle");

    // const xyz = applyIdsBasedOnProps(
    //   { variant, states, colorMode: colorMode ?? "light", size },
    //   newStyle.styleSheetsIdsObj
    // );
    // const styleSheetObj = RNStyleSheet.create(newStyle.styleSheetsObj);
    // console.log("sjhgj ", StyleSheet.create(newStyle.styleSheetsObj));
    console.log(">>>><<<<<<", states);

    return (
      <Component
        dataSet={{
          media: resolvedStyleIds["theme/baseStyle"],
          state: getIdsFromMap(
            getArrayOfIdsFromMapBasedOnState(newMap, states)
          ).join(" "),
        }}
        {...props}
        ref={ref}
      >
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