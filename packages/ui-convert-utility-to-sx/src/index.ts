import { CSSPropertiesMap, reservedKeys } from './styled-system';
import { getObjectParentProperty, setObjectKeyValue } from './utils';

const resolveResponsiveProps = (
  sxPropsConvertedObj: any,
  responsiveProp: any,
  path: any,
  prop: any,
  componentProps: any
) => {
  const sxResolvedResponsiveProp = setObjectKeyValue(
    {},
    path,
    componentProps[prop]
  );

  if (sxPropsConvertedObj.queries) {
    const existingBeakpointIndex = sxPropsConvertedObj?.queries?.findIndex(
      (data: any) => data.condition === `$${responsiveProp}`
    );

    if (existingBeakpointIndex !== -1) {
      setObjectKeyValue(
        sxPropsConvertedObj.queries[existingBeakpointIndex].value,
        path,
        componentProps[prop]
      );
    } else {
      sxPropsConvertedObj?.queries?.push({
        condition: `$${responsiveProp}`,
        value: sxResolvedResponsiveProp,
      });
    }
  } else {
    sxPropsConvertedObj.queries = [];
    sxPropsConvertedObj?.queries?.push({
      condition: `$${responsiveProp}`,
      value: sxResolvedResponsiveProp,
    });
  }
};

const createSxPropertyPath = (
  styledSystemProps: any,
  propsString: any,
  mediaQueries: any
) => {
  let responsiveProp = '';
  const sxPropPath = propsString.split('-');
  const genratedPath: any = [];
  let isInvalidProperty = false;
  const sxProperties: any = {};

  if (sxPropPath) {
    sxPropPath.forEach((prop: any) => {
      if (isInvalidProperty) return;

      if (prop.startsWith('_') && styledSystemProps[prop]) {
        genratedPath.push('descendants', prop);
      } else if (styledSystemProps[prop]) {
        genratedPath.push('style', prop);
      } else {
        if (mediaQueries[prop]) {
          if (!responsiveProp) {
            responsiveProp = prop;
          } else {
            isInvalidProperty = true;
            return;
          }
        } else {
          const parentProperty = getObjectParentProperty(reservedKeys, prop);

          if (parentProperty && sxProperties[parentProperty]) {
            isInvalidProperty = true;
            return;
          }

          sxProperties[parentProperty] = true;
          // Check if the property is a valid styled system prop
          if (!parentProperty) {
            if (styledSystemProps[prop]) {
              genratedPath.push('style', prop);
            } else {
              isInvalidProperty = true;
              return;
            }
          } else {
            genratedPath.push(parentProperty, prop);
          }
        }
      }
    });

    // if (isInvalidProperty) return propsString;
  }
  return {
    path: isInvalidProperty ? propsString : genratedPath,
    responsiveProp,
  };
};

export const convertUtilityPropsToSX = (
  aliases: any,
  descendants: any,
  mediaQueries: any,
  componentProps: any
) => {
  const sxPropsConvertedObj: any = {};
  const ignoredProps: any = {};

  const styledSystemProps = {
    ...CSSPropertiesMap,
    ...aliases,
    ...descendants,
  };

  Object.keys(componentProps).forEach((prop) => {
    if (prop.includes('-')) {
      const { path, responsiveProp } = createSxPropertyPath(
        styledSystemProps,
        prop,
        mediaQueries
      );
      if (path !== prop) {
        if (responsiveProp) {
          resolveResponsiveProps(
            sxPropsConvertedObj,
            responsiveProp,
            path,
            prop,
            componentProps
          );
        } else {
          setObjectKeyValue(sxPropsConvertedObj, path, componentProps[prop]);
        }
      } else {
        ignoredProps[prop] = componentProps[prop];
      }
    } else if (styledSystemProps[prop]) {
      setObjectKeyValue(
        sxPropsConvertedObj,
        ['style', prop],
        componentProps[prop]
      );
    } else {
      ignoredProps[prop] = componentProps[prop];
    }
  });
  return { sxProps: sxPropsConvertedObj, ignoredProps: ignoredProps };
};
