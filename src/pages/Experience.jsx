import PageHeader from '../components/PageHeader.jsx'
import TagList from '../components/TagList.jsx'
import CompanyLogo from '../components/CompanyLogo.jsx'
import { experience } from '../data/resume.js'

export default function Experience() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Work"
        title="Experience"
        lead="Six-plus years building microservices, data pipelines, and AI-driven products for education technology."
      />

      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.id} id={job.id} className="timeline-item">
            <div className="timeline-marker" aria-hidden="true" />
            <article className="timeline-card">
              <header className="timeline-head">
                <CompanyLogo org={job} size={52} />
                <div>
                  <h2>{job.company}</h2>
                  <p className="timeline-role">{job.role}</p>
                  <p className="timeline-meta">
                    {job.start} – {job.end} · {job.location}
                  </p>
                </div>
              </header>
              <TagList tags={job.tags} />
              <ul className="bullets">
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}
