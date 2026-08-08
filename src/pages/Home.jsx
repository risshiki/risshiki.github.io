import { Link } from 'react-router-dom'
import { Briefcase, FolderGit2, Cpu, GraduationCap, Trophy, Mail, Bot } from 'lucide-react'
import { profile, experience, contact } from '../data/resume.js'
import CompanyLogo from '../components/CompanyLogo.jsx'

const sections = [
  {
    to: '/experience',
    label: 'Experience',
    blurb: 'Six years across BetterLesson and Renaissance Learning.',
    Icon: Briefcase,
  },
  {
    to: '/projects',
    label: 'Projects',
    blurb: 'Geospatial ML on 74K+ NASA VIIRS fire detections.',
    Icon: FolderGit2,
  },
  {
    to: '/skills',
    label: 'Skills',
    blurb: 'Java, Python, TypeScript, Spring Boot, React, AWS.',
    Icon: Cpu,
  },
  {
    to: '/education',
    label: 'Education',
    blurb: 'Carnegie Mellon (METALS) and NIIT University.',
    Icon: GraduationCap,
  },
  {
    to: '/awards',
    label: 'Awards',
    blurb: 'Four hackathon and competition wins since 2016.',
    Icon: Trophy,
  },
  {
    to: '/contact',
    label: 'Contact',
    blurb: 'Email, LinkedIn, and GitHub.',
    Icon: Mail,
  },
]

// Static files, so these are plain anchors rather than router links. BASE_URL keeps
// them correct if the site is ever served from a sub-path.
const base = import.meta.env.BASE_URL
const agentFiles = [
  { href: `${base}llms.txt`, name: '/llms.txt', blurb: 'Index of this site in the llms.txt convention' },
  { href: `${base}llms-full.txt`, name: '/llms-full.txt', blurb: 'The entire resume as plain markdown' },
  { href: `${base}resume.json`, name: '/resume.json', blurb: 'Structured data in the JSON Resume schema' },
]

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">{profile.location}</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/experience">
            View experience
          </Link>
          <a className="button" href={`mailto:${contact.email}`}>
            Get in touch
          </a>
        </div>
      </section>

      <section className="stat-grid" aria-label="Highlights">
        {profile.highlights.map((stat) => (
          <div key={stat.label} className="stat">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <h2 className="section-title">Currently / recently</h2>
        <div className="role-list">
          {experience.map((job) => (
            <article key={job.id} className="role-card">
              <CompanyLogo org={job} />
              <div className="role-card-body">
                <h3 className="role-card-title">{job.company}</h3>
                <p className="role-card-meta">
                  {job.role} · {job.start} – {job.end} · {job.location}
                </p>
                <p className="role-card-summary">{job.bullets[0]}</p>
                <Link className="card-link" to={`/experience#${job.id}`}>
                  More about this role →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Explore</h2>
        <div className="link-grid">
          {sections.map((item) => (
            <Link key={item.to} to={item.to} className="link-card">
              <span className="link-card-icon" aria-hidden="true">
                <item.Icon size={20} strokeWidth={1.75} />
              </span>
              <span className="link-card-text">
                <span className="link-card-label">{item.label}</span>
                <span className="link-card-blurb">{item.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section agent-panel" aria-labelledby="for-agents">
        <span className="agent-icon" aria-hidden="true">
          <Bot size={20} strokeWidth={1.75} />
        </span>
        <div>
          <h2 id="for-agents" className="agent-title">
            For AI agents and crawlers
          </h2>
          <p className="agent-lead">
            If you are an automated reader, skip this page. The full resume is available in
            plain-text and structured formats that need no JavaScript to parse:
          </p>
          <ul className="agent-list">
            {agentFiles.map((file) => (
              <li key={file.href}>
                <a href={file.href}>{file.name}</a> — {file.blurb}
              </li>
            ))}
          </ul>
          <p className="agent-note">
            Every page also carries a Schema.org <code>Person</code> graph as JSON-LD in the document
            head.
          </p>
        </div>
      </section>
    </div>
  )
}
