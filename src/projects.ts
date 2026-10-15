import { alphaZeroLoop, alphaZeroNetwork } from './diagrams'

type Figure =
  | { image: string; alt: string; caption: string }
  | { svg: string; caption: string }

export type CaseStudy = {
  intro: string
  cover: { image: string; alt: string }
  sections: { heading: string; body: string[]; figure?: Figure }[]
  numbers: { value: string; label: string }[]
}

export type Project = {
  slug: string
  title: [string, string]
  label: string
  type: string
  role: string
  year: string
  stack: string[]
  image: string
  description: string
  github?: string
  demo?: { href: string; label: string }
  caseStudy?: CaseStudy
}

// Case studies get their own page; everything else links to GitHub (or nowhere yet)
export const projectHref = (p: Project) =>
  p.caseStudy ? `/project.html?p=${p.slug}` : (p.github ?? '#')

export const projects: Project[] = [
  {
    slug: 'knowledge-graph',
    title: ['Knowledge', 'Graph'],
    label: 'Bloomberg / Data Management',
    type: 'Automation / Data',
    role: 'Software Engineer Intern',
    year: '2026',
    stack: ['Python', 'GraphQL', 'RDF'],
    image: '/projects/random_image.jpg',
    description:
      'An automated pipeline that turns scattered reference data into a connected knowledge graph, so analysts can query relationships between entities instead of stitching spreadsheets together by hand.',
  },
  {
    slug: 'alphazero',
    title: ['Alpha', 'Zero'],
    label: 'Personal / Reinforcement Learning',
    type: 'AI / Self-Play',
    role: 'Solo project',
    year: '2026',
    stack: ['Python', 'PyTorch', 'Flask'],
    image: '/projects/alphazero/board.svg',
    description:
      'AlphaZero rebuilt from the paper to run on a laptop CPU. Tree search and a residual policy/value network learn Connect Four purely through self-play, with a web UI to play against it and watch it train.',
    github: 'https://github.com/rr190/AlphaZero',
    demo: { href: 'https://codespaces.new/rr190/AlphaZero', label: 'Run in Codespaces' },
    caseStudy: {
      intro:
        'AlphaZero learns a game from nothing but the rules: it plays itself, uses a neural network to guide its search, and trains on its own games. I rebuilt the pipeline from the paper, scaled it down to run on a laptop CPU, and pointed it at Connect Four.',
      // TODO: swap for a screenshot of the web UI (python webapp.py → Play tab)
      cover: { image: '/projects/alphazero/board.svg', alt: 'A Connect Four board mid-game' },
      sections: [
        {
          heading: 'The idea',
          body: [
            'The starting point was Silver et al.’s <em>Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm</em>. The paper is light on architecture and search constants, so I reconstructed those from the earlier AlphaGo Zero paper and then scaled everything down. With no GPU, one full self-play and training loop had to finish in minutes, not days.',
            'Connect Four makes a good testbed. There are only seven moves per turn, so the search stays cheap, and the game is solved, so there’s a known right answer to check the agent against.',
          ],
        },
        {
          heading: 'The loop',
          body: [
            'Each iteration, the current best network plays games against itself, using tree search to choose every move. Every position is stored with the search’s move probabilities and the eventual result of the game.',
            'A fresh network trains on that replay buffer, then plays an arena match against the current best and only replaces it if it wins. No human games are used at any point.',
          ],
          figure: { svg: alphaZeroLoop, caption: 'One iteration of the self-play loop' },
        },
        {
          heading: 'The network',
          body: [
            'One network, two outputs. The board goes in as three 6×7 planes: my pieces, the opponent’s pieces, and whose turn it is. A 3×3 convolution and four residual blocks with 64 filters (about 300K parameters) feed two heads.',
            'The policy head gives a probability for each of the seven columns, with illegal moves masked out. The value head gives a single score from −1 to 1 for who is winning. It’s small enough to train on a CPU but has plenty of capacity for Connect Four.',
          ],
          figure: { svg: alphaZeroNetwork, caption: 'Residual policy / value network' },
        },
        {
          heading: 'The search',
          body: [
            'Moves come from Monte Carlo tree search using the PUCT rule. Each simulation walks down the tree, picking the move that best balances how well it has scored so far against how promising the network thinks it is and how little it has been explored.',
            'Classic MCTS plays random games to the end to score a new position. Here the value head’s estimate is used directly. During self-play, Dirichlet noise at the root (α 0.3, ε 0.25) keeps it trying new openings, and the first ~10 moves are sampled from the visit counts before it switches to the strongest move.',
          ],
        },
        {
          heading: 'Watching it learn',
          body: [
            'Connect Four has trillions of positions, far too many to look at. So I added <em>Connect Two</em>, a toy game with just 32 states, where you can watch the value and policy of the entire game tree update as training runs.',
            'Everything runs in a small Flask web UI with three tabs. <em>Play</em> pits you against any saved checkpoint, <em>Train & Self-Play</em> runs the loop live, and <em>Simple Game</em> shows Connect Two.',
          ],
        },
        {
          heading: 'Engineering',
          body: [
            'There are pytest suites for the game rules, the search and the model; a checkpoint is saved every iteration; and a headless script runs the full loop. A devcontainer means it opens in one click on GitHub Codespaces, CPU only.',
          ],
        },
      ],
      // TODO: add measured results (win rate vs baselines across iterations) once logged
      numbers: [
        { value: '~300K', label: 'Network parameters' },
        { value: '4', label: 'Residual blocks' },
        { value: '32', label: 'States in Connect Two' },
        { value: '0', label: 'Human games used' },
      ],
    },
  },
  {
    slug: 'machine-learning',
    title: ['Machine', 'Learning'],
    label: 'University of Warwick / Research',
    type: 'AI / Modelling',
    role: 'Researcher',
    year: '2025',
    stack: ['Python', 'PyTorch', 'Pandas'],
    image: '/projects/random_image.jpg',
    description:
      'A machine learning project exploring how model choices affect real-world performance, from data cleaning and feature engineering through to evaluation.',
  },
]
