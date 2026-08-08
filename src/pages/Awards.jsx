import { Trophy, Medal } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { awards } from '../data/resume.js'

// Gold takes the trophy, silver the medal — the shape carries the tier even if
// the color is lost to a colorblind viewer or a monochrome print.
const MEDALS = {
  gold: { Icon: Trophy, label: 'First place' },
  silver: { Icon: Medal, label: 'Second place' },
}

export default function Awards() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Recognition"
        title="Awards"
        lead="Hackathon wins and competition submissions, most of which turned into shipped products."
      />

      <div className="stack">
        {awards.map((award) => {
          const medal = MEDALS[award.medal] ?? MEDALS.gold
          return (
            <article key={award.id} className="panel">
              <header className="panel-head panel-head-with-logo">
                <span className={`medal-icon medal-${award.medal || 'gold'}`} title={medal.label}>
                  <medal.Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                  <span className="sr-only">{medal.label}</span>
                </span>
                <div>
                  <p className="eyebrow">
                    {award.org} · {award.year}
                  </p>
                  <h2>{award.name}</h2>
                </div>
              </header>
              <p className="panel-body">{award.description}</p>

              {award.details?.length > 0 && (
                <ul className="bullets">
                  {award.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}

              {award.source && (
                <p className="source-link">
                  <a href={award.source.url} target="_blank" rel="noreferrer">
                    {award.source.label} ↗
                  </a>
                </p>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
