import './style.css'

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
    <h2>Selected Work</h2>

    <div class="projects-viewport">
      <div class="project-list">

        <a href="#" class="project-item">
          <span class="project-number">01</span>

          <div class="project-content">
            <h3>Knowledge<br>Graph</h3>
            <p>Automation / Data</p>
          </div>

          <img src="/projects/random_image.jpg" alt="Knowledge Graph">
        </a>

        <a href="#" class="project-item">
          <span class="project-number">02</span>

          <div class="project-content">
            <h3>Portfolio<br>Website</h3>
            <p>Web Development</p>
          </div>

          <img src="/projects/random_image.jpg" alt="Portfolio Website">
        </a>

        <a href="#" class="project-item">
          <span class="project-number">03</span>

          <div class="project-content">
            <h3>Machine<br>Learning</h3>
            <p>Machine Learning / AI</p>
          </div>

          <img src="/projects/random_image.jpg" alt="Machine Learning">
        </a>

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
const projectList = document.querySelector<HTMLElement>('.project-list');
function updateProjects() {
  if (!projectsSection || !projectList) return;

  const rect = projectsSection.getBoundingClientRect();

  const scrollDistance =
    projectsSection.offsetHeight - window.innerHeight;

  const progress =
    Math.min(
      Math.max(-rect.top / scrollDistance, 0),
      1
    );

  const maxMove =
    projectList.scrollWidth - window.innerWidth;

  const move =
    progress * maxMove;

  projectList.style.transform =
    `translateX(${-move}px)`;

  updateProjectPositions();
}

function updateProjectPositions() {
  const projects = document.querySelectorAll<HTMLElement>('.project-item');

  const screenCenter = window.innerWidth / 2;

  projects.forEach((project) => {

    const rect =   project.getBoundingClientRect();

    const projectCenter = rect.left + rect.width / 2;

    const distance =  (projectCenter - screenCenter) / window.innerWidth;

    const absDistance =  Math.min(Math.abs(distance), 1);
    const scale =1 - absDistance * 0.25;

    const rotation = distance * 6;

    const y = absDistance * 30;
    const opacity = 1 - absDistance * 0.6;


    project.style.transform = `
      translateY(${y}px)
      scale(${scale})
      rotate(${rotation}deg)
    `;

    project.style.opacity =
      `${opacity}`;
  });
}
window.addEventListener('scroll', updateProjects);

updateProjects();