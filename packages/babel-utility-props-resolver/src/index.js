/* eslint-disable no-console */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
module.exports = function (babel) {
  const { types: t } = babel;
  let gluestackElements = [];
  let originalSx = [];
  const ignoredComponentProps = [
    'children',
    'onPress',
    'onBlur',
    'onFocus',
    'onHoverIn',
    'onHoverOut',
    'onPressIn',
    'onPressOut',
    'variant',
    'sx',
  ];
  const propMapping = {
    focus: 'state',
    hover: 'state',
    active: 'state',
    ios: 'platform',
    android: 'platform',
    web: 'platform',
    light: 'colorMode',
  };

  console.log('Hello worldddkjnkdnbkdfbkfkbj');

  const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  };

  const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  };

  const resolveRecurssively = (attributesProperties, newSx, attributeName) => {
    attributesProperties.forEach((prop) => {
      // SECOND LEVEL
      if (prop.key.name[0] === '_') {
        let secattributeName = prop.key.name.slice(1);
        if (!propMapping[secattributeName]) {
          secattributeName = '_' + secattributeName;
        }
        const secattributesProperties = prop.value.properties;
        resolveRecurssively(
          secattributesProperties,
          newSx[propMapping[attributeName]][attributeName],
          secattributeName
        );
      } else {
        let propName = '';
        if (propMapping[attributeName]) {
          propName = propMapping[attributeName];
        } else {
          propName = 'descendants';
        }
        if (!newSx.hasOwnProperty(propName)) {
          newSx[propName] = {};
        }
        if (newSx[propName].hasOwnProperty(attributeName)) {
          if (newSx[propName][attributeName].hasOwnProperty('style')) {
          } else {
            newSx[propName][attributeName]['style'] = {};
          }
        } else {
          newSx[propName][attributeName] = {};
          newSx[propName][attributeName]['style'] = {};
        }
        newSx[propName][attributeName]['style'][prop.key.name] =
          prop.value.value;
      }
    });
  };

  const createNewSxPropFromUtilityProps = (attributes, newSx) => {
    attributes.forEach((item) => {
      let attributeName = item.node.name.name;
      if (!ignoredComponentProps.includes(attributeName)) {
        // FIRST LEVEL
        if (attributeName[0] === '_') {
          attributeName = attributeName.slice(1);
          if (!propMapping[attributeName]) {
            attributeName = '_' + attributeName;
          }
          const attributesProperties = item.node.value.expression.properties;
          resolveRecurssively(attributesProperties, newSx, attributeName);
        } else {
          const propName = 'style';
          if (!newSx.hasOwnProperty(propName)) {
            newSx[propName] = {};
          }
          newSx.style[attributeName] = item.node.value.value;
        }
      } else {
        if (attributeName === 'sx') {
        }
      }
    });
  };

  return {
    visitor: {
      Program(programPath) {
        programPath.traverse({
          ImportSpecifier(importSpecifierPath) {
            if (importSpecifierPath.parent.source.value === '@gluestack/ui') {
              gluestackElements.push(importSpecifierPath.node.local.name);
            }
          },
          JSXOpeningElement(jsxIdentifierPath) {
            let openingElementName = jsxIdentifierPath.node.name.name;
            let newSx = {};
            if (!openingElementName) {
              openingElementName = jsxIdentifierPath.node.name.object.name;
              console.log(openingElementName);
            }
            if (gluestackElements.includes(openingElementName)) {
              const attributes = jsxIdentifierPath.get('attributes');
              createNewSxPropFromUtilityProps(attributes, newSx);
            }
          },
        });
      },
    },
  };
};
