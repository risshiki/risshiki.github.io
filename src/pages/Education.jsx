import PageHeader from '../components/PageHeader.jsx'
import CompanyLogo from '../components/CompanyLogo.jsx'
import TagList from '../components/TagList.jsx'
import { education, languages } from '../data/resume.js'

export default function Education() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Background"
        title="Education"
        lead="Learning sciences and computer science — plus the coursework that shaped the applied ML work."
      />

      <div className="stack">
        {education.map((school) => (
          <article key={school.id} className="panel">
            <header className="panel-head panel-head-with-logo">
              <CompanyLogo org={school} size={52} />
              <div>
                <h2>{school.school}</h2>
                <p className="panel-sub">{school.degree}</p>
                <p className="panel-meta">
                  {school.location} · {school.dates || school.date}
                </p>
              </div>
            </header>

            {school.coursework?.length > 0 && (
              <section className="sub-block">
                <h3 className="sub-title">Coursework</h3>
                {/* A short list stays flat; a full degree's worth is grouped so the
                    relevant courses lead instead of drowning in general requirements. */}
                {typeof school.coursework[0] === 'string' ? (
                  <TagList tags={school.coursework} />
                ) : (
                  school.coursework.map((group) => (
                    <div key={group.group} className="course-group">
                      <p className="course-group-name">{group.group}</p>
                      <TagList tags={group.items} />
                    </div>
                  ))
                )}
              </section>
            )}

            {school.awards?.length > 0 && (
              <section className="sub-block">
                <h3 className="sub-title">Honors</h3>
                <ul className="bullets">
                  {school.awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        ))}
      </div>

      <div className="split-grid">
        <section className="panel">
          <h2 className="panel-small-title">Languages</h2>
          <ul className="detail-list">
            {languages.map((language) => (
              <li key={language.name}>
                <span className="detail-key">{language.name}</span>
                <span className="detail-value">{language.level}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
