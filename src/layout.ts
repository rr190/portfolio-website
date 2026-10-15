// Nav and footer shared by the home page and the case-study pages.
// `base` is '' on the home page and '/' elsewhere, so anchors point back home.

export const renderNav = (base = '') => `
<nav>
  <h2><a href="${base || '#hero'}">Jia Ru Sim</a></h2>

  <div class="nav-links">
    <a href="${base}#hero">Home</a>
    <a href="${base}#about">About</a>
    <a href="${base}#projects">Projects</a>
    <a href="${base}#experience">Experience</a>
    <a class="push" href="${base}#contact">Contact</a>
  </div>
</nav>
`

export const renderFooter = () => `
<footer>
  <span>© ${new Date().getFullYear()} Jia Ru Sim</span>
  <a href="#">Back to top ↑</a>
</footer>
`
