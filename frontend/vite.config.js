// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env
process.env = { ...process.env, ...dotenv.config().parsed };

export default defineConfig({
  plugins: [react()],

  // Other Vite configurations...

  // For example, if you need to set the base URL dynamically:
  base: process.env.VITE_BASE_URL || '/',

  // You can add other Vite configurations here...
});
