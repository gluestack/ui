// @ts-nocheck
import React, { useContext, useEffect, useRef, useState } from 'react';
import { inject } from '@gluestack/css-injector';
import type { ConfigType, ThemeType } from './types';
import { Cssify } from '@gluestack/cssify';
import { pseudoResolveSx } from './pseudoResolver';

import { StyledButton } from '../example/native/StyledButton';
// import { nbConfig } from './../../';

// setTimeout(() => {
// let config = getConfig();
// console.log(config, '*****');

// const css = Cssify.create(
//   {
//     xyz: {
//       style: {
//         background: 'red',
//       },
//       condition: '@media (min-width: 640px)',
//       colorMode: 'dark',
//     },
//   },
//   'style'
// );

// console.log(css, 'css object');

// });
import {
  resolveThemeAndIdGenerator,
  getDefaultStyleFromIds,
  getVariantDefaultStylesFromIds,
  // getStateStyleCSSFromStyleIds,
  toBeInjectedCssRulesRuntime,
  toBeInjectedCssRulesBoottime,
  resolvedTokenization,
  resolveTokensFromConfig,
} from './utils';
import { forEach } from 'lodash';
import { getConfig } from './config';

// *******
//

type StyledValue = { [key: string]: any }; // This contains aliases and tokens
type CSSObject = { [key: string]: any };
type PLATFORMS = 'ios' | 'android' | 'web' | 'mobile';
type COLORMODES = 'dark' | 'light';
type STATES = 'hover' | 'active' | 'focus' | 'focusVisible';
type Path = Array<string>;
type QueryType = {
  condition: string;
  value: SX;
};

type QueryTypeResolved = {
  original: QueryType;
  resolved: QueryType;
};
type SX = {
  style?: StyledValue;
  queries?: Array<QueryType>;
  platform?: { [K in PLATFORMS]?: SX };
  colorMode?: { [K in COLORMODES]?: SX };
  state?: { [K in STATES]?: SX };
  descendants?: { [key: string]: SX };
};
type SXResolved = {
  styledValueResolvedWithMeta: StyledValueResolvedWithMeta;
  queriesResolved: Array<QueryTypeResolved>;
  colorMode?: { [key: string]: SXResolved };
  state?: { [key: string]: SXResolved };
  descendants?: { [key: string]: SXResolved };
};
type Styled = {
  baseStyle: SX;
  variants: { [key: string]: SX };
  sizes: { [key: string]: SX };
};
type StyledResolved = {
  baseStyle: SXResolved;
  variants: { [key: string]: SXResolved };
  sizes: { [key: string]: SXResolved };
};
type StyledValueResolvedWithMeta = {
  original: StyledValue;
  resolved: CSSObject;
  meta: {
    path?: Path;
    weight?: number;
    cssId: string;
    cssRuleset: string;
    colorMode?: string;
    queryCondition?: string;
  };
};
type OrderedSXResolved = Array<StyledValueResolvedWithMeta>;
type Config = {
  alias: { [K: string]: any };
  tokens: {
    colors: { [K: string]: any };
    mediaQueries: { [K: string]: any };
  };
};
function getCSSIdAndRuleset(
  styleValueResolvedWithMeta: StyledValueResolvedWithMeta
  // path: Path
) {
  let dataType: any = 'style';
  // if (styleValueResolvedWithMeta.meta.path.includes('state')) {
  //   // dataType = 'state';
  // } else if (styleValueResolvedWithMeta.meta.path.includes('queries')) {
  //   // dataType = 'media';
  // } else if (styleValueResolvedWithMeta.meta.path.includes('colorMode')) {
  //   // dataType = 'media';
  // }
  let toBeInjectedStyle = { style: styleValueResolvedWithMeta.resolved };

  if (
    styleValueResolvedWithMeta.meta.queryCondition &&
    styleValueResolvedWithMeta.meta.colorMode
  ) {
    toBeInjectedStyle.condition =
      styleValueResolvedWithMeta.meta.queryCondition;
    toBeInjectedStyle.colorMode = styleValueResolvedWithMeta.meta.colorMode;
  } else if (styleValueResolvedWithMeta.meta.queryCondition) {
    toBeInjectedStyle.condition =
      styleValueResolvedWithMeta.meta.queryCondition;
  } else if (styleValueResolvedWithMeta.meta.colorMode) {
    toBeInjectedStyle.colorMode = styleValueResolvedWithMeta.meta.colorMode;
  }

  //
  const cssObject = Cssify.create({ style: toBeInjectedStyle }, dataType);

  return cssObject;
  // return { cssId: ids.style, cssRuleset: rules.style };
}

function getWeightBaseOnPath(path: Path) {
  const weightObject = {
    styled: [],
    sx: [],
    state: [],
  };
  const STYLED_PRECENDENCE = {
    baseStyle: 1,
    variants: 2,
    sizes: 3,
  };

  const SX_PRECEDENCE = {
    style: 1,
    platform: 2,
    colorMode: 3,
    queries: 4,
    state: 5,
    descendants: 6,
  };
  const STATE_PRECENDENCE = {
    hover: 1,
    focus: 2,
    focusVisible: 3,
    active: 4,
  };
  // style.baseStyle
  // style.variants
  // style.sizes

  const tempPath = [...path];

  for (let i = 0; i < tempPath.length; i++) {
    const currentValue = tempPath[i];

    let stateType = '';
    switch (currentValue) {
      case 'queries':
        i = i + 2;
        break;
      case 'state':
        stateType = tempPath[i + 1];
        i = i + 1;
        break;
      case 'descendants':
        break;
      default:
    }

    // if (currentValue === 'descendants') {
    //   break;
    // }

    if (STYLED_PRECENDENCE[currentValue]) {
      weightObject.styled.push(STYLED_PRECENDENCE[currentValue]);
    }

    if (SX_PRECEDENCE[currentValue]) {
      weightObject.sx.push(SX_PRECEDENCE[currentValue]);
    }
    if (currentValue === 'state' && STATE_PRECENDENCE[stateType]) {
      weightObject.state.push(STATE_PRECENDENCE[stateType]);
    }
  }

  weightObject.styled = weightObject.styled.reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  weightObject.sx = weightObject.sx.reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  weightObject.state = weightObject.state.reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  let weightedStyleString = '';
  if (weightObject.styled < 10) {
    weightedStyleString = '0' + weightObject.styled;
  } else {
    weightedStyleString = '' + weightObject.styled;
  }

  let weightedSxString = '';
  if (weightObject.sx < 10) {
    weightedSxString = '0' + weightObject.sx;
  } else {
    weightedSxString = '' + weightObject.sx;
  }

  let weightedStateString = '';
  if (weightObject.state < 10) {
    weightedStateString = '0' + weightObject.state;
  } else {
    weightedStateString = '' + weightObject.state;
  }

  return parseInt(weightedStateString + weightedSxString + weightedStyleString);
}

export function sxToSXResolved(sx: SX, path: Path = [], meta: any): SXResolved {
  const resolvedCSSStyle = StyledValueToCSSObject(sx?.style);

  const config = getConfig();

  const styledValueResolvedWithMeta = {
    original: sx?.style,
    resolved: resolvedCSSStyle,
    meta: {
      ...meta,
      path,
      weight: getWeightBaseOnPath(path),
      // cssId: ,
      // cssRuleset: ,
    },
  };

  // console.log(styledValueResolvedWithMeta.meta, 'path here 111');

  // console.log(sx, '********');
  const ret = {
    styledValueResolvedWithMeta: styledValueResolvedWithMeta,
    queriesResolved: sx?.queries
      ? sx.queries.map((query, index) => {
          const resolvedCondition = resolveTokensFromConfig(config, {
            condition: query.condition,
          }).condition;

          const sxResolvedValue = sxToSXResolved(
            query.value,
            [...path, 'queries', index, query.condition],
            { queryCondition: resolvedCondition }
          );

          if (sxResolvedValue?.styledValueResolvedWithMeta) {
            sxResolvedValue.styledValueResolvedWithMeta.meta.queryCondition =
              resolvedCondition;
          }

          return {
            original: {
              condition: query.condition,
              value: query.value,
            },
            resolved: {
              condition: resolvedCondition,
              value: {
                ...sxResolvedValue,
              },
            },
          };
        })
      : undefined,
    platform: sx?.platform
      ? Object.keys(sx.platform).reduce(
          (acc, key) => ({
            ...acc,
            [key]: sxToSXResolved(
              sx.platform[key],
              [...path, 'platform', key],
              meta
            ),
          }),
          {}
        )
      : undefined,
    colorMode: sx?.colorMode
      ? Object.keys(sx.colorMode).reduce((acc, key) => {
          const sxResolved = sxToSXResolved(
            sx.colorMode[key],
            [...path, 'colorMode', key],
            { colorMode: key }
          );

          if (sxResolved?.styledValueResolvedWithMeta) {
            sxResolved.styledValueResolvedWithMeta.meta.colorMode = key;
          }
          return {
            ...acc,
            [key]: sxResolved,
          };
        }, {})
      : undefined,
    state: sx?.state
      ? Object.keys(sx.state).reduce(
          (acc, key) => ({
            ...acc,
            [key]: sxToSXResolved(sx.state[key], [...path, 'state', key], meta),
          }),
          {}
        )
      : undefined,
    descendants: sx?.descendants
      ? Object.keys(sx.descendants).reduce(
          (acc, key) => ({
            ...acc,
            [key]: sxToSXResolved(
              sx.descendants[key],
              [...path, 'descendants', key],
              meta
            ),
          }),
          {}
        )
      : undefined,
  };

  // CSS computation based on Meta data
  // const { cssId, cssRuleset } = getCSSIdAndRuleset(
  //   ret.styledValueResolvedWithMeta,
  //   path
  // );

  // if(ret.queriesResolved) {
  //   // access the ret.queriesResolved[i].resolved.condition
  // }

  // console.log(ret.queriesResolved, 'ret ****');
  // console.log(ret.colorMode, 'colorMode ret ****');
  // ret.styledValueResolvedWithMeta.meta.cssId = cssId;
  // ret.styledValueResolvedWithMeta.meta.cssRuleset = cssRuleset;

  return ret;
}
export function StyledValueToCSSObject(input: StyledValue): CSSObject {
  if (!input) {
    return {};
  }
  // return input;
  const config = getConfig();
  return resolvedTokenization(input, config);
}
export function SXResolvedToOrderedSXResolved(
  sxResolved: SXResolved
): OrderedSXResolved {
  let orderedSXResolved = [];
  if (sxResolved?.styledValueResolvedWithMeta?.original) {
    orderedSXResolved = [sxResolved.styledValueResolvedWithMeta];
  }

  if (sxResolved?.platform) {
    Object.keys(sxResolved.platform).forEach((key) => {
      const platformSXResolved = sxResolved.platform[key];
      // platformSXResolved.styledValueResolvedWithMeta.meta.weight =
      //   SX_STYLE_PRECEDENCE.platform;
      orderedSXResolved.push(
        ...SXResolvedToOrderedSXResolved(platformSXResolved)
      );
    });
  }
  if (sxResolved?.colorMode) {
    Object.keys(sxResolved.colorMode).forEach((key) => {
      const colorModeSXResolved = sxResolved.colorMode[key];
      // colorModeSXResolved.styledValueResolvedWithMeta.meta.weight =
      //   SX_STYLE_PRECEDENCE.colorMode;

      orderedSXResolved.push(
        ...SXResolvedToOrderedSXResolved(colorModeSXResolved)
      );
    });
  }
  if (sxResolved?.queriesResolved) {
    sxResolved.queriesResolved.forEach((queryResolved) => {
      // querySXResolved.styledValueResolvedWithMeta.meta.weight =
      //   SX_STYLE_PRECEDENCE.queries;

      orderedSXResolved.push(
        ...SXResolvedToOrderedSXResolved(queryResolved.resolved.value)
      );
      // orderedSXResolved.push(
      //   queryResolved.resolved.value.styledValueResolvedWithMeta
      // );
    });
  }
  if (sxResolved?.state) {
    Object.keys(sxResolved.state).forEach((key) => {
      const stateSXResolved = sxResolved.state[key];
      // stateSXResolved.styledValueResolvedWithMeta.meta.weight =
      //   SX_STYLE_PRECEDENCE.state + (STATE_PRECENDENCE[key] || 0) / 100;
      orderedSXResolved.push(...SXResolvedToOrderedSXResolved(stateSXResolved));
      // orderedSXResolved.push(stateSXResolved.styledValueResolvedWithMeta);
    });
  }
  if (sxResolved?.descendants) {
    Object.keys(sxResolved.descendants).forEach((key) => {
      const descendantSXResolved = sxResolved.descendants[key];
      orderedSXResolved.push(
        ...SXResolvedToOrderedSXResolved(descendantSXResolved)
      );
    });
  }
  return orderedSXResolved.sort((a, b) => a.meta.weight - b.meta.weight);
}
export function styledToStyledResolved(
  styled: Styled,
  path: Path = []
): StyledResolved {
  return {
    baseStyle: styled?.baseStyle
      ? sxToSXResolved(styled.baseStyle, [...path, 'baseStyle'])
      : undefined,
    variants: styled?.variants
      ? Object.keys(styled.variants).reduce(
          (acc, key) => ({
            ...acc,
            [key]: sxToSXResolved(styled.variants[key], [
              ...path,
              'variants',
              key,
            ]),
          }),
          {}
        )
      : undefined,
    sizes: styled?.sizes
      ? Object.keys(styled.sizes).reduce(
          (acc, key) => ({
            ...acc,
            [key]: sxToSXResolved(styled.sizes[key], [...path, 'sizes', key]),
          }),
          {}
        )
      : undefined,
  };
}

// export function flattenStyledResolvedWithMeta(styledResolved: StyledResolved) {
//   const flattedStyledResolvedArray = [];
//   flattedStyledResolvedArray.push(
//     styledResolved.baseStyle.styledValueResolvedWithMeta
//   );
//   Object.keys(styledResolved)
// }
export function styledResolvedToOrderedSXResolved(
  styledResolved: StyledResolved
): OrderedSXResolved {
  const orderedSXResolved: OrderedSXResolved = [
    ...SXResolvedToOrderedSXResolved(styledResolved.baseStyle),
  ];

  if (styledResolved.variants) {
    Object.keys(styledResolved.variants).forEach((key) => {
      const variantSXResolved = styledResolved.variants[key];
      // variantSXResolved.styledValueResolvedWithMeta.meta.weight =
      //   STYLED_PRECENDENCE.variants;
      orderedSXResolved.push(
        ...SXResolvedToOrderedSXResolved(variantSXResolved)
      );
    });
  }

  if (styledResolved.sizes) {
    Object.keys(styledResolved.sizes).forEach((key) => {
      const sizeSXResolved = styledResolved.sizes[key];
      // sizeSXResolved.styledValueResolvedWithMeta.meta.weight =
      //   STYLED_PRECENDENCE.sizes;
      orderedSXResolved.push(...SXResolvedToOrderedSXResolved(sizeSXResolved));
    });
  }

  return orderedSXResolved.sort((a, b) => a.meta.weight - b.meta.weight);
}

function updateCSSStyleInOrderedResolved(orderedSXResolved: OrderedSXResolved) {
  orderedSXResolved.forEach((styleResolved: StyledValueResolvedWithMeta) => {
    const cssData = getCSSIdAndRuleset(styleResolved);
    styleResolved.meta.cssId = cssData.ids.style;
    styleResolved.meta.cssRuleset = cssData.rules.style;
  });
}

function injectInStyle(orderedSXResolved: OrderedSXResolved, styleTagId: any) {
  let toBeInjectedCssRules = '';

  orderedSXResolved.forEach((styleResolved: StyledValueResolvedWithMeta) => {
    toBeInjectedCssRules += styleResolved.meta.cssRuleset;
  });

  if (styleTagId) {
    console.log(toBeInjectedCssRules, orderedSXResolved, 'hello here 11188');
    inject(`@media screen {${toBeInjectedCssRules}}`, styleTagId);
  } else {
    inject(`@media screen {${toBeInjectedCssRules}}`, 'css-injected-boot-time');
  }

  // console.log(toBeInjectedCssRulesBoottime, 'injected style');
}
// *******

function getDefaultStyle(styles: OrderedSXResolved) {
  return styles.filter(
    (style) =>
      !(
        style.meta.path.includes('state') ||
        style.meta.path.includes('variants') ||
        style.meta.path.includes('sizes') ||
        style.meta.path.includes('descendants')
      )
  );
}

function getDefaultStyleIds(styles) {
  return styles.map((style) => style.meta.cssId);
}

type StyleIds = {
  defaultAndState: DefaultAndState;
  variants: {
    [key: string]: DefaultAndState;
  };
  sizes: {
    [key: string]: DefaultAndState;
  };
};

function checkAndPush(item, ret, keyToCheck, isMap = false) {
  if (
    item.meta.path.includes(keyToCheck) &&
    !item.meta.path.includes('state')
  ) {
    ret.default.push(item.meta.cssId);
    return;
  }

  if (item.meta.path.includes(keyToCheck) && item.meta.path.includes('state')) {
    const state = item.meta.path[item.meta.path.lastIndexOf('state') + 1];
    if (!ret.state[state]) {
      ret.state[state] = [];
    }

    ret.state[state].push(item.meta.cssId);
  }
}

// function getAllDescendantStyles(styles: OrderedSXResolved) {
//   return styles.filter((style) => style.meta.path.includes('descendants'));
// }

// function getDescendantStyles(styles: OrderedSXResolved, key: string) {
//   return styles.filter(
//     (style) =>
//       style.meta.path.includes('descendants') && style.meta.path.includes(key)
//   );
// }

// function getDescendantStylesIds(styles: OrderedSXResolved) {
//   return styles.map((style) => style.meta.cssId);
// }

// function getDefaultAndStateIds(arr: OrderedSXResolved): DefaultAndState {
//   //
//   const ret: DefaultAndState = {
//     default: [],
//     state: {},
//   };

//   for (let i in arr) {
//     const item = arr[i];
//     checkAndPush(item, ret, '', false);
//   }

//   console.log(ret, 'ret ....');
//   return ret;
// }

function getComponentStyleIds(arr: OrderedSXResolved): StyleIds {
  const ret: StyleIds = {
    defaultAndState: {
      default: [],
      state: {},
    },
    variants: {},
    sizes: {},
  };

  for (let i in arr) {
    const item = arr[i];
    checkAndPush(item, ret.defaultAndState, 'baseStyle', false);

    let variantName = '';

    if (item?.meta?.path?.includes('variants')) {
      variantName = item.meta.path[item.meta.path.indexOf('variants') + 1];

      if (!ret.variants[variantName])
        ret.variants[variantName] = { default: [], state: {} };

      checkAndPush(item, ret.variants[variantName], 'variants', true);
    }

    if (item?.meta?.path?.includes('sizes')) {
      variantName = item.meta.path[item.meta.path.indexOf('sizes') + 1];

      if (!ret.sizes[variantName])
        ret.sizes[variantName] = { default: [], state: {} };

      checkAndPush(item, ret.sizes[variantName], 'sizes', true);
    }
  }

  return ret;
}

function getDescendantStyleIds(arr: any, descendantStyle: any = []): StyleIds {
  const ret = {};
  // return ret;
  descendantStyle.forEach((style) => {
    // ret[style] = {
    //   defaultAndState: {
    //     default: [],
    //     state: {},
    //   },
    //   variants: {},
    //   sizes: {},
    // };

    ret[style] = getComponentStyleIds(arr);

    // for (let i in arr) {
    //   const item = arr[i];

    //   console.log(item, 'item here');
    //   // checkAndPush(item, ret[style].defaultAndState, 'baseStyle', false);

    //   // let variantName = '';
    //   // if (item?.meta?.path?.includes('variants')) {
    //   //   variantName = item.meta.path[item.meta.path.indexOf('variants') + 1];

    //   //   if (!ret[style].variants[variantName])
    //   //     ret[style].variants[variantName] = { default: [], state: {} };

    //   //   checkAndPush(item, ret.variants[variantName], 'variants', true);
    //   // }

    //   // if (item?.meta?.path?.includes('sizes')) {
    //   //   variantName = item.meta.path[item.meta.path.indexOf('sizes') + 1];

    //   //   if (!ret[style].sizes[variantName])
    //   //     ret[style].sizes[variantName] = { default: [], state: {} };

    //   //   checkAndPush(item, ret[style].sizes[variantName], 'sizes', true);
    //   // }

    //   // if (
    //   //   item.meta.path.includes(style) &&
    //   //   !item.meta.path.includes('state') &&
    //   //   item.meta.path.includes('descendants')
    //   // ) {
    //   //   //     console.log(item, item.meta.cssId, '*******');
    //   //   ret[style].defaultAndState.default.push(item.meta.cssId);
    //   // }
    //   // if (
    //   //   item.meta.path.includes(style) &&
    //   //   item.meta.path.includes('state') &&
    //   //   item.meta.path.includes('descendants')
    //   // ) {
    //   //   const state = item.meta.path[item.meta.path.indexOf('state') + 1];
    //   //   if (!ret[style].defaultAndState.state[state]) {
    //   //     ret[style].defaultAndState.state[state] = [];
    //   //   }
    //   //   ret[style].defaultAndState.state[state].push(item.meta.cssId);
    //   //   // console.log(item, '******* ret here');
    //   // }
    //   //   //checkAndPush(item, ret, 'sizes', true);
    // }
  });

  console.log(arr, ret, 'arr here');

  return ret;
}

// function getDecendantStyleIds(
//   { baseStyleMap, variantsMap, sizesMap }: any,
//   variant: any,
//   size: any
// ) {
//   let resolvedMapOfBaseStyleIds = getArrayOfIdsResolvedFromMap(baseStyleMap);
//   let resolvedMapOfVariantsIds = getArrayOfIdsResolvedFromMap(
//     variantsMap,
//     variant
//   );
//   let resolvedMapOfSizesIds = getArrayOfIdsResolvedFromMap(sizesMap, size);
//   return [
//     ...resolvedMapOfBaseStyleIds,
//     ...resolvedMapOfVariantsIds,
//     ...resolvedMapOfSizesIds,
//   ];
// }

function getStateStyleCSSFromStyleIds(styleIdObject: DefaultAndState, states) {
  let stateStyleCSSIds = [];

  // console.log(styleIdObject, states, 'styleIdObject');
  if (states?.hover && styleIdObject?.state?.hover) {
    stateStyleCSSIds.push(...styleIdObject?.state?.hover);
  }
  if (states?.focus && styleIdObject?.state?.focus) {
    stateStyleCSSIds.push(...styleIdObject?.state?.focus);
  }
  if (states?.active && styleIdObject?.state?.active) {
    stateStyleCSSIds.push(...styleIdObject?.state?.active);
  }
  if (states?.focusVisible && styleIdObject?.state?.focusVisible) {
    stateStyleCSSIds.push(...styleIdObject?.state?.focusVisible);
  }

  return stateStyleCSSIds;
}

const getMergeDescendantsStyleCSSIdsWithKey = (
  descendantStyles: any,
  variant: any,
  size: any
) => {
  const descendantStyleObj = {};

  Object.keys(descendantStyles).forEach((key) => {
    const styleObj = descendantStyles[key];

    const defaultBaseCSSIds = [];

    console.log(descendantStyles, 'hello here');
    defaultBaseCSSIds.push(...styleObj.defaultAndState.default);
    if (variant && styleObj.variants[variant]) {
      defaultBaseCSSIds.push(...styleObj.variants[variant].default);
    }
    if (size && styleObj.sizes[size]) {
      defaultBaseCSSIds.push(...styleObj.sizes[size].default);
    }
    descendantStyleObj[key] = defaultBaseCSSIds;

    // if (mergedDescendantStateStyles[key]) {
    //   // console.log(descendantStyleObj, descendantStyles[key], 'hello here ****');
    //   if (mergedDescendantStateStyles[key]) {
    //     descendantStyleObj[key].push(mergedDescendantStateStyles[key]);
    //   }
    // }
  });

  return descendantStyleObj;
};

const Context = React.createContext({});

const globalOrderedList: any = [];
setTimeout(() => {
  const orderedList = globalOrderedList.sort(
    (a, b) => a.meta.weight - b.meta.weight
  );
  injectInStyle(orderedList);
});

function getMergedStateCSSIds(
  componentStyleIds: StyleIds,
  states,
  variant,
  size
) {
  let stateStyleCSSIds = [];

  stateStyleCSSIds.push(
    ...getStateStyleCSSFromStyleIds(componentStyleIds.defaultAndState, states)
  );

  console.log(
    getStateStyleCSSFromStyleIds(componentStyleIds.defaultAndState, states),
    '&&&&&&&'
  );

  if (variant && componentStyleIds.variants[variant]) {
    stateStyleCSSIds.push(
      ...getStateStyleCSSFromStyleIds(
        componentStyleIds.variants[variant],
        states
      )
    );
  }

  if (size && componentStyleIds.sizes[size]) {
    stateStyleCSSIds.push(
      ...getStateStyleCSSFromStyleIds(componentStyleIds.sizes[size], states)
    );

    // console.log(
    //   getStateStyleCSSFromStyleIds(componentStyleIds.sizes[size], states),
    //   'hhhhhhh'
    // );
  }

  return stateStyleCSSIds;
}

function getMergedDefaultCSSIds(
  componentStyleIds: StyleIds,
  variant,
  size
  // compConfig: any
) {
  let defaultStyleCSSIds = [];

  defaultStyleCSSIds.push(...componentStyleIds.defaultAndState.default);

  if (variant && componentStyleIds.variants[variant]) {
    defaultStyleCSSIds.push(...componentStyleIds.variants[variant].default);
  }
  if (size && componentStyleIds.sizes[size]) {
    // console.log(componentStyleIds.sizes[size], componentStyleIds.sizes,'variants here');

    defaultStyleCSSIds.push(...componentStyleIds.sizes[size].default);
  }

  // // ancestor styles
  // let ancestorStyleIds: any[] = [];
  // if (compConfig.ancestorStyle?.length > 0) {
  //   compConfig.ancestorStyle.forEach((ancestor: any) => {
  //     if (contextValue[ancestor]) {
  //       ancestorStyleIds = contextValue[ancestor];
  //     }
  //   });
  // }

  // console.log('hello here', defaultStyleCSSIds);

  return defaultStyleCSSIds;
}

function getAncestorCSSStyleIds(compConfig: any, context: any) {
  let ancestorStyleIds: any[] = [];
  if (compConfig.ancestorStyle?.length > 0) {
    compConfig.ancestorStyle.forEach((ancestor: any) => {
      if (context[ancestor]) {
        ancestorStyleIds = context[ancestor];
      }
    });
  }

  return ancestorStyleIds;
}
function mergeArraysInObjects(obj1, obj2) {
  // Create an empty result object
  const result = {};

  // Loop through all the keys in both objects
  for (const key in obj1) {
    // Extract the arrays from the objects using the current key
    const arr1 = obj1[key] || [];
    const arr2 = obj2[key] || [];

    // Merge the arrays using the spread operator
    const merged = [...arr1, ...arr2];

    // Add the merged array to the result object
    result[key] = merged;
  }
  for (const key in obj2) {
    if (!obj1[key]) {
      result[key] = obj2[key];
    }
  }

  // Return the result object
  return result;
}
export function styled<P>(
  Component: React.ComponentType<P>,
  theme: ThemeType,
  compConfig: ConfigType
) {
  console.log('*********************', theme, compConfig);

  const styledResolved = styledToStyledResolved(theme);
  const orderedResovled = styledResolvedToOrderedSXResolved(styledResolved);
  updateCSSStyleInOrderedResolved(orderedResovled);
  //set css ruleset
  globalOrderedList.push(...orderedResovled);

  // StyleIds
  const componentStyleIds = getComponentStyleIds(
    orderedResovled.filter((item) => !item.meta.path?.includes('descendants'))
  );

  // Descendants
  const descendantStyleIds = getDescendantStyleIds(
    orderedResovled.filter((item) => item.meta.path?.includes('descendants')),
    compConfig.descendentStyle
  );

  // console.log(
  //   orderedResovled.filter((item) => item.meta.path?.includes('descendants')),
  //   'component style ids'
  // );

  const NewComp = (properties: any, ref: any) => {
    const mergedProps = {
      ...theme?.defaultProps,
      ...properties,
    };
    const { children, sx, variant, size, states, colorMode, ...props } =
      mergedProps;
    //
    const contextValue = useContext(Context);

    const applyComponentStyleCSSIds = getMergedDefaultCSSIds(
      componentStyleIds,
      variant,
      size
    );
    console.log(componentStyleIds, 'hello hee');
    const [applyComponentStateStyleIds, setApplyComponentStateStyleIds] =
      useState([]);

    const applyDescendantsStyleCSSIdsWithKey =
      getMergeDescendantsStyleCSSIdsWithKey(descendantStyleIds, variant, size);

    const [
      applyDescendantStateStyleCSSIdsWithKey,
      setApplyDescendantStateStyleCSSIdsWithKey,
    ] = useState({});

    // ancestorCSSStyleId
    const applyAncestorStyleCSSIds = getAncestorCSSStyleIds(
      compConfig,
      contextValue
    );

    // const [applyComponentStyleIds, setApplyComponentStyleIds] = useState([]);

    const sxComponentStyleIds = useRef({});
    const [applySxStyleCSSIds, setApplySxStyleCSSIds] = useState([]);
    const [applySxStateStyleCSSIds, setApplyStateSxStyleCSSIds] = useState([]);

    // Descendant resolution
    // let descendentCSSIds = {};
    const descendentCSSIds = React.useMemo(() =>
      mergeArraysInObjects(
        applyDescendantsStyleCSSIdsWithKey,
        applyDescendantStateStyleCSSIdsWithKey
      )
    );

    // SX resolution
    const styleTagId = useRef(
      `style-tag-${Math.random().toString().slice(2, 17)}`
    );
    // const [sxStyleIds, setSXStyleIds] = useState({});
    // inline sx props
    useEffect(() => {
      // create a new style tag with a unique ID and append it to the body
      let styleTag = document.getElementById(styleTagId.current);
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleTagId.current;
        document.body.appendChild(styleTag);
      }
      styleTag.innerHTML = '';
      const sxStyledResolved = styledToStyledResolved({ baseStyle: sx });
      const orderedSXResolved =
        styledResolvedToOrderedSXResolved(sxStyledResolved);

      updateCSSStyleInOrderedResolved(orderedSXResolved);
      injectInStyle(orderedSXResolved, styleTagId.current);

      // const sxComponentStyleIds =
      sxComponentStyleIds.current = getComponentStyleIds(orderedSXResolved);
      const sxStyleCSSIds = getMergedDefaultCSSIds(
        sxComponentStyleIds.current,
        variant,
        size
      );
      setApplySxStyleCSSIds(sxStyleCSSIds);

      // return a cleanup function to remove the style tag when the component unmounts
      return () => {
        const styleTag = document.getElementById(styleTagId.current);
        if (styleTag) {
          document.body.removeChild(styleTag);
        }
      };
    }, [sx]); // run the effect only once when the component mounts

    // Style ids resolution

    useEffect(() => {
      // for component style
      const mergedStateIds = getMergedStateCSSIds(
        componentStyleIds,
        states,
        variant,
        size
      );

      console.log(mergedStateIds, states, '*******>>>');
      setApplyComponentStateStyleIds(mergedStateIds);

      // for sx props
      const mergedSxStateIds = getMergedStateCSSIds(
        sxComponentStyleIds.current,
        states,
        variant,
        size
      );
      setApplyStateSxStyleCSSIds(mergedSxStateIds);

      // for descendants
      const mergedDescendantsStyle = {};
      Object.keys(descendantStyleIds).forEach((key) => {
        const mergedStyle = getMergedStateCSSIds(
          descendantStyleIds[key],
          states,
          variant,
          size
        );
        mergedDescendantsStyle[key] = mergedStyle;
      });
      setApplyDescendantStateStyleCSSIdsWithKey(mergedDescendantsStyle);
    }, [states]);

    const component = (
      <Component
        dataSet={{
          style:
            applyComponentStyleCSSIds.join(' ') +
            ' ' +
            applyComponentStateStyleIds.join(' ') +
            ' ' +
            applyAncestorStyleCSSIds.join(' ') +
            ' ' +
            applySxStyleCSSIds.join(' ') +
            ' ' +
            applySxStateStyleCSSIds.join(' '),
        }} // style
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    );

    if (compConfig.descendentStyle?.length > 0) {
      return (
        <Context.Provider value={descendentCSSIds}>
          {component}
        </Context.Provider>
      );
    }
    return component;
  };

  const StyledComp = React.forwardRef(NewComp);
  // @ts-ignore
  StyledComp.config = compConfig;
  return StyledComp;
}
