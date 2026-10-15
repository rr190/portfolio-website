import './style.css'

type Project = {
  title: [string, string]
  label: string
  type: string
  role: string
  year: string
  stack: string[]
  image: string
  description: string
  link: string
}

// TODO: replace placeholder copy with real project details
const projects: Project[] = [
  {
    title: ['Knowledge', 'Graph'],
    label: 'Bloomberg / Data Management',
    type: 'Automation / Data',
    role: 'Software Engineer Intern',
    year: '2026',
    stack: ['Python', 'GraphQL', 'RDF'],
    image: '/projects/random_image.jpg',
    description:
      'An automated pipeline that turns scattered reference data into a connected knowledge graph, so analysts can query relationships between entities instead of stitching spreadsheets together by hand.',
    link: '#',
  },
  {
    title: ['Portfolio', 'Website'],
    label: 'Personal / Design & Build',
    type: 'Web / Design',
    role: 'Designer & Developer',
    year: '2026',
    stack: ['TypeScript', 'Vite', 'CSS'],
    image: '/projects/random_image.jpg',
    description:
      'This site. An editorial, type-led portfolio with a scroll-driven horizontal gallery, built from scratch without a framework.',
    link: '#',
  },
  {
    title: ['Machine', 'Learning'],
    label: 'University of Warwick / Research',
    type: 'AI / Modelling',
    role: 'Researcher',
    year: '2025',
    stack: ['Python', 'PyTorch', 'Pandas'],
    image: '/projects/random_image.jpg',
    description:
      'A machine learning project exploring how model choices affect real-world performance, from data cleaning and feature engineering through to evaluation.',
    link: '#',
  },
]

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
        <a class="project-link" href="${p.link}">View project →</a>
      </div>
    </article>
  `
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<nav>
  <h2> Jia Ru Sim </h2>

  <div class="nav-links">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="#experience">Experience</a>
    <a class="push" href="#contact">Contact</a>
  </div>
</nav>

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

  <section id="about">
    <h2>About</h2>
    <p> I'm a final year student at the University of Warwick, interested in the intersection of data science, artificial intelligence, and product development.</p>
  </section>

  <section id="experience">
    <h2>Experience</h2>
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <ul>
      <li>
        <h3>Email</h3>
        <h3>Github</h3>
        <h3>LinkedIn</h3>
      </li>
    </ul>
  </section>
</main>
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

