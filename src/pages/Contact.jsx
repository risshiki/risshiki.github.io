import { Mail, Phone } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons.jsx'
import { contact, profile } from '../data/resume.js'

const channels = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
  {
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phone.replace(/[^+\d]/g, '')}`,
    Icon: Phone,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/risshiki',
    href: contact.linkedin,
    external: true,
    Icon: LinkedinIcon,
  },
  {
    label: 'GitHub',
    value: 'github.com/rishipisipati',
    href: contact.github,
    external: true,
    Icon: GithubIcon,
  },
]

export default function Contact() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Say hello"
        title="Contact"
        lead={`Based in ${profile.location}. Open to conversations about backend, full-stack, and applied ML work.`}
      />

      <div className="contact-grid">
        {channels.map((channel) => (
          <a
            key={channel.label}
            className="contact-card"
            href={channel.href}
            {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <span className="contact-icon" aria-hidden="true">
              <channel.Icon size={20} strokeWidth={1.75} />
            </span>
            <span className="contact-text">
              <span className="contact-label">{channel.label}</span>
              <span className="contact-value">{channel.value}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
