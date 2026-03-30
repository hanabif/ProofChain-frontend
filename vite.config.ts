import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'terminal-logger',
      configureServer(server) {
        console.log('\n\x1b[36m[TERMINAL DEBUG] Terminal Logger Plugin Registered\x1b[0m\n');
        server.middlewares.use((req, res, next) => {
          // Use startsWith just in case there are query params or trailing slashes
          if (req.url && req.url.startsWith('/api/debug/log-token') && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const token = data.token;
                console.log('\n\x1b[35m[TERMINAL DEBUG] USER ACCESS TOKEN RECEIVED:\x1b[0m');
                console.log('\x1b[32m' + token + '\x1b[0m\n');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Logged to terminal');
              } catch (e) {
                console.error('[TERMINAL DEBUG] Error parsing JSON:', e);
                res.statusCode = 400;
                res.end('Invalid JSON');
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 3000
  }
})
