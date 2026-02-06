// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: {
        content: [
          './src/**/*.{js,ts,jsx,tsx,mdx}',
          './modules/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
          extend: {
            colors: {
              background: 'hsl(var(--background))',
              foreground: 'hsl(var(--foreground))',
            }
          }
        }
      }
    },
  },
};

export default config;
