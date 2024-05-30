const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require('@nextui-org/react');
const lightTheme = require('./src/styles/themes/light-theme');
const darkTheme = require('./src/styles/themes/dark-theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          redditMono: ['Reddit Mono', 'monospace'],
        },
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
    }),
  ],
};
