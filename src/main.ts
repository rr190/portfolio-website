import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<nav>
  <div>
    <h2> Jia Ru Sim </h2>
    <a href="home">Home</a>
    <a href="about">About</a>
    <a href="projects">Projects</a>
    <a href="experience">Experience</a>
    <a href="contact">Contact</a>
  </div>
</nav>

<main>
  <section id="hero">
    <h1>Hi, I'm Jia Ru Sim</h1>
    <h2> Data/AI/Product Engineer </h2>
    <p></p>
  </section>

  <section id="projects">
    <h2>Projects</h2>
    <list>
      <li>
        <h3>Project 1</h3>
        <p>Description of Project 1</p>
      </li>
      <li>
        <h3>Project 2</h3>
        <p>Description of Project 2</p>
      </li>
    </list>    
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
    <list>
      <li>
        <h3>Email</h3>
        <h3>Github</h3>
        <h3>LinkedIn</h3>
      </li>
    </list>
  </section>
</main>
`
