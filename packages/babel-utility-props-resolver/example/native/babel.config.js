const path = require('path');
const myBabel = require('../../src/index.js');
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      myBabel,
      [
        'module-resolver',
        {
          alias: {
            // For development, we want to alias the library to the source
            ['@gluestack/babel-utility-props-resolver']: path.join(
              __dirname,
              '../../src/index.js'
            ),
          },
        },
      ],
    ],
  };
};
