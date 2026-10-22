import light from '../assets/portrait-light.webp'
import dark from '../assets/portrait-dark.webp'

// Both versions are rendered and CSS shows the one matching `data-theme`. A
// <picture> with prefers-color-scheme would ignore the manual theme toggle.
export default function Portrait({ className = '', alt = '' }) {
  return (
    <span className={`portrait ${className}`}>
      <img className="portrait-light" src={light} alt={alt} />
      <img className="portrait-dark" src={dark} alt="" aria-hidden="true" />
    </span>
  )
}
