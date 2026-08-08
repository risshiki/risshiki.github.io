import PageHeader from '../components/PageHeader.jsx'
import TagList from '../components/TagList.jsx'
import { skills } from '../data/resume.js'

export default function Skills() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Toolkit"
        title="Skills"
        lead="Languages, frameworks, and infrastructure used to ship and operate production systems."
      />

      <div className="skill-grid">
        {skills.map((group) => (
          <section key={group.category} className="skill-group">
            <h2 className="skill-category">{group.category}</h2>
            <TagList tags={group.items} />
          </section>
        ))}
      </div>
    </div>
  )
}
