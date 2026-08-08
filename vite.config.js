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

  return {
    name: 'inject-json-ld',
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(data),
        injectTo: 'head',
      },
    ],
  }
}

// `VITE_BASE` is set by the GitHub Actions workflow so the built asset URLs match
// the Pages URL (`/<repo>/` for a project site, `/` for a `<user>.github.io` site).
export default defineConfig({
  plugins: [react(), jsonLd()],
  base: process.env.VITE_BASE || '/',
})
