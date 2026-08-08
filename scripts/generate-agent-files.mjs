// Generates the agent-facing files from src/data/resume.js so they can never drift
// from the site. Runs automatically via the `prebuild` npm script; the output lands
// in public/ and is copied verbatim into dist/.
//
//   public/llms.txt       index in the llms.txt convention
//   public/llms-full.txt  the whole resume as plain markdown
//   public/resume.json    JSON Resume schema (https://jsonresume.org/schema/)
//
// The output is gitignored — it is build output, not source.
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import {
  profile,
  contact,
  experience,
  projects,
  education,
  languages,
  skills,
  awards,
} from '../src/data/resume.js'

const SITE = 'https://www.rpisipat.com'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
}

// "June 2021" -> "2021-06"; "2017" -> "2017"; anything unparsed is dropped rather
// than guessed, so the JSON never asserts a date the resume doesn't state.
function isoDate(value) {
  if (!value) return undefined
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(value.trim())
  if (match) {
    const month = MONTHS[match[1].slice(0, 3).toLowerCase()]
    return month ? `${match[2]}-${month}` : match[2]
  }
  const year = /^(\d{4})$/.exec(value.trim())
  return year ? year[1] : undefined
}

// Coursework is either a flat list of strings or grouped {group, items}.
const flatCourses = (coursework = []) =>
  coursework.flatMap((entry) => (typeof entry === 'string' ? entry : entry.items))

const bullets = (items = []) => items.map((item) => `- ${item}`).join('\n')

/* ---------------------------------- llms.txt --------------------------------- */

function buildLlmsIndex() {
  return `# ${profile.name}

> ${profile.title} based in ${profile.location}. ${profile.summary}

This is the personal resume site of ${profile.name}. Content below is the complete
professional record; there is no paywalled or member-only material.

## Pages

- [Experience](${SITE}/experience): ${experience
    .map((job) => `${job.role} at ${job.company}`)
    .join('; ')}
- [Projects](${SITE}/projects): ${projects.map((p) => p.name).join('; ')}
- [Skills](${SITE}/skills): ${skills.map((group) => group.category).join(', ')}
- [Education](${SITE}/education): ${education.map((school) => school.school).join('; ')}
- [Awards](${SITE}/awards): ${awards.map((award) => award.name).join('; ')}
- [Contact](${SITE}/contact): email, phone, LinkedIn, GitHub

## Machine-readable

- [Full resume as markdown](${SITE}/llms-full.txt): every section in one plain-text file
- [JSON Resume](${SITE}/resume.json): structured data in the JSON Resume schema

## Contact

- Email: ${contact.email}
- LinkedIn: ${contact.linkedin}
- GitHub: ${contact.github}
`
}

/* -------------------------------- llms-full.txt ------------------------------- */

function buildLlmsFull() {
  const sections = []

  sections.push(`# ${profile.name} — ${profile.title}

${profile.summary}

Location: ${profile.location}
Email: ${contact.email}
Phone: ${contact.phone}
LinkedIn: ${contact.linkedin}
GitHub: ${contact.github}
Website: ${SITE}`)

  sections.push(
    `## Experience\n\n${experience
      .map(
        (job) =>
          `### ${job.company} — ${job.role}\n${job.start} – ${job.end} · ${job.location}\n` +
          `Technologies: ${job.tags.join(', ')}\n\n${bullets(job.bullets)}`,
      )
      .join('\n\n')}`,
  )

  sections.push(
    `## Projects\n\n${projects
      .map((project) => {
        const parts = [`### ${project.name}`]
        if (project.subtitle) parts.push(project.subtitle)
        if (project.status) parts.push(`Status: ${project.status}`)
        parts.push(`Technologies: ${project.tags.join(', ')}`)
        if (project.pipeline) parts.push(`Pipeline: ${project.pipeline.join(' -> ')}`)
        parts.push(`\n${bullets(project.bullets)}`)
        if (project.future?.length) parts.push(`\nPlanned work:\n${bullets(project.future)}`)
        return parts.join('\n')
      })
      .join('\n\n')}`,
  )

  sections.push(
    `## Skills\n\n${skills
      .map((group) => `- ${group.category}: ${group.items.join(', ')}`)
      .join('\n')}`,
  )

  sections.push(
    `## Education\n\n${education
      .map((school) => {
        const parts = [
          `### ${school.school}`,
          school.degree,
          `${school.location} · ${school.dates || school.date}`,
        ]
        const courses = flatCourses(school.coursework)
        if (courses.length) parts.push(`\nCoursework: ${courses.join(', ')}`)
        if (school.awards?.length) parts.push(`Honors: ${school.awards.join('; ')}`)
        return parts.join('\n')
      })
      .join('\n\n')}`,
  )

  sections.push(
    `## Languages\n\n${languages.map((l) => `- ${l.name}: ${l.level}`).join('\n')}`,
  )

  sections.push(
    `## Awards\n\n${awards
      .map((award) => {
        const parts = [
          `### ${award.name}`,
          `${award.org} · ${award.year}`,
          '',
          award.description,
        ]
        if (award.details?.length) parts.push(`\n${bullets(award.details)}`)
        if (award.source) parts.push(`\nSource: ${award.source.url}`)
        return parts.join('\n')
      })
      .join('\n\n')}`,
  )

  return `${sections.join('\n\n')}\n`
}

/* -------------------------------- resume.json -------------------------------- */

function buildJsonResume() {
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: profile.name,
      label: profile.title,
      email: contact.email,
      phone: contact.phone,
      url: SITE,
      summary: profile.summary,
      location: { city: profile.location.split(',')[0].trim(), region: profile.location.split(',')[1]?.trim() },
      profiles: [
        { network: 'LinkedIn', username: 'risshiki', url: contact.linkedin },
        { network: 'GitHub', username: 'rishipisipati', url: contact.github },
      ],
    },
    work: experience.map((job) => ({
      name: job.company,
      position: job.role,
      location: job.location,
      startDate: isoDate(job.start),
      endDate: isoDate(job.end),
      summary: job.bullets[0],
      highlights: job.bullets,
      keywords: job.tags,
    })),
    projects: projects.map((project) => ({
      name: project.name,
      description: project.subtitle,
      highlights: project.bullets,
      keywords: project.tags,
    })),
    education: education.map((school) => ({
      institution: school.school,
      studyType: school.degree.split(',')[0].trim(),
      area: school.degree.split(',').slice(1).join(',').trim() || undefined,
      location: school.location,
      endDate: isoDate(school.date),
      courses: flatCourses(school.coursework),
      score: undefined,
    })),
    awards: awards.map((award) => ({
      title: award.name,
      date: isoDate(award.year),
      awarder: award.org,
      summary: [award.description, ...(award.details ?? [])].join(' '),
    })),
    skills: skills.map((group) => ({ name: group.category, keywords: group.items })),
    languages: languages.map((l) => ({ language: l.name, fluency: l.level })),
  }
}

/* ------------------------------------ run ------------------------------------ */

await mkdir(OUT, { recursive: true })
await Promise.all([
  writeFile(join(OUT, 'llms.txt'), buildLlmsIndex()),
  writeFile(join(OUT, 'llms-full.txt'), buildLlmsFull()),
  writeFile(join(OUT, 'resume.json'), `${JSON.stringify(buildJsonResume(), null, 2)}\n`),
])
console.log('Generated public/llms.txt, public/llms-full.txt, public/resume.json')
