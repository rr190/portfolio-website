import './style.css'
import { renderFooter, renderNav } from './layout'
import { type Project, projectHref, projects } from './projects'

const renderProject = (p: Project, i: number) => {
  const number = String(i + 1).padStart(2, '0')

  return `
    <article class="project-item">
      <span class="project-side-label">${p.label}</span>

      <div class="panel panel-title">
        <span class="project-number">${number}</span>
        <h3 class="word word-1">${p.title[0]}</h3>
        <h3 class="word word-2">${p.title[1]}</h3>
        <p class="project-type">${p.type}</p>
      </div>

      <div class="panel panel-media">
        <img src="${p.image}" alt="${p.title.join(' ')}">

        <dl class="project-info">
          <div><dt>No.</dt><dd>${number}</dd></div>
          <div><dt>Role</dt><dd>${p.role}</dd></div>
          <div><dt>Year</dt><dd>${p.year}</dd></div>
          <div><dt>Stack</dt><dd>${p.stack.join(', ')}</dd></div>
        </dl>
      </div>

      <div class="panel panel-desc">
        <span class="project-number">${number} / About</span>
        <p class="project-description">${p.description}</p>
        <a class="project-link" href="${projectHref(p)}">View project →</a>
      </div>
    </article>
  `
}

type Experience = {
  period: string
  role: string
  place: string
}

const experience: Experience[] = [
  { period: '2024 — 2027', role: 'BSc, Final Year MORSE Student', place: 'University of Warwick' },
  { period: '2025-2026', role: 'Part-Time AI Engineer Intern (Remote)', place: 'Global AI Village' },
  { period: 'Summer 2026', role: 'Data Engineer Intern', place: 'Bloomberg' },
  { period: 'Summer 2025', role: 'VC Investment Analyst Intern', place: 'The Hive SEA' },
]

const renderExperience = (e: Experience) => `
  <li class="experience-item">
    <span class="experience-period">${e.period}</span>
    <span class="experience-role">${e.role}</span>
    <span class="experience-place">${e.place}</span>
  </li>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${renderNav()}

<main>
  <section id="hero">
    <div class="hero-title">
      <h1 class="name-first">Jia Ru</h1>
      <h1>Sim</h1>
    </div>

    <div class="hero-subtitle">
      <h2> I BUILD WITH DATA</h2>
      <h2> AI & SOFTWARE. </h2>
    </div>

    <div class="scroll">
      <span>↓</span>
      <span>SCROLL</span>
    </div>
  </section>

  <section id="projects">
    <div class="projects-viewport">
      <h2 class="projects-heading">Selected Work</h2>

      <div class="project-list">
        ${projects.map(renderProject).join('')}
      </div>
    </div>
  </section>

  <section id="about" class="split">
    <h2>About</h2>
    <div class="split-body">
      <p class="about-lead">
        I'm a final year student at the University of Warwick, interested in the
        intersection of data science, artificial intelligence, and product development.
      </p>
    </div>
  </section>

  <section id="experience" class="split">
    <h2>Experience</h2>
    <ul class="split-body experience-list">
      ${experience.map(renderExperience).join('')}
    </ul>
  </section>

  <section id="contact" class="split">
    <h2>Contact</h2>
    <div class="split-body">
      <p class="contact-lead">Let's build something.</p>
      <ul class="contact-list">
        <li><a href="#">Email <span>→</span></a></li>
        <li><a href="#">GitHub <span>→</span></a></li>
        <li><a href="#">LinkedIn <span>→</span></a></li>
      </ul>
    </div>
  </section>
</main>

${renderFooter()}
`

const projectsSection = document.querySelector<HTMLElement>('#projects')
const projectList = document.querySelector<HTMLElement>('.project-list')
const panels = document.querySelectorAll<HTMLElement>('.panel')

// The section is as tall as the horizontal distance to travel, so one pixel
// of vertical scroll moves the strip one pixel sideways.
function sizeProjects() {
  if (!projectsSection || !projectList) return

  const travel = projectList.scrollWidth - window.innerWidth
  projectsSection.style.height = `${travel + window.innerHeight}px`

  updateProjects()
}

function updateProjects() {
  if (!projectsSection || !projectList) return

  const rect = projectsSection.getBoundingClientRect()
  const scrollDistance = projectsSection.offsetHeight - window.innerHeight

  const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1)
  const maxMove = projectList.scrollWidth - window.innerWidth

  projectList.style.transform = `translateX(${-progress * maxMove}px)`

  updatePanels()
}

// Each panel fades and settles in as it approaches the centre of the screen,
// so the title, then image + info, then description arrive one after another.
function updatePanels() {
  const screenCenter = window.innerWidth / 2

  panels.forEach((panel) => {
    const rect = panel.getBoundingClientRect()
    const panelCenter = rect.left + rect.width / 2

    const distance = (panelCenter - screenCenter) / window.innerWidth
    const absDistance = Math.min(Math.abs(distance), 1)

    const y = absDistance * 40
    const opacity = 1 - absDistance * 0.85

    panel.style.transform = `translateY(${y}px)`
    panel.style.opacity = `${opacity}`

    // Second title word drifts against the first for a bit of parallax
    const word2 = panel.querySelector<HTMLElement>('.word-2')
    if (word2) word2.style.transform = `translateX(${distance * 12}vw)`
  })
}

let ticking = false
window.addEventListener('scroll', () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateProjects()
    ticking = false
  })
})

window.addEventListener('resize', sizeProjects)
window.addEventListener('load', sizeProjects)

sizeProjects()

