// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Add your content paths here
      config: {
        content: [
          './src/**/*.{js,ts,jsx,tsx,mdx}',
          './modules/**/*.{js,ts,jsx,tsx,mdx}', // ← ADD THIS LINE
        ],
        theme: {
          extend: {
            colors: {
              background: 'hsl(var(--background))',
              foreground: 'hsl(var(--foreground))',
              // Add other shadcn colors if needed
            }
          }
        }
      }
    },
  },
};

export default config;
