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

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`.

This repo is `risshiki/risshiki.github.io`. It serves at <https://risshiki.github.io/> and, via the
custom domain configured in Pages settings, at <https://www.rpisipat.com/>.

Note: because deployment goes through a custom Actions workflow rather than a branch, GitHub ignores
any `CNAME` file in the build output — the custom domain lives in the repo's Pages settings only.
Don't add one expecting it to take effect.

Two details the workflow handles automatically:

- **Base path** — assets are served from `/` on a `<user>.github.io` site but from `/<repo>/` on a
  project site. The workflow reads the repo name out of `GITHUB_REPOSITORY` and passes the right
  value to Vite as `VITE_BASE`; the router picks it up through `import.meta.env.BASE_URL`. Rename
  the repo and the base follows automatically — no code change needed.
- **Deep links** — GitHub Pages has no SPA rewrite, so the build copies `index.html` to `404.html`.
  Loading `/experience` directly serves that fallback and the router renders the right page.

To check a production build the way Pages will serve it (static files, `404.html` fallback):

```bash
npm run build && node scripts/serve-pages-sim.js
```
