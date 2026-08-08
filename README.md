# Rishi Pisipati — Portfolio

Resume portfolio site built with React 19, Vite, and React Router, deployed to GitHub Pages via GitHub Actions.

## Local development

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

Other scripts:

- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint

## Structure

```
src/
  data/resume.js      # All resume content — single source of truth for every page
  components/         # Layout, Nav, Footer, PageHeader, TagList, ThemeToggle
  pages/              # Home, Experience, Projects, Skills, Education, Awards, Contact, NotFound
  styles/index.css    # Design tokens + all component styles
.github/workflows/deploy.yml
```

To update content, edit `src/data/resume.js` — the pages read from it, so no JSX changes are needed for
new roles, projects, skills, or awards.

## Deploying

The workflow at `.github/workflows/deploy.yml` builds and publishes on every push to `main`
(and on manual dispatch). One-time setup on GitHub:

1. Push this repo to GitHub.
2. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The site publishes to `https://<user>.github.io/<repo>/`.

Two details the workflow handles automatically:

- **Base path** — assets need to be served from `/<repo>/` on a project site but from `/` on a
  `<user>.github.io` site. The workflow detects which and passes it to Vite as `VITE_BASE`; the
  router picks the same value up through `import.meta.env.BASE_URL`.
- **Deep links** — GitHub Pages has no SPA rewrite, so the build copies `index.html` to `404.html`.
  Loading `/experience` directly serves that fallback and the router renders the right page.
