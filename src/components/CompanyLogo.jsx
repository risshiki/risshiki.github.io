// Renders an organization's logo when there is one, otherwise a monogram tile in
// its brand color so every card keeps the same visual weight. Used for both
// employers and schools.
export default function CompanyLogo({ org, size = 56 }) {
  const style = { width: size, height: size }
  const name = org.company || org.school

  if (org.logo) {
    // A dark mark on a transparent background needs a light plate to stay legible
    // in dark theme; a logo that already carries its own tile does not.
    const plate = org.logoNeedsPlate ? ' company-logo-plate' : ''
    return <img className={`company-logo${plate}`} src={org.logo} alt={`${name} logo`} style={style} />
  }

  return (
    <span
      className="company-logo company-logo-monogram"
      style={{ ...style, background: org.brandColor || 'var(--accent)' }}
      aria-hidden="true"
    >
      {org.monogram || name.slice(0, 2).toUpperCase()}
    </span>
  )
}
