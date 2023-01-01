import sort from 'storybook-multilevel-sort';
const order = {
  'layout': {},
  'forms': {},
  'data display': {},
  'feedback': {},
  'typography': {},
  'overlay': {},
  'disclosure': {},
  'media and icons': {},
  'transition': {},
  'others': {},
  '**': { 'play ground': null },
};
export const parameters = {
  options: {
    storySort: (story1, story2) => sort(order, story1, story2),
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    // inlineStories: false,
  },
};
