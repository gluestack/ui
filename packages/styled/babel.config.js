const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      process.env.NODE_ENV !== 'production'
        ? [
            'module-resolver',
            {
              alias: {
                // For development, we want to alias the library to the source
                ['@gluestack/media-query']: path.join(
                  __dirname,
                  '../media-query/src'
                ),
                ['@gluestack/css-injector']: path.join(
                  __dirname,
                  '../css-injector/src'
                ),

                ['@gluestack/cssify']: path.join(__dirname, '../cssify/src'),
                ['@gluestack/config']: path.join(__dirname, '../config/src'),
                ['@gluestack/ui-convert-utility-to-sx']: path.join(
                  __dirname,
                  '../ui-convert-utility-to-sx'
                ),
              },
            },
          ]
        : ['transform-remove-console'],
    ],
  };
};
