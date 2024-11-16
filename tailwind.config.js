/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#ffffff',
        'secondary-color': '#000000',
        'accent-color-1': '#ffdc94',
        'text-primary': '#ffffff',
        'text-secondary': '#a7a7a7',
        'text-neutral': '#c8c8c8',
        'background-primary': '#144675',
        'background-secondary': '#668eca',
        'background-neutral': '#141414',
      },
    },
    fontFamily: {
      'roboto': ["Roboto Mono", 'monospace']
    },
    borderRadius: {
      'none': '0',
      'sm': '4px',
      'md': '8px',
      'lg': '16px',
      'full': '9999px',
    }

  },
  plugins: [],
}

