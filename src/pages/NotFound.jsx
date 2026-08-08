import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead">That route doesn&apos;t exist.</p>
      </header>
      <Link className="button button-primary" to="/">
        Back home
      </Link>
    </div>
  )
}
