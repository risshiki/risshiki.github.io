import { Fragment } from 'react'
import { Wifi, Flame } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import TagList from '../components/TagList.jsx'
import { projects } from '../data/resume.js'

const PROJECT_ICONS = { wifi: Wifi, flame: Flame }

export default function Projects() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Work"
        title="Projects"
        lead="Independent engineering and data science work outside of day-to-day product delivery."
      />

      <div className="stack">
        {projects.map((project) => {
          const Icon = PROJECT_ICONS[project.icon]
          return (
          <article key={project.id} className="panel">
            <header className="panel-head panel-head-with-logo">
              {Icon && (
                <span className={`project-icon project-icon-${project.icon}`} aria-hidden="true">
                  <Icon size={24} strokeWidth={1.75} />
                </span>
              )}
              <div>
                <div className="panel-title-row">
                  <h2>{project.name}</h2>
                  {project.status && <span className="status-pill">{project.status}</span>}
                </div>
                {project.subtitle && <p className="panel-sub">{project.subtitle}</p>}
              </div>
            </header>

            <TagList tags={project.tags} />

            {project.pipeline && (
              <div className="pipeline" aria-label="Pipeline">
                {project.pipeline.map((stage, i) => (
                  <Fragment key={stage}>
                    <span className="pipeline-stage">{stage}</span>
                    {i < project.pipeline.length - 1 && (
                      <span className="pipeline-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            )}

            <ul className="bullets">
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            {project.future?.length > 0 && (
              <section className="future">
                <h3 className="future-title">What&apos;s next</h3>
                <ul className="bullets">
                  {project.future.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </article>
          )
        })}
      </div>
    </div>
  )
}
