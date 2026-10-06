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
    <h2>Projects</h2>
    <ul class="project-list">
      <li class="project">
        <span>01</span>

        <div>
          <h3>Knowledge Graph</h3>
          <p>AI / Data / Software</p>
        </div>
      </li>
      <li class="project">
        <span>02</span>
        <div>
          <h3>Portfolio Website</h3>
          <p>Web Development</p>
        </div>
      </li>
    </ul>    
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
