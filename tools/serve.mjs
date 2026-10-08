// serve.mjs — tiny static server for local preview of dist/.
// No dependencies, no build step: it mirrors what a static host does.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('dist');
const PORT = Number(process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const send = async (res, file, status = 200) => {
  const body = await readFile(file);
  res.writeHead(status, {
    'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': path.extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600',
  });
  res.end(body);
};

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let p;
    try {
      p = decodeURIComponent(url.pathname);
    } catch {
      res.writeHead(400).end('Bad request');
      return;
    }

    const file = path.normalize(path.join(ROOT, p));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end();
      return;
    }

    try {
      const s = await stat(file);
      if (s.isDirectory()) {
        // extensionless URLs resolve to the directory index, like a static host
        if (!p.endsWith('/')) {
          res.writeHead(301, { Location: `${p}/` }).end();
          return;
        }
        return await send(res, path.join(file, 'index.html'));
      }
      return await send(res, file);
    } catch {
      try {
        const clean = path.join(ROOT, `${p}.html`);
        if (await stat(clean).then((x) => x.isFile()).catch(() => false)) return await send(res, clean);
      } catch { /* fall through to 404 */ }
      try {
        return await send(res, path.join(ROOT, '404.html'), 404);
      } catch {
        res.writeHead(404).end('Not found');
      }
    }
  })
  .listen(PORT, '0.0.0.0', () => console.log(`ENIAC — serving dist/ on http://localhost:${PORT}`));
