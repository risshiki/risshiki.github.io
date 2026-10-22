import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { profile, contact, experience, education, skills } from './src/data/resume.js'

const SITE = 'https://www.rpisipat.com'

// Schema.org Person graph, injected into index.html at build time so crawlers and
// agents get structured data without executing the app.
function jsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    url: SITE,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: [contact.linkedin, contact.github],
    knowsAbout: skills.flatMap((group) => group.items),
    worksFor: experience.map((job) => ({
      '@type': 'Organization',
      name: job.company,
    })),
    alumniOf: education.map((school) => ({
      '@type': 'EducationalOrganization',
      name: school.school,
    })),
  }

  const base = process.env.VITE_BASE || '/'

  return {
    name: 'inject-agent-metadata',
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(data),
        injectTo: 'head',
      },
      // Discovery hints for agents that read the head rather than the rendered page.
      {
        tag: 'link',
        attrs: { rel: 'alternate', type: 'text/plain', href: `${base}llms.txt`, title: 'llms.txt' },
        injectTo: 'head',
      },
      {
        tag: 'link',
        attrs: {
          rel: 'alternate',
          type: 'text/plain',
          href: `${base}llms-full.txt`,
          title: 'Full resume as markdown',
        },
        injectTo: 'head',
      },
      {
        tag: 'link',
        attrs: {
          rel: 'alternate',
          type: 'application/json',
          href: `${base}resume.json`,
          title: 'JSON Resume',
        },
        injectTo: 'head',
      },
    ],
  }
}

// Vite's static server sends .txt files as bare `text/plain`, so browsers fall back to
// Windows-1252 and garble the UTF-8 dashes in llms.txt. GitHub Pages already sends a
// charset; this makes dev and preview match it.
function utf8Text() {
  const TYPE = 'text/plain; charset=utf-8'

  // The static server passes its headers straight to writeHead, so patch there and
  // cover both the headers argument and anything already set with setHeader.
  const addCharset = (req, res, next) => {
    if (/\.txt(\?|$)/.test(req.url ?? '')) {
      const writeHead = res.writeHead.bind(res)
      res.writeHead = (status, ...rest) => {
        const headers = rest.find((arg) => arg && typeof arg === 'object')
        for (const key of Object.keys(headers ?? {})) {
          if (key.toLowerCase() === 'content-type' && headers[key] === 'text/plain') headers[key] = TYPE
        }
        if (res.getHeader('content-type') === 'text/plain') res.setHeader('Content-Type', TYPE)
        return writeHead(status, ...rest)
      }
    }
    next()
  }

  // Block bodies on purpose: Vite treats a function returned from these hooks as a
  // post-middleware hook, and middlewares.use() returns the connect app.
  return {
    name: 'utf8-text',
    configureServer(server) {
      server.middlewares.use(addCharset)
    },
    configurePreviewServer(server) {
      server.middlewares.use(addCharset)
    },
  }
}

// `VITE_BASE` is set by the GitHub Actions workflow so the built asset URLs match
// the Pages URL (`/<repo>/` for a project site, `/` for a `<user>.github.io` site).
export default defineConfig({
  plugins: [react(), jsonLd(), utf8Text()],
  base: process.env.VITE_BASE || '/',
})
