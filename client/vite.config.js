import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs' // for tls encryption
import path from 'path' // for tls encryption


export default defineConfig({
  plugins: [react()],
   server: {
     https: {
       key: fs.readFileSync(path.resolve('../server', 'key.pm')),
       cert: fs.readFileSync(path.resolve('../server', 'cert.pm')),
     },
   },
});
