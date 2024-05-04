const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            text: '#2e2d2d',
            background: '#f7f7f7',
            primary: {
              50: '#FDF5CF',
              100: '#FCF1BB',
              200: '#FAEA94',
              300: '#F8E26D',
              400: '#F7DA46',
              500: '#F5D21F',
              600: '#D3B209',
              700: '#9D8407',
              800: '#675705',
              900: '#312A02',
              950: '#171301',
            },
          },
        },
      },
    }),
  ],
};
