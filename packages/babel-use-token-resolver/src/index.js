/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const traverse = require('@babel/traverse');
const generate = require('@babel/generator').default;
const t = require('@babel/types');

function getNativeBaseConfig() {
  const isNativeBaseJSExist = fs.existsSync(
    path.join(process.cwd(), './nativebase.config.js')
  );
  const isNativeBaseTSExist = fs.existsSync(
    path.join(process.cwd(), './nativebase.config.ts')
  );

  if (isNativeBaseTSExist) {
    return fs.readFileSync(
      path.join(process.cwd(), './nativebase.config.ts'),
      'utf8'
    );
  }

  if (isNativeBaseJSExist) {
    return fs.readFileSync(
      path.join(process.cwd(), './nativebase.config.js'),
      'utf8'
    );
  }
}

const nativeBaseConfig = getNativeBaseConfig();

let config = {};
const ast = babel.parse(nativeBaseConfig);
babel.traverse(ast, {
  Program(path) {
    let nodePath;
    path.traverse({
      ExpressionStatement(path) {
        path.traverse({
          AssignmentExpression(path) {
            if (
              path.node.left.object.name === 'module' &&
              path.node.left.property.name === 'exports'
            ) {
              nodePath = path.node.right;
            }
          },
        });
      },
      ObjectProperty(path) {
        if (path.node.key.name) {
          path.node.key.name = `"${path.node.key.name}"`;
        }
        if (t.isNumericLiteral(path.node.key)) {
          path.node.key.value = `"${path.node.key.value}"`;
        }
      },
    });
    config = JSON.parse(generate(nodePath).code);
  },
});

module.exports = function (babel) {
  const { types: t } = babel;

  // let isImportedFromGlueStack = false;
  let importLocalIdentifierName = '';
  const argumentsAsArray = [];

  function resolveToken(property, token, fallback) {
    if (Array.isArray(token)) {
      let fallbackArr = [];
      if (fallback) {
        fallbackArr = Array.isArray(fallback) ? fallback : [fallback];
      }
      return token.map((currentToken, index) => {
        if (typeof currentToken === 'string' && currentToken.startsWith('$')) {
          const originalToken = currentToken.slice(1);
          if (originalToken.includes('.')) {
            const [tokenA, tokenB] = originalToken.split('.');
            return (
              config?.tokens?.[property]?.[tokenA]?.[tokenB] ??
              fallbackArr[index]
            );
          } else {
            return (
              config?.tokens?.[property]?.[originalToken] ?? fallbackArr[index]
            );
          }
        }

        return currentToken;
      });
    } else {
      if (typeof token === 'string' && token.startsWith('$')) {
        const originalToken = token.slice(1);
        if (originalToken.includes('.')) {
          const [tokenA, tokenB] = originalToken.split('.');
          return (
            config?.tokens?.[property]?.[tokenA][tokenB] ?? fallback ?? token
          );
        } else {
          return (
            config?.tokens?.[property]?.[originalToken] ?? fallback ?? token
          );
        }
      }
    }

    return token;
  }

  return {
    visitor: {
      Program(programPath) {
        programPath.traverse({
          ImportSpecifier(importSpecifierPath) {
            if (
              importSpecifierPath?.parent?.source?.value ===
                '@gluestack/styled' &&
              importSpecifierPath?.node?.imported?.name === 'useToken'
            ) {
              // isImportedFromGlueStack = true;
              importLocalIdentifierName =
                importSpecifierPath?.node?.local?.name;
            }
          },
          VariableDeclarator(variableDeclaratorPath) {
            if (
              variableDeclaratorPath?.get('init')?.node?.type ===
              'CallExpression'
            ) {
              // const initializerNode =
              //   variableDeclaratorPath.get('id').node.name;
              const callExpressionName =
                variableDeclaratorPath?.get('init')?.node?.callee?.name;
              const callExpressionArgs =
                variableDeclaratorPath?.get('init')?.node?.arguments;
              if (
                callExpressionName === importLocalIdentifierName &&
                callExpressionArgs?.length > 0 &&
                callExpressionArgs?.length <= 3
              ) {
                callExpressionArgs.forEach((arg, index) => {
                  if (arg?.type === 'ArrayExpression') {
                    const arr = [];
                    arg?.elements?.forEach((arrValue) => {
                      arr.push(arrValue.value);
                    });

                    argumentsAsArray[index] = arr;
                  } else {
                    argumentsAsArray[index] = arg?.value;
                  }
                });
                const resolvedToken = resolveToken(
                  argumentsAsArray[0],
                  argumentsAsArray[1],
                  argumentsAsArray[2]
                );
                variableDeclaratorPath?.get('init')?.remove();
                if (typeof resolvedToken === 'string') {
                  variableDeclaratorPath.node.init =
                    t.stringLiteral(resolvedToken);
                } else if (typeof resolvedToken === 'number') {
                  variableDeclaratorPath.node.init =
                    t.numberLiteral(resolvedToken);
                } else {
                  const resolvedTokenArray = resolvedToken?.map(
                    (tokenValue) => {
                      if (typeof tokenValue === 'number') {
                        return t.numberLiteral(tokenValue);
                      } else if (typeof tokenValue === 'string') {
                        return t.stringLiteral(tokenValue);
                      }
                    }
                  );
                  variableDeclaratorPath.node.init =
                    t.arrayExpression(resolvedTokenArray);
                }
              }
            }
          },
        });
      },
    },
  };
};
