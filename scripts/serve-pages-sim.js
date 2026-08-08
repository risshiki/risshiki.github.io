// Serves dist/ the way GitHub Pages does: static files if they exist, otherwise
// 404.html with a 404 status. Used to verify the deployed build locally.
// Not part of the deploy — run with `node scripts/serve-pages-sim.js`.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const ROOT = new URL('../dist/', import.meta.url).pathname
const PORT = 4173

const TYPES = {
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  // Strip the leading slash so a crafted path can't climb out of dist/.
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '')
  const candidate = join(ROOT, rel.endsWith('/') ? `${rel}index.html` : rel)

  try {
    const body = await readFile(candidate)
    res.writeHead(200, { 'content-type': TYPES[extname(candidate)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    // Pages serves 404.html for anything missing. If the build hasn't produced one
    // yet, say so plainly rather than throwing and taking the whole server down.
    try {
      const fallback = await readFile(join(ROOT, '404.html'))
      res.writeHead(404, { 'content-type': 'text/html' })
      res.end(fallback)
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.end('404 — and dist/404.html is missing. Run: cp dist/index.html dist/404.html\n')
    }
  }
}).listen(PORT, () => console.log(`Pages simulation on http://localhost:${PORT}`))
