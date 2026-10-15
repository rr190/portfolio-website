import './style.css'
import { renderFooter, renderNav } from './layout'
import { type CaseStudy, type Project, projectHref, projects } from './projects'

const slug = new URLSearchParams(location.search).get('p')
const index = projects.findIndex((p) => p.slug === slug && p.caseStudy)
const app = document.querySelector<HTMLDivElement>('#app')!

const renderFigure = (f: CaseStudy['sections'][number]['figure']) => {
  if (!f) return ''

  const media = 'svg' in f ? f.svg : `<img src="${f.image}" alt="${f.alt}">`
  return `
    <figure class="case-figure">
      ${media}
      <figcaption>${f.caption}</figcaption>
    </figure>
  `
}

const renderLinks = (p: Project) =>
  [
    p.github && `<a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>`,
    p.demo && `<a href="${p.demo.href}" target="_blank" rel="noopener">${p.demo.label} ↗</a>`,
  ]
    .filter(Boolean)
    .join('')

// Next case study in the list, wrapping round; falls back to the strip on the home page
const renderNext = () => {
  const withStudies = projects.filter((p) => p.caseStudy)
  const current = withStudies.findIndex((p) => p.slug === slug)
  const next = withStudies[(current + 1) % withStudies.length]

  if (withStudies.length < 2) {
    return `
      <a class="case-next" href="/#projects">
        <span class="case-next-label">Back to</span>
        <span class="case-next-title">Selected Work →</span>
      </a>
    `
  }

  return `
    <a class="case-next" href="${projectHref(next)}">
      <span class="case-next-label">Next project</span>
      <span class="case-next-title">${next.title.join(' ')} →</span>
    </a>
  `
}

const renderCaseStudy = (p: Project, cs: CaseStudy) => {
  const number = String(index + 1).padStart(2, '0')

  return `
    ${renderNav('/')}

    <main class="case">
      <a class="case-back" href="/#projects">← Selected Work</a>

      <header class="case-hero">
        <span class="project-number">${number} / ${p.label}</span>
        <h1 class="case-title">
          <span>${p.title[0]}</span>
          <span>${p.title[1]}</span>
        </h1>
        <p class="case-intro">${cs.intro}</p>
      </header>

      <dl class="case-meta">
        <div><dt>Role</dt><dd>${p.role}</dd></div>
        <div><dt>Year</dt><dd>${p.year}</dd></div>
        <div><dt>Stack</dt><dd>${p.stack.join(', ')}</dd></div>
        <div><dt>Links</dt><dd class="case-links">${renderLinks(p)}</dd></div>
      </dl>

      <figure class="case-cover">
        <img src="${cs.cover.image}" alt="${cs.cover.alt}">
      </figure>

      ${cs.sections
        .map(
          (s) => `
            <section class="split case-section reveal">
              <h2>${s.heading}</h2>
              <div class="split-body">
                ${s.body.map((para) => `<p>${para}</p>`).join('')}
                ${renderFigure(s.figure)}
              </div>
            </section>
          `,
        )
        .join('')}

      <section class="split case-section reveal">
        <h2>In numbers</h2>
        <div class="split-body case-numbers">
          ${cs.numbers
            .map(
              (n) => `
                <div>
                  <span class="case-number-value">${n.value}</span>
                  <span class="case-number-label">${n.label}</span>
                </div>
              `,
            )
            .join('')}
        </div>
      </section>

      ${renderNext()}
    </main>

    ${renderFooter()}
  `
}

const project = projects[index]

if (project?.caseStudy) {
  document.title = `${project.title.join(' ')} — Jia Ru Sim`
  app.innerHTML = renderCaseStudy(project, project.caseStudy)
} else {
  app.innerHTML = `
    ${renderNav('/')}
    <main class="case case-missing">
      <p class="case-intro">That project doesn’t exist (yet).</p>
      <a class="case-back" href="/#projects">← Back to Selected Work</a>
    </main>
  `
}

// Sections fade up as they scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  },
  { threshold: 0.15 },
)

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
