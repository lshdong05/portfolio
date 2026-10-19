import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
http.createServer((req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if(!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200, {'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    fs.createReadStream(file).pipe(res);
  } catch {res.writeHead(400);res.end('Bad request');}
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
